import React, { useState, useEffect } from "react";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  Paper,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import { ConfirmationModal } from "@/components/Common/ConfirmationModal";
import { UPDATE_BOOK_REQUEST_STATUS } from "@/features/request/mutations";
import { GET_BOOK_REQUEST } from "@/features/request/queries";
import { GET_USER_NICKNAME } from "@/features/user/queries";

const RequestDetailPage: React.FC<WithAuthenticatorProps> = ({ user }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestId = searchParams.get("requestId");

  const userId = user?.userId;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [nextStatus, setNextStatus] = useState("");
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const [updateBookRequestStatus] = useMutation(UPDATE_BOOK_REQUEST_STATUS);
  const [getBookRequest, { data, loading, error }] =
    useLazyQuery(GET_BOOK_REQUEST);

  useEffect(() => {
    if (requestId) {
      getBookRequest({ variables: { requestId } });
    }
  }, [requestId, getBookRequest]);

  const currentBookRequest = data?.getBookRequest;
  const holder_id = currentBookRequest?.holder_id;
  const requester_id = currentBookRequest?.requester_id;
  const { data: holderNicknameData } = useQuery(GET_USER_NICKNAME, {
    variables: { userId: holder_id },
    skip: !holder_id,
  });
  const { data: requesterNicknameData } = useQuery(GET_USER_NICKNAME, {
    variables: { userId: requester_id },
    skip: !requester_id,
  });
  const holder_nickname = holderNicknameData?.getUserNickname;
  const requester_nickname = requesterNicknameData?.getUserNickname;

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!currentBookRequest) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h5" color="information">
          データが見つかりませんでした。
        </Typography>
      </Box>
    );
  }

  if (
    currentBookRequest.requester_id !== userId &&
    currentBookRequest.holder_id !== userId
  ) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h5" color="error">
          権限がありません。
        </Typography>
      </Box>
    );
  }

  const isHolder = userId === currentBookRequest.holder_id;

  const handleConfirmAction = async (status: string) => {
    if (status === "arrived") {
      await updateBookRequestStatus({
        variables: {
          requestId: currentBookRequest.id,
          status,
          userId: userId,
          bookId: parseInt(currentBookRequest.book.id),
        },
      });
    } else if (status === "sending") {
      await updateBookRequestStatus({
        variables: {
          requestId: currentBookRequest.id,
          status,
          bookId: parseInt(currentBookRequest.book.id),
        },
      });
    } else {
      await updateBookRequestStatus({
        variables: { requestId: currentBookRequest.id, status },
      });
    }
    await getBookRequest({ variables: { requestId } });
    setModalOpen(false);
  };

  const openConfirmationModal = (status: string, message: string) => {
    setModalMessage(message);
    setNextStatus(status);
    setModalOpen(true);
  };

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
          requested: "error.main",
          sending: "grey.500",
          arrived: "primary.main",
        }
      : {
          requested: "primary.main",
          sending: "grey.500",
          arrived: "black",
        };

    return {
      backgroundColor: statusColor[status as keyof typeof statusColor],
      color: "white",
    };
  };

  const handleServiceGuideClick = () => {
    setConfirmationModalOpen(true);
  };

  const handleConfirm = () => {
    setConfirmationModalOpen(false);
    window.open(
      "https://www.notosiki.co.jp/blog/other/yamato-anonymous-delivery/",
      "_blank",
    );
  };

  const handleCancel = () => {
    setConfirmationModalOpen(false);
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
                    <br></br>
                    <a href="mattermost://chat.raretech.site/raretech/channels/2book">
                      読書コミュニティ
                    </a>
                    で、本の感想を共有し合うのも素敵ですね。
                  </Typography>
                ) : currentBookRequest.status === "sending" ? (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    発送が完了しました。<br></br>相手への到着をお待ちください！
                  </Typography>
                ) : (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    {requester_nickname}さんからリクエストが届きました。
                    <br></br>
                    <a href="mattermost://chat.raretech.site/">Mattermost</a>
                    のDMで連絡を取り合い、本を発送してください！
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: 2,
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    onClick={handleServiceGuideClick}
                  >
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
                    本が到着しました。素敵な読書体験をお楽しみください。
                    <br></br>読み終わったら、
                    <a href="mattermost://chat.raretech.site/raretech/channels/2book">
                      読書コミュニティ
                    </a>
                    で感想を他のRareTECH生の方と共有してみてくださいね。
                  </Typography>
                ) : currentBookRequest.status === "sending" ? (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    {holder_nickname}
                    さんが発送しました。到着までもうしばらくお待ちください。
                    <br></br>到着したら「到着済み」ボタンを押してくださいね。
                  </Typography>
                ) : (
                  <Typography
                    sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}
                  >
                    現在の所有者である{holder_nickname}
                    さんにリクエストを送りました。<br></br>
                    <a href="mattermost://chat.raretech.site/">Mattermost</a>
                    で相手の方とチャットで連絡し、配送してもらいましょう！{" "}
                    <br></br>本が届いたら「到着済み」を押してください。
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: 2,
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    onClick={handleServiceGuideClick}
                  >
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
      <Dialog
        open={confirmationModalOpen}
        onClose={handleCancel}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          配送サービスの使い方
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            外部ページに移動します。よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            いいえ
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const AuthenticatedRequestDetailPage = withAuthenticator(RequestDetailPage);
export default AuthenticatedRequestDetailPage;
