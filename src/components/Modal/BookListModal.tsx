import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

interface Book {
  imagePath: string;
  title: string;
  authors: string[];
}

interface BooksListModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedBook: Book) => void;
  books: Book[];
}

const BooksListModal: React.FC<BooksListModalProps> = ({
  open,
  onClose,
  onConfirm,
  books,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleListItemClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleConfirm = () => {
    if (selectedBook) {
      onConfirm(selectedBook);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" align="center" fontWeight="bold">
          Book Search Results
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <List sx={{ maxHeight: "400px", overflow: "auto" }}>
          {books.map((book, index) => (
            <ListItemButton
              key={index}
              selected={selectedBook === book}
              onClick={() => handleListItemClick(book)}
            >
              <ListItemAvatar>
                <Avatar src={book.imagePath} alt="Book Image" />
              </ListItemAvatar>
              <ListItemText
                primary={book.title}
                secondary={book.authors.join(", ")}
              />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          キャンセル
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          disabled={!selectedBook}
        >
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BooksListModal;
