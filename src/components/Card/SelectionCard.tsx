import * as React from "react";

import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface ActionAreaCardProps {
  imagePath: string;
  imageAlt: string;
  title: string;
  description: string;
  targetPath: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({
  imagePath,
  imageAlt,
  title,
  description,
  targetPath,
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        border: 2,
        borderColor: "grey.700",
        borderRadius: 4,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Link to={targetPath} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={imagePath}
            alt={imageAlt}
            sx={{
              objectFit: "contain",
              width: "80%",
              height: "auto",
              p: { xs: 1, md: 2 },
              m: "auto",
              borderRadius: 8,
            }}
          />
          <CardContent
            sx={{
              backgroundColor: "grey.800",
              minHeight: "120px",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ActionAreaCard;
