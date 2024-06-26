import React, { useState } from "react";

import {
  withAuthenticator,
  // WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BookDetailsModal from "@/components/Modal/BookDetailModal";
import BarcodeScanner from "@/components/Scanner/BarcodeScanner";
import AlertSnackbar from "@/components/SnackBar/AlertSnackBar";
import { fetchBooksByIsbn } from "@/features/donation/googleBooksApi";

const BarcodeScannerPage: React.FC = () => {
  const [book, setBook] = useState<{
    imagePath: string;
    title: string;
    authors: string[];
  } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const handleScanSuccess = async (scannedIsbn: string) => {
    try {
      const bookData = await fetchBooksByIsbn(scannedIsbn);
      setBook(bookData);
      setModalOpen(true);
    } catch (error) {
      setSnackbarMessage("本が見つかりませんでした。");
      setSnackbarOpen(true);
    }
  };

  const handleConfirm = () => {
    setModalOpen(false);
    navigate("/donation/confirm-donation", { state: { book } });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
      <AlertSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

const AuthenticatedBarcodeScannerPage = withAuthenticator(BarcodeScannerPage);
export default AuthenticatedBarcodeScannerPage;
