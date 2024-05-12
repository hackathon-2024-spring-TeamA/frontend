import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";

interface BookDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  book: { imagePath: string; title: string; authors: string[] };
}

// 本確認画面(仮)
// Todo: スタイルの調整
// Todo: confirmボタンを押下すると、選択された本を次のコンポーネントに渡す必要がある
const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  open,
  onClose,
  onConfirm,
  book,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Book Details</DialogTitle>
    <CardMedia
      component="img"
      src={book.imagePath}
      alt="Book Icon"
      sx={{
        width: "100%",
        height: "auto",
        maxWidth: { md: "360px", xs: "240px" },
        margin: "auto",
      }}
    />
    <DialogContent>
      <Typography variant="h5">Title: {book.title}</Typography>
      <Typography variant="h6">Authors: {book.authors.join(", ")}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default BookDetailsModal;
