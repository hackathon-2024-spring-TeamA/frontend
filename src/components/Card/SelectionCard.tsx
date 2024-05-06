import * as React from "react";

import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface ActionAreaCardProps {
  maxWidth?: number;
  minWidth?: number;
  imagePath: string;
  imageAlt: string;
  title: string;
  discription: string;
  targetPath: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({
  maxWidth = 300,
  minWidth = 100,
  imagePath,
  imageAlt,
  title,
  discription,
  targetPath,
}) => {
  return (
    <Card sx={{ maxWidth: maxWidth, minWidth: minWidth }}>
      <Link to={targetPath} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={imagePath}
            alt={imageAlt}
            sx={{
              objectFit: "contain",
              widows: "100%",
              height: "100%",
              p: 2,
            }}
          />
          <CardContent sx={{ backgroundColor: "grey.700" }}>
            <Typography
              align="center"
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "white" }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
            >
              {discription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ActionAreaCard;
