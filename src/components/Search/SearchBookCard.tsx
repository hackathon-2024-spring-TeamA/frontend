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

import { Book } from "@/types/interface";

export const SearchBookCard: React.FC<{ book: Book }> = ({ book }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          ...(book.latest_book_loan?.is_held && {
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
              <Typography variant="h6" component="h3" gutterBottom>
                {book.book_information.title}
              </Typography>
              <Typography variant="body2">
                {book.book_information.author}
              </Typography>
              <Typography variant="body2">
                Published {book.book_information.published_date.toString()}
              </Typography>
            </Box>
          </CardActionArea>
          <Box
            sx={{
              mt: 1,
              px: 2,
              py: 0.5,
              borderRadius: "9999px",
              backgroundColor: book.latest_book_loan?.is_held
                ? "rgba(255, 0, 0, 0.1)"
                : "rgba(144, 238, 144, 0.3)",
              color: book.latest_book_loan?.is_held ? "red" : "green",
              textAlign: "center",
              fontSize: "0.8rem",
              width: "100%",
            }}
          >
            {book.latest_book_loan?.is_held ? "貸出中" : "貸出可能"}
          </Box>
        </Box>
        <Box
          sx={{
            px: 2,
            py: 1,
            minHeight: "3em",
            display: "flex",
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
            }}
          >
            {book.book_information.title}
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
                  backgroundColor: book.latest_book_loan?.is_held
                    ? "rgba(255, 0, 0, 0.1)"
                    : "rgba(144, 238, 144, 0.3)",
                  color: book.latest_book_loan?.is_held ? "red" : "green",
                  textAlign: "center",
                  fontSize: "1rem",
                  width: "fit-content",
                  mb: 2,
                }}
              >
                {book.latest_book_loan?.is_held ? "貸出中" : "貸出可能"}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  width: "100%",
                  mt: "auto",
                }}
              >
                {!book.latest_book_loan?.is_held && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mb: 2 }}
                    onClick={() => {
                      // 本を借りる処理を追加
                    }}
                  >
                    借りる
                  </Button>
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
