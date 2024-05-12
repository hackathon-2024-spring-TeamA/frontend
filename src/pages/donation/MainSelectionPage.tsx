import React from "react";

import { Grid } from "@mui/material";

import ActionAreaCard from "@/components/Card/SelectionCard";

const MainSelectionPage: React.FC = () => {
  return (
    <Grid
      container
      spacing={4}
      justifyContent={"space-around"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={{ xs: "column", md: "row" }}
      style={{
        minHeight: "80vh",
        overflow: "auto",
      }}
    >
      <Grid item xs={10} md={3}>
        <ActionAreaCard
          title="タイトル検索"
          discription="本のタイトルを入力してして本の検索を行います"
          imagePath="/src/assets/book-open-svgrepo-com.svg"
          imageAlt="画像検索"
          targetPath="/donation/input-book-title"
        />
      </Grid>
      <Grid item xs={10} md={3}>
        <ActionAreaCard
          title="ISBN検索"
          discription="バーコードの下の文字(ISBN)を入力して本の検索を行います"
          imagePath="/src/assets/barcode1-svgrepo-com.svg"
          imageAlt="ISBN検索"
          targetPath="/donation/input-isbn"
        />
      </Grid>
      <Grid item xs={10} md={3}>
        <ActionAreaCard
          title="バーコードスキャン"
          discription="カメラで本のバーコードをスキャンして本の検索を行います"
          imagePath="/src/assets/barcode-code-scan-svgrepo-com.svg"
          imageAlt="バーコード検索"
          targetPath="/donation/scan-barcode"
        />
      </Grid>
    </Grid>
  );
};

export default MainSelectionPage;
