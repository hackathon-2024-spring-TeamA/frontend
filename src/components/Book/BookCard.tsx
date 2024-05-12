import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

import { BookInformation } from "@/types/interface";

export const BookCard: React.FC<{
  bookInfo: BookInformation;
  loading: boolean;
}> = ({ bookInfo, loading }) => (
  <Card sx={{ position: "relative", overflow: "hidden" }}>
    <CardActionArea component={Link} to="/requests/detail">
      {loading ? (
        <Box
          sx={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <CardMedia
          component="img"
          height="300"
          image={bookInfo.image_path}
          alt="Book cover"
          sx={{ transition: "opacity 0.3s", "&:hover": { opacity: 0.5 } }}
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
          {bookInfo.title}
        </Typography>
        <Typography variant="body2">{bookInfo.author}</Typography>
        <Typography variant="body2">{bookInfo.description}</Typography>
        <Typography variant="body2">
          Published {bookInfo.published_date.toString()}
        </Typography>
      </Box>
    </CardActionArea>
    <Box sx={{ p: 2, height: "4em", display: "flex", alignItems: "center" }}>
      <Typography
        variant="subtitle1"
        component="h3"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {bookInfo.title}
      </Typography>
    </Box>
  </Card>
);
