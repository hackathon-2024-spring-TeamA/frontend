import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TextField,
  Box,
  Container,
  Paper,
  CardMedia,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import BookDetailsModal from "@/components/Modal/BookDetailModal";

// Zodのスキーマ定義
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

  // 本のstate
  const [book, setBook] = useState<{
    imagePath: string;
    title: string;
    authors: string[];
  } | null>(null);

  // モーダルのstate
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (bookData: {
    imagePath: string;
    title: string;
    authors: string[];
  }) => {
    setBook(bookData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    navigate("/donation/confirm-donation");
  };

  // サブミットハンドラー
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);

    // Mockの仮データ
    // TODO: ここでGoogle Books APIの呼び出しやDBへの保存処理を実装する
    const mockBook = {
      imagePath: "/src/assets/book-open-svgrepo-com.svg",
      title: "Sample Book",
      authors: ["Author One", "Author Two"],
    };
    handleOpenModal(mockBook);
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 直前のページに戻る
  };

  return (
    <Container
      maxWidth="md"
      sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
    >
      <Paper
        elevation={3}
        sx={{
          border: 1,
          borderColor: "grey.700",
          borderRadius: 4,
          flexGrow: 1,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          maxHeight: 640,
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
            margin: "auto",
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
            // endIcon={<SearchOutlined />}
            sx={{
              display: "block",
              margin: "auto",
              width: "100%",
              marginTop: 2,
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

      {/* 戻るボタン */}
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ display: "block", width: "auto", margin: "auto", marginTop: 2 }}
        onClick={handleBack}
      >
        戻る
      </Button>
    </Container>
  );
};

export default BookTitleInputPage;
