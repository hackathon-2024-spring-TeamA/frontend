import * as React from "react";

import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface ActionAreaCardProps {
  maxWidth?: number;
  minWidth?: number;
  imageHeight?: number;
  imagePath: string;
  imageAlt: string;
  title: string;
  discription: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({
  maxWidth = 345,
  minWidth = 100,
  imageHeight = 140,
  imagePath,
  imageAlt,
  title,
  discription,
}) => {
  return (
    <Card sx={{ maxWidth: maxWidth, minWidth: minWidth }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={imageHeight}
          image={imagePath}
          alt={imageAlt}
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {discription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;
