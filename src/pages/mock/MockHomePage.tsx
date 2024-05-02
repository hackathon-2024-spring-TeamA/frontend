import React from "react";

import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useCountStore } from "@/stores/mock/mock_store";

const HomePage: React.FC = () => {
  // Arrow関数の書き方を採用しています。React.FCはファンクションコンポーネント(Function Componentの略で型定義です)
  const { count, increaseOne, removeAll } = useCountStore(); // returnの前で宣言
  return (
    <>
      <Typography variant="h4" component="h1">
        Home Page
      </Typography>
      <Link to={"/mock/about"}>To About Page</Link>
      <Link to={"/mock/cards"}>To Cars Page</Link>
      <p>This is the content of the homepage.</p>
      <Typography>{count}</Typography>
      <Button onClick={increaseOne}>Increase One</Button>
      <Button onClick={removeAll}>Remove AlL</Button>
    </>
  );
};

export default HomePage; // exportしないと他のページでインポートできないよ
