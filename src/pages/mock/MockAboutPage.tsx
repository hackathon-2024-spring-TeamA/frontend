import React from "react";

import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useCountStore } from "@/stores/mock/mock_store";

const AboutPage: React.FC = () => {
  const { count, increaseOne, removeAll } = useCountStore();
  return (
    <>
      <Typography variant="h4" component="h1">
        About Page
      </Typography>
      <Link to={"/mock"}>To Home Page</Link>
      <p>This is the content of the aboutpage.</p>
      <Typography>{count}</Typography>
      <Button onClick={increaseOne}>Increase One</Button>
      <Button onClick={removeAll}>Remove ALL</Button>
    </>
  );
};

export default AboutPage;
