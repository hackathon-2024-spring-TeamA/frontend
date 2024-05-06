import React from "react";

import { Grid } from "@mui/material";

import ActionAreaCard from "@/components/Card/SelectionCard";

const MainSelectionPage: React.FC = () => {
  return (
    <>
      <Grid container spacing={8} justifyContent={"center"}>
        <Grid item>
          <ActionAreaCard
            title="画像アップロード"
            discription="バーコードの画像をアップロードして本の検索を行います"
            imagePath="/src/assets/upload-svgrepo-com (2).svg"
            imageAlt="画像検索"
            targetPath="/donation/upload-image"
          />
        </Grid>
        <Grid item>
          <ActionAreaCard
            title="ISBN"
            discription="バーコードの下の文字(ISBN)を入力して本の検索を行います"
            imagePath="/src/assets/barcode1-svgrepo-com.svg"
            imageAlt="ISBN検索"
            targetPath="/donation/input-isbn"
          />
        </Grid>
        <Grid item>
          <ActionAreaCard
            title="バーコードスキャン"
            discription="カメラで本のバーコードをスキャンして本の検索を行います"
            imagePath="/src/assets/barcode-code-scan-svgrepo-com.svg"
            imageAlt="バーコード検索"
            targetPath="donation/scan-barcode"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MainSelectionPage;
