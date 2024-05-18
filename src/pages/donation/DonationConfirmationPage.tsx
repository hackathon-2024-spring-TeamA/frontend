import React, { useState } from "react";

import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// 本の情報の型を定義
interface Book {
  imagePath: string;
  title: string;
  authors: string[];
}

const DonationConfirmationPage: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state as { book: Book };

  const handleConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(event.target.checked);
  };

  const handleDonate = () => {
    if (isConfirmed) {
      // ここでDBにデータを保存する処理を呼び出します
      console.log("Saving the book to DB:", book);
      // データベース保存後、寄付完了ページやメインページに遷移するなど
      // todo: 仮でホームページへ遷移する スナックバーとかも表示したい。
      navigate("/");
    } else {
      alert("Please confirm the donation by checking the box.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          寄付確認
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          寄付する本の情報：
        </Typography>
        <CardMedia
          component="img"
          src={book.imagePath}
          alt="Book Image"
          sx={{
            width: "80%",
            height: "auto",
            maxWidth: { md: "300px", xs: "200px" },
            margin: "auto",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            marginBottom: 3,
          }}
        />{" "}
        <Typography sx={{ mb: 2 }}>
          {`タイトル: ${book.title}`} {/* 本のタイトルを表示 */}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {`著者: ${book.authors.join(", ")}`} {/* 著者を表示 */}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox checked={isConfirmed} onChange={handleConfirmChange} />
          }
          label="上記の本を寄付しても良いですか？"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleDonate}
            disabled={!isConfirmed}
          >
            寄付をする
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DonationConfirmationPage;
