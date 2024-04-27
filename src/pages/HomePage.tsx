import React from "react";

import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useCountStore } from "@/stores/store";

const HomePage: React.FC = () => {
  const { count, increaseOne, removeAll } = useCountStore();
  return (
    <>
      <Link to={"about"}>To About Page</Link>
      <p>This is the content of the homepage.</p>
      <Typography>{count}</Typography>
      <Button onClick={increaseOne}>Increase One</Button>
      <Button onClick={removeAll}>Remove AlL</Button>
    </>
  );
};

export default HomePage;
