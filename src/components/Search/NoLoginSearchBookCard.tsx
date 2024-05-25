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
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import { Book } from "@/types/interface";

interface SearchBookCardProps {
  book: Book;
}

export const NoLoginSearchBookCard: React.FC<SearchBookCardProps> = ({
  book,
}) => {
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
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                "&:hover": { opacity: 1 },
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                ログイン
              </Typography>
              <Link to="/login">
                <Button variant="contained" color="primary">
                  ログイン
                </Button>
              </Link>
            </Box>
          </CardActionArea>
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
              width: "400px", // モーダルの幅を調整
              p: 4,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" component="div" gutterBottom>
              ログインしてください。
            </Typography>
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mb: 2 }}
              >
                ログイン
              </Button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleClose}
            >
              閉じる
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
