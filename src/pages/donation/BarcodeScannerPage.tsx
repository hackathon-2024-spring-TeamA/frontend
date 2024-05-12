import React, { useState } from "react";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BookDetailsModal from "@/components/Modal/BookDetailModal";
import BarcodeScanner from "@/components/Scanner/BarcodeScanner";

const BarcodeScannerPage: React.FC = () => {
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState<{ title: string; authors: string[] } | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 直前のページに戻る
  };

  const handleScanSuccess = (scannedIsbn: string) => {
    setIsbn(scannedIsbn);
    console.log(isbn);

    // todo: google books apiの実装をここで行い、本を検索して取得する
    // Mock仮データ
    const mockBook = {
      title: "Sample Book",
      authors: ["Author One", "Author Two"],
    };
    setBook(mockBook);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    navigate("/donation/confirm-donation");
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
          alignItems: "center",
          justifyContent: "center",
          maxHeight: 640,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            alignContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            バーコードを中央に合わせてください
          </Typography>
          <BarcodeScanner onScanSuccess={handleScanSuccess} />
          {book && (
            <BookDetailsModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onConfirm={handleConfirm}
              book={book}
            />
          )}
        </Box>
      </Paper>
      {/* 戻るボタン */}
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          display: "block",
          width: "auto",
          margin: "auto",
          marginTop: 2,
          marginBottom: 2,
        }}
        onClick={handleBack}
      >
        戻る
      </Button>
    </Container>
  );
};

export default BarcodeScannerPage;
