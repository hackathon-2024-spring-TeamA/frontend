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

  // モーダルのstate
  const [modalOpen, setModalOpen] = useState(false);
  const [books, setBooks] = useState<Array<{
    imagePath: string;
    title: string;
    authors: string[];
  }> | null>(null);

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

  const handleConfirm = (selectedBook: {
    imagePath: string;
    title: string;
    authors: string[];
  }) => {
    setModalOpen(false);
    console.log("Selected Book:", selectedBook);
    navigate("/donation/confirm-donation");
  };

  // サブミットハンドラー
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);

    // Mockの仮データ
    const mockBooks = [
      {
        imagePath: "/src/assets/book-open-svgrepo-com.svg",
        title: "Sample Book 1",
        authors: ["Author One"],
      },
      {
        imagePath: "/src/assets/book-open-svgrepo-com.svg",
        title: "Sample Book 2",
        authors: ["Author Two"],
      },
      {
        imagePath: "/src/assets/book-open-svgrepo-com.svg",
        title: "Sample Book 3",
        authors: ["Author Three"],
      },
    ];
    handleOpenModal(mockBooks);
  };

  const navigate = useNavigate();
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
    </Container>
  );
};

export default BookTitleInputPage;
