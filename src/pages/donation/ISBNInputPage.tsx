import React from "react";

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

  // サブミットハンドラー
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
    // TODO: ここでGoogle Books APIの呼び出しやDBへの保存処理を実装する
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
            margin: "auto",
          }}
        />
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="ISBN"
            {...register("isbn")}
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

export default ISBNInputPage;
