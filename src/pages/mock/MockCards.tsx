import * as React from "react";

import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";

const SampleCard: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 240, margin: "auto", marginTop: 2 }}>
      <CardMedia
        component="img"
        image="/src/assets/react.svg"
        title="react"
        sx={{ height: 160, objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          React
        </Typography>
        <Typography variant="body2" color="text.secondary">
          React is a free and open-source front-end JavaScript library for
          building user interfaces based on components.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

const MockCards: React.FC = () => {
  return (
    <>
      <Link to={"/mock"}>To Home Page</Link>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SampleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SampleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SampleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SampleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SampleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SampleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SampleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SampleCard />
        </Grid>
      </Grid>
    </>
  );
};

export default MockCards;
