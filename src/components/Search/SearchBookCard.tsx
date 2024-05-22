import React, { useState } from "react";

import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Modal,
  Fade,
  Backdrop,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import { Book } from "@/types/interface";

export const SearchBookCard: React.FC<{ book: Book }> = ({ book }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const truncateTitle = (title: string, maxLines: number) => {
    const words = title.split(" ");
    const lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (`${currentLine} ${word}`.length <= 20) {
        currentLine = `${currentLine} ${word}`;
      } else {
        lines.push(currentLine.trim());
        currentLine = word;
      }
    }

    lines.push(currentLine.trim());

    if (lines.length > maxLines) {
      return `${lines.slice(0, maxLines).join(" ")}...`;
    }

    return title;
  };

  const truncateAuthor = (author: string, maxLines: number) => {
    const words = author.split(" ");
    const lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (`${currentLine} ${word}`.length <= 20) {
        currentLine = `${currentLine} ${word}`;
      } else {
        lines.push(currentLine.trim());
        currentLine = word;
      }
    }

    lines.push(currentLine.trim());

    if (lines.length > maxLines) {
      return `${lines.slice(0, maxLines).join(" ")}...`;
    }

    return author;
  };

  const getBookStatus = (book: Book) => {
    if (!book.latest_book_loan) {
      if (book.latest_book_request) {
        return {
          label: "貸出処理中",
          color: "rgba(128, 128, 128, 0.3)",
          deadline: "期限:未定",
        };
      } else {
        return {
          label: "貸出可能",
          color: "rgba(144, 238, 144, 0.3)",
          deadline: "\u00A0",
        };
      }
    } else {
      const dueDate = new Date(book.latest_book_loan.due_date);
      const deadline = new Date(dueDate);
      deadline.setDate(deadline.getDate() + 1);
      deadline.setHours(12, 30, 0, 0);

      const today = new Date();

      if (today < deadline) {
        return {
          label: "貸出中",
          color: "rgba(255, 0, 0, 0.1)",
          deadline: `期限:${deadline.toLocaleDateString()} 12:30`,
        };
      } else {
        if (
          book.latest_book_request &&
          (book.latest_book_request.status === "requested" ||
            book.latest_book_request.status === "sending")
        ) {
          return {
            label: "貸出処理中",
            color: "rgba(128, 128, 128, 0.3)",
            deadline: "期限:未定",
          };
        } else {
          return {
            label: "貸出可能",
            color: "rgba(144, 238, 144, 0.3)",
            deadline: "\u00A0",
          };
        }
      }
    }
  };

  const bookData = {
    imagePath: book.book_information.image_path,
    title: book.book_information.title,
    author: book.book_information.author,
    bookId: book.id,
    holderId: book.latest_book_loan
      ? book.latest_book_loan.user_id
      : book.user_id,
  };

  return (
    <>
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "10px",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          },
          ...(getBookStatus(book).label !== "貸出可能" && {
            filter: "brightness(80%)",
          }),
        }}
      >
        <Box
          sx={{
            p: 2,
            aspectRatio: "1/1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CardActionArea
            onClick={handleOpen}
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                transition: "opacity 0.3s",
                "&:hover": { opacity: 0.5 },
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
              image={book.book_information.image_path}
              alt="Book cover"
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0, 0, 0, 0.7)",
                opacity: 0,
                transition: "opacity 0.3s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                p: 2,
                color: "white",
                "&:hover": { opacity: 1 },
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                {truncateTitle(book.book_information.title, 5)}
              </Typography>
              <Typography variant="body1">
                {truncateAuthor(book.book_information.author, 3)}
              </Typography>
              <Typography variant="body1">
                出版日:{" "}
                {new Date(
                  book.book_information.published_date,
                ).toLocaleDateString("ja-JP")}
              </Typography>
            </Box>
          </CardActionArea>
          <Box
            sx={{
              mt: 1,
              px: 2,
              py: 0.5,
              borderRadius: "9999px",
              backgroundColor: getBookStatus(book).color,
              color:
                getBookStatus(book).label === "貸出処理中"
                  ? "black"
                  : getBookStatus(book).label === "貸出可能"
                    ? "green"
                    : "red",
              textAlign: "center",
              fontSize: "0.8rem",
              width: "100%",
            }}
          >
            {getBookStatus(book).label}
          </Box>
        </Box>
        <Box
          sx={{
            px: 2,
            py: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              width: "100%",
              mt: -1,
            }}
          >
            {book.book_information.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              width: "100%",
              color: "text.secondary",
              mt: 0.5,
              mb: 0.5,
            }}
          >
            {getBookStatus(book).deadline}
          </Typography>
        </Box>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "85%",
              maxWidth: "850px",
              height: "85%",
              maxHeight: "92vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
              sx={{
                p: 4,
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  image={book.book_information.image_path}
                  alt={book.book_information.title}
                />
              </Box>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {book.book_information.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {book.book_information.author}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "15%",
                  overflowY: "auto",
                  mb: 2,
                  borderRadius: "4px",
                  border: "1px solid",
                  borderColor: "grey.300",
                  p: 2,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                <Typography variant="body1">
                  {book.book_information.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  py: 1,
                  px: 3,
                  borderRadius: "9999px",
                  backgroundColor: getBookStatus(book).color,
                  color:
                    getBookStatus(book).label === "貸出処理中"
                      ? "black"
                      : getBookStatus(book).label === "貸出可能"
                        ? "green"
                        : "red",
                  textAlign: "center",
                  fontSize: "1rem",
                  width: "fit-content",
                  mb: 2,
                }}
              >
                {getBookStatus(book).label}
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {getBookStatus(book).deadline}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  width: "100%",
                  mt: "auto",
                }}
              >
                {getBookStatus(book).label === "貸出可能" && (
                  <Link to="/confirm-loan" state={{ book: bookData }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ mb: 2 }}
                      fullWidth
                    >
                      借りる
                    </Button>
                  </Link>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={handleClose}
                >
                  閉じる
                </Button>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
