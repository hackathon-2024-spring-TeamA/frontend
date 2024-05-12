import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";

interface BookDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  book: { imagePath: string; title: string; authors: string[] };
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  open,
  onClose,
  onConfirm,
  book,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    PaperProps={{
      sx: { borderRadius: 4, p: 2, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" },
    }}
  >
    <DialogTitle>
      <Typography variant="h4" align="center" fontWeight="bold">
        Book Details
      </Typography>
    </DialogTitle>

    <DialogContent>
      <Box display="flex" flexDirection="column" alignItems="center">
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
        <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
          この書籍で間違いありませんか？？
        </Typography>
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          タイトル: {book.title}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary">
          著者: {book.authors.join(", ")}
        </Typography>
      </Box>
    </DialogContent>

    <DialogActions sx={{ justifyContent: "center" }}>
      <Button onClick={onClose} variant="outlined" color="secondary">
        キャンセル
      </Button>
      <Button onClick={onConfirm} variant="contained" color="primary">
        確認
      </Button>
    </DialogActions>
  </Dialog>
);

export default BookDetailsModal;
