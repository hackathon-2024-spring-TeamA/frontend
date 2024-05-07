import * as React from "react";

import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface ActionAreaCardProps {
  imagePath: string;
  imageAlt: string;
  title: string;
  discription: string;
  targetPath: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({
  imagePath,
  imageAlt,
  title,
  discription,
  targetPath,
}) => {
  return (
    <Card
      sx={{
        widows: "100%",
        height: "100%",
        // width: { xs: "50%", md: "100%" },
        // height: { xs: "50%", md: "100%" },
        border: 2,
        borderColor: "grey.700",
        borderRadius: 4,
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
              // widows: "100%",
              // height: "100%",
              width: { xs: "50%", md: "100%" },
              height: "auto",
              p: { xs: 1, md: 4 },
              m: "auto",
            }}
          />
          <CardContent sx={{ backgroundColor: "grey.700", minHeight: "120px" }}>
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
