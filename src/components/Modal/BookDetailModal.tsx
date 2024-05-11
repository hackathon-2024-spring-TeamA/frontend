import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface BookDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  book: { title: string; authors: string[] };
}

// 本確認画面(仮)
const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  open,
  onClose,
  onConfirm,
  book,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Book Details</DialogTitle>
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
