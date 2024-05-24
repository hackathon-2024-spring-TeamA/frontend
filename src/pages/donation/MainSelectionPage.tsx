import React from "react";

import { Grid, Box } from "@mui/material";

import ActionAreaCard from "@/components/Card/SelectionCard";

const MainSelectionPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        minHeight: "80vh",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{ width: "100%", maxWidth: "1200px" }}
      >
        <Grid item xs={10} md={4}>
          <ActionAreaCard
            title="タイトル検索"
            description="本のタイトルを入力して本の検索を行います"
            imagePath="https://tech-libra-images.s3.ap-northeast-1.amazonaws.com/book-open-svgrepo-com.svg"
            imageAlt="画像検索"
            targetPath="/donation/input-book-title"
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <ActionAreaCard
            title="ISBN検索"
            description="バーコードの下の文字(ISBN)を入力して本の検索を行います"
            imagePath="https://tech-libra-images.s3.ap-northeast-1.amazonaws.com/barcode1-svgrepo-com.svg"
            imageAlt="ISBN検索"
            targetPath="/donation/input-isbn"
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <ActionAreaCard
            title="バーコードスキャン"
            description="カメラで本のバーコードをスキャンして本の検索を行います"
            imagePath="https://tech-libra-images.s3.ap-northeast-1.amazonaws.com/barcode-code-scan-svgrepo-com.svg"
            imageAlt="バーコード検索"
            targetPath="/donation/scan-barcode"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainSelectionPage;
