import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  CardMedia,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import AlertSnackbar from "@/components/SnackBar/AlertSnackBar";
import { CREATE_BOOK_REQUEST } from "@/features/loan/mutations";

// 本の情報の型を定義
interface BookData {
  imagePath: string;
  title: string;
  author: string;
  bookId: number;
  holderId: string;
}

const LoanConfirmationPage: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state as { book: BookData };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("error");

  const [createBookRequest, { loading }] = useMutation(CREATE_BOOK_REQUEST);

  // サンプルのユーザーID
  const userId = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

  if (!book) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>
            不正な画面遷移
          </Typography>
          <Typography variant="body1" color="text.secondary">
            正しい手順で画面遷移が行われませんでした。
            トップページに戻ってやり直してください。
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            トップページに戻る
          </Button>
        </Box>
      </Container>
    );
  }

  // BookCardから渡されたデータをコンソールに表示
  console.log("Book data from BookCard:", book);

  const handleConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(event.target.checked);
  };

  const handleBack = () => navigate(-1);

  const handleLoan = async () => {
    if (isConfirmed) {
      try {
        const { data } = await createBookRequest({
          variables: {
            request: {
              bookId: book.bookId,
              holderId: book.holderId,
              requesterId: userId,
            },
          },
        });

        if (data.createBookRequest.isSuccess) {
          navigate("/requests", {
            state: { message: "リクエストに成功しました。" },
          });
        } else {
          setSnackbarMessage(data.createBookRequest.errorMessage);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error creating book request:", error);
        setSnackbarMessage("リクエストの作成中にエラーが発生しました。");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      alert("Please confirm the loan by checking the box.");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        貸出確認
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
        />
        <Typography sx={{ mb: 2 }}>{`タイトル: ${book.title}`}</Typography>
        <Typography sx={{ mb: 2 }}>{`著者: ${book.author}`}</Typography>
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
            onClick={handleLoan}
            disabled={!isConfirmed || loading}
          >
            {loading ? "借りる..." : "借りる"}
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
      <AlertSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default LoanConfirmationPage;
