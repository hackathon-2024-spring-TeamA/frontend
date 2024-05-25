import React from "react";

import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Book } from "@/types/interface";

interface SearchBookCardProps {
  book: Book;
}

export const NoLoginSearchBookCard: React.FC<SearchBookCardProps> = ({
  book,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/login");
  };

  return (
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
          onClick={handleCardClick}
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
          </Box>
        </CardActionArea>
      </Box>
    </Card>
  );
};
