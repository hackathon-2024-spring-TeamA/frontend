import React, { useState } from "react";

import {
  withAuthenticator,
  // WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TextField,
  Box,
  Container,
  Paper,
  CardMedia,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import BookDetailsModal from "@/components/Modal/BookDetailModal";
import AlertSnackbar from "@/components/SnackBar/AlertSnackBar";
import { fetchBooksByIsbn } from "@/features/donation/googleBooksApi";

// Zodのスキーマ定義
const schema = z.object({
  isbn: z
    .string()
    .length(13, "ISBNは13桁である必要があります")
    .regex(/^\d{13}$/, "ISBNは数字のみで構成されます"),
});

type FormValues = z.infer<typeof schema>;

const ISBNInputPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // 本のstate
  const [book, setBook] = useState<{
    imagePath: string;
    title: string;
    authors: string[];
  } | null>(null);

  // モーダルのstate
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  // モーダルを開く関数
  const handleOpenModal = (bookData: {
    imagePath: string;
    title: string;
    authors: string[];
  }) => {
    setBook(bookData);
    setModalOpen(true);
  };

  // モーダルを閉じる関数
  const handleCloseModal = () => setModalOpen(false);

  const handleConfirm = () => {
    setModalOpen(false);
    navigate("/donation/confirm-donation", { state: { book } });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form Data:", data);
    try {
      const bookData = await fetchBooksByIsbn(data.isbn);
      handleOpenModal(bookData);
    } catch (error) {
      setSnackbarMessage("本が見つかりませんでした。");
      setSnackbarOpen(true);
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <Container
      maxWidth="md"
      sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        ISBN 検索
      </Typography>
      <Paper
        elevation={3}
        sx={{
          border: 2,
          borderColor: "grey.700",
          borderRadius: 4,
          flexGrow: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <CardMedia
          component="img"
          src="/src/assets/barcode1-svgrepo-com.svg"
          alt="Book Icon"
          sx={{
            width: "100%",
            height: "auto",
            maxWidth: { md: "360px", xs: "240px" },
            m: "auto",
          }}
        />
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="ISBN"
            {...register("isbn", { required: "ISBNは必須です。" })}
            error={!!errors.isbn}
            helperText={errors.isbn?.message}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            sx={{
              display: "block",
              m: "auto",
              width: "100%",
              mt: 2,
            }}
          >
            検索
          </Button>
        </Box>
        {book && (
          <BookDetailsModal
            open={modalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
            book={book}
          />
        )}
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ display: "block", width: "auto", m: "auto", mt: 2 }}
        onClick={handleBack}
      >
        戻る
      </Button>
      <AlertSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

const AuthenticatedISBNInputPage = withAuthenticator(ISBNInputPage);
export default AuthenticatedISBNInputPage;
