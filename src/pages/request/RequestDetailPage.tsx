import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { Box, Typography, Grid, Button, Container, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

import { ConfirmationModal } from "@/components/Common/ConfirmationModal";
import { UPDATE_BOOK_REQUEST_STATUS } from "@/features/request/mutations";
import { GET_BOOK_REQUEST } from "@/features/request/queries";

const RequestDetailPage: React.FC = () => {
  const location = useLocation();
  const bookRequest = location.state?.bookRequest;
  const userId = "a1b2c3d4-e5f6-7890-1234-567890abcdef"; // ログインユーザーのIDに置き換える

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [nextStatus, setNextStatus] = useState("");

  const [updateBookRequestStatus] = useMutation(UPDATE_BOOK_REQUEST_STATUS);
  const { data, refetch } = useQuery(GET_BOOK_REQUEST, {
    variables: { requestId: bookRequest?.id },
    skip: !bookRequest?.id,
  });

  const handleConfirmAction = async (status: string) => {
    if (status === "arrived") {
      await updateBookRequestStatus({
        variables: {
          requestId: bookRequest.id,
          status,
          userId: userId,
          bookId: parseInt(bookRequest.book.id),
        },
      });
    } else {
      await updateBookRequestStatus({
        variables: { requestId: bookRequest.id, status },
      });
    }
    await refetch({ requestId: bookRequest.id });
    setModalOpen(false);
  };

  const openConfirmationModal = (status: string, message: string) => {
    setModalMessage(message);
    setNextStatus(status);
    setModalOpen(true);
  };

  if (!bookRequest && !data?.getBookRequest) {
    return <div>データが見つかりませんでした。</div>;
  }

  const currentBookRequest = data?.getBookRequest || bookRequest;
  const isHolder = userId === currentBookRequest.holder_id;

  const statusText = (status: string, isHolder: boolean) => {
    const texts = {
      requested: isHolder ? "未発送" : "発送待ち",
      sending: "発送中",
      arrived: "到着済み",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getStatusStyles = (status: string, isHolder: boolean) => {
    const statusColor = isHolder
      ? {
          requested: "error.main", // 赤
          sending: "grey.500", // グレー
          arrived: "primary.main", // 青
        }
      : {
          requested: "primary.main", // 青
          sending: "grey.500", // グレー
          arrived: "black", // 黒
        };

    return {
      backgroundColor: statusColor[status as keyof typeof statusColor],
      color: "white",
    };
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <img
              alt="Book Cover"
              src={currentBookRequest.book.book_information.image_path}
              style={{
                width: "100%",
                maxWidth: "300px",
                aspectRatio: "500/700",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                margin: "0 auto",
                display: "block",
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom
              >
                {currentBookRequest.book.book_information.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                著者: {currentBookRequest.book.book_information.author}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography variant="subtitle2" color="text.primary">
                  状態：
                </Typography>
                <Box
                  sx={{
                    ...getStatusStyles(currentBookRequest.status, isHolder),
                    display: "inline-block",
                    padding: "0.5em 1em",
                    borderRadius: "4px",
                    marginLeft: "0.5em",
                  }}
                >
                  <Typography variant="subtitle2" color="inherit">
                    {statusText(currentBookRequest.status, isHolder)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {isHolder ? (
              <>
                {currentBookRequest.status === "arrived" ? (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    相手に本が到着しました。本を通じて新しい出会いや発見があったことを願っています。
                    読書の感想を共有し合うのも素敵ですね。
                  </Typography>
                ) : currentBookRequest.status === "sending" ? (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    発送が完了しています。相手の到着連絡をお待ちください。
                  </Typography>
                ) : (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    リクエストが届きました。本を発送してください。
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: 2,
                  }}
                >
                  <Button size="large" variant="contained">
                    配送サービスの使い方
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    disabled={currentBookRequest.status !== "requested"}
                    onClick={() =>
                      openConfirmationModal(
                        "sending",
                        "本当に発送完了ボタンを押しますか？\n発送後、相手の到着連絡をお待ちください。",
                      )
                    }
                  >
                    発送完了
                  </Button>
                </Box>
              </>
            ) : (
              <>
                {currentBookRequest.status === "arrived" ? (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    本が到着しました。素敵な読書体験をお楽しみください。読み終わったら、感想を所有者の方と共有してみてくださいね。
                  </Typography>
                ) : currentBookRequest.status === "sending" ? (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    所有者の方が発送しました。到着までもうしばらくお待ちください。到着したら「到着済み」ボタンを押してくださいね。
                  </Typography>
                ) : (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    現在の所有者にリクエストを送りました。相手からの発送をお待ちください。本が届いたら「到着済み」を押してください。
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: 2,
                  }}
                >
                  <Button size="large" variant="contained">
                    配送サービスの使い方
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    disabled={currentBookRequest.status !== "sending"}
                    onClick={() =>
                      openConfirmationModal(
                        "arrived",
                        "本当に到着済みボタンを押しますか？\n本日から2週間が期限となります。",
                      )
                    }
                  >
                    到着済み（相手の発送後にクリックできるようになります。）
                  </Button>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
      <ConfirmationModal
        open={modalOpen}
        onConfirm={() => handleConfirmAction(nextStatus)}
        onCancel={() => setModalOpen(false)}
        message={modalMessage}
      />
    </Container>
  );
};

export default RequestDetailPage;
