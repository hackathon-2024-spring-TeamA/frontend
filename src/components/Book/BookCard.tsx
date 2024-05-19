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
}> = ({ bookRequest, loading }) => (
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
        state={{ bookRequest: bookRequest }}
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
          <Typography variant="h6" component="h3" gutterBottom>
            {bookRequest.book.book_information.title}
          </Typography>
          <Typography variant="body2">
            {bookRequest.book.book_information.author}
          </Typography>
          <Typography variant="body2">
            {bookRequest.book.book_information.description}
          </Typography>
          <Typography variant="body2">
            Published{" "}
            {bookRequest.book.book_information.published_date.toString()}
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
        variant="h6" // Changed from "subtitle1" to "h6" for larger text
        component="h3"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "center", // Center the title
        }}
      >
        {bookRequest.book.book_information.title}
      </Typography>
    </Box>
  </Card>
);
