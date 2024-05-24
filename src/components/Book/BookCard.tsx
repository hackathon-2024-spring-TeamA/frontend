import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

import { BookRequest } from "@/types/interface";

export const BookCard: React.FC<{
  bookRequest: BookRequest;
  loading: boolean;
}> = ({ bookRequest, loading }) => {
  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length <= maxLength) {
      return title;
    } else {
      return title.slice(0, maxLength) + "...";
    }
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardActionArea
          component={Link}
          to={`/requests/detail?requestId=${bookRequest.id}`}
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
          {loading ? (
            <CircularProgress />
          ) : (
            <CardMedia
              component="img"
              sx={{
                transition: "opacity 0.3s",
                "&:hover": { opacity: 0.5 },
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
              image={bookRequest.book.book_information.image_path}
              alt="Book cover"
            />
          )}
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
              {truncateTitle(bookRequest.book.book_information.title, 30)}
            </Typography>
            <Typography variant="body1">
              {bookRequest.book.book_information.author}
            </Typography>
            <Typography variant="body1">
              出版日:{" "}
              {new Date(
                bookRequest.book.book_information.published_date,
              ).toLocaleDateString("ja-JP")}
            </Typography>
          </Box>
        </CardActionArea>
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
          }}
        >
          {truncateTitle(bookRequest.book.book_information.title, 20)}
        </Typography>
      </Box>
    </Card>
  );
};
