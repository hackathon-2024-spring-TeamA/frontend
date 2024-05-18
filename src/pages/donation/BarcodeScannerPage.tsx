import React, { useState } from "react";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BookDetailsModal from "@/components/Modal/BookDetailModal";
import BarcodeScanner from "@/components/Scanner/BarcodeScanner";

const BarcodeScannerPage: React.FC = () => {
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState<{
    imagePath: string;
    title: string;
    authors: string[];
  } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const handleScanSuccess = (scannedIsbn: string) => {
    setIsbn(scannedIsbn);
    console.log(isbn);

    // todo: google books apiの実装をここで行い、本を検索して取得する
    // Mock仮データ
    const mockBook = {
      imagePath: "/src/assets/book-open-svgrepo-com.svg",
      title: "Sample Book",
      authors: ["Author One", "Author Two"],
    };
    setBook(mockBook);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    navigate("/donation/confirm-donation", { state: { book } });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        バーコードスキャン
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
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          display: "block",
          m: "auto",
          mt: 2,
        }}
        onClick={handleBack}
      >
        戻る
      </Button>
    </Container>
  );
};

export default BarcodeScannerPage;
