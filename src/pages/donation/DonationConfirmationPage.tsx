import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { SAVE_BOOK_MUTATION } from "@/features/donation/mutation";

// 本の情報の型を定義
interface Book {
  isbn: string;
  imagePath: string;
  title: string;
  publishd_date: string;
  publishedDate: string;
  description: string;
  authors: string[];
}

const DonationConfirmationPage: React.FC<WithAuthenticatorProps> = ({
  user,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = user?.userId;
  const { book } = location.state as { book: Book };

  const [saveBook] = useMutation(SAVE_BOOK_MUTATION);

  const handleConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(event.target.checked);
  };

  const handleBack = () => navigate(-1);

  const handleDonate = () => {
    if (isConfirmed) {
      // ここでDBにデータを保存する処理を呼び出します
      // データベース保存後、寄付完了ページやメインページに遷移するなど
      saveBook({
        variables: {
          user_id: user_id,
          isbn_number: book.isbn,
          title: book.title,
          author: book.authors.join(", "),
          published_date: book.publishedDate,
          description: book.description,
          image_path: book.imagePath,
        },
      });
      navigate("/home", { state: { donationSuccess: true } });
    } else {
      alert("Please confirm the donation by checking the box.");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        寄付確認
      </Typography>
      <Paper
        elevation={3}
        sx={{
          border: 2,
          borderColor: "grey.700",
          borderRadius: 4,
          flexGrow: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <CardMedia
          component="img"
          src={book.imagePath}
          alt="Book Image"
          sx={{
            width: "80%",
            height: "auto",
            maxWidth: { md: "260px", xs: "180px" },
            margin: "auto",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            marginBottom: 3,
          }}
        />{" "}
        <Typography sx={{ mb: 2 }}>
          {`タイトル: ${book.title}`} {/* 本のタイトルを表示 */}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {`著者: ${book.authors.join(", ")}`} {/* 著者を表示 */}
        </Typography>
        {/* 利用規約を表示するボックス */}
        <Box
          sx={{
            maxHeight: 200,
            overflow: "auto",
            border: "1px solid #ccc",
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            利用規約
          </Typography>
          <Typography variant="body2">
            第1条（目的）
            <br />
            本利用規約（以下「本規約」といいます。）は、ユーザーが当サービスを利用する際の一切の行為について定めるものです。
            <br />
            <br />
            第2条（利用の条件）
            <br />
            ユーザーは、本サービスを利用するにあたり、本規約に同意したものとみなされます。
            <br />
            <br />
            第3条（寄付の取り扱い）
            <br />
            1.
            一度寄付された本は、ユーザーの所有物ではなくなります。寄付後のキャンセルはできません。
            <br />
            2.
            寄付された本は、本サービスを利用する全てのユーザーの共有財産となります。
            <br />
            <br />
            第4条（貸出と利用のルール）
            <br />
            1.
            寄付された本を借りる際、ユーザーは本を無闇に傷つけたりしないように注意しなければなりません。
            <br />
            2.
            本を借りたユーザーは、適切に取り扱い、他のユーザーが利用できる状態で返却しなければなりません。
            <br />
            <br />
            第5条（禁止行為）
            <br />
            ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。
            <br />
            1. 法令または公序良俗に反する行為
            <br />
            2. 犯罪行為に関連する行為
            <br />
            3. 本サービスの運営を妨害する行為
            <br />
            4. 他のユーザーの個人情報を無断で収集または蓄積する行為
            <br />
            5. 他のユーザーに成りすます行為
            <br />
            6. 本サービスのシステムに不正にアクセスする行為
            <br />
            <br />
            第6条（免責事項）
            <br />
            1.
            本サービスは、提供される情報やサービスについて、その完全性、正確性、適用性、有用性について一切保証しません。
            <br />
            2.
            本サービスの利用に関連してユーザーに生じた損害について、本サービスは一切の責任を負いません。
            <br />
            <br />
            第7条（規約の変更）
            <br />
            本サービスは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができます。変更後の規約は、本サービスに掲載された時点からその効力を生じるものとします。
            <br />
            <br />
            第8条（準拠法及び裁判管轄）
            <br />
            本規約の解釈にあたっては、日本法を準拠法とします。また、本サービスに関して生じた紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            <br />
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Checkbox checked={isConfirmed} onChange={handleConfirmChange} />
          }
          label="利用規約に同意する"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleDonate}
            disabled={!isConfirmed}
          >
            寄付をする
          </Button>
        </Box>
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ display: "block", width: "auto", m: "auto", mt: 2 }}
        onClick={handleBack}
      >
        戻る
      </Button>
    </Container>
  );
};

const AuthenticatedDonationConfirmationPage = withAuthenticator(
  DonationConfirmationPage,
);
export default AuthenticatedDonationConfirmationPage;
