import React, { useState } from "react";

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

import BooksListModal from "@/components/Modal/BookListModal";
import AlertSnackbar from "@/components/SnackBar/AlertSnackBar";
import { fetchBooksByTitle } from "@/features/donation/googleBooksApi";

const schema = z.object({
  book: z.string().min(1, "タイトルを入力してください。"),
});

type FormValues = z.infer<typeof schema>;

const BookTitleInputPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [modalOpen, setModalOpen] = useState(false);
  const [books, setBooks] = useState<Array<{
    imagePath: string;
    title: string;
    authors: string[];
  }> | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleOpenModal = (
    bookData: Array<{
      imagePath: string;
      title: string;
      authors: string[];
    }>,
  ) => {
    setBooks(bookData);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleConfirm = (book: {
    imagePath: string;
    title: string;
    authors: string[];
  }) => {
    setModalOpen(false);
    console.log("Selected Book:", book);
    navigate("/donation/confirm-donation", { state: { book } });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form Data:", data);
    try {
      const booksData = await fetchBooksByTitle(data.book);
      handleOpenModal(booksData);
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
        タイトル検索
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
          src="/src/assets/book-open-svgrepo-com.svg"
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
            label="タイトル"
            {...register("book", { required: "タイトルは必須です。" })}
            error={!!errors.book}
            helperText={errors.book?.message}
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
        {books && (
          <BooksListModal
            open={modalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
            books={books}
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

export default BookTitleInputPage;
