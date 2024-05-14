import { useMutation } from "@apollo/client";
import { Box, Typography, Grid, Button, Container } from "@mui/material";
import { useLocation } from "react-router-dom";

import { UPDATE_BOOK_REQUEST_STATUS } from "@/features/request/mutations";

const RequestDetailPage = () => {
  const location = useLocation();
  const bookRequest = location.state?.bookRequest;
  // const searchParams = new URLSearchParams(location.search);
  // const requestId = searchParams.get("requestId");

  const [updateBookRequestStatus] = useMutation(UPDATE_BOOK_REQUEST_STATUS);

  const handleArrivalClick = () => {
    updateBookRequestStatus({
      variables: {
        requestId: bookRequest.id,
        status: "arrived",
      },
    });
  };

  if (!bookRequest) {
    return <div>データが見つかりませんでした。</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box
        sx={{
          backgroundColor: "grey.100",
          borderRadius: "8px",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <img
              alt="Book Cover"
              src={bookRequest.book.book_information.image_path}
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
                {bookRequest.book.book_information.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                By {bookRequest.book.book_information.author}
                状態：未発送
              </Typography>
            </Box>
            <Typography sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}>
              現在の所有者にリクエストを送りました。
              相手からの発送をお待ちください。
              本が届いたら「到着済み」を押してください。
            </Typography>
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
                disabled={bookRequest.status !== "sending"}
                onClick={handleArrivalClick}
              >
                到着済み（相手の発送後にクリックできるようになります。）
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RequestDetailPage;
