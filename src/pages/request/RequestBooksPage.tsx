import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import {
  withAuthenticator,
  // WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import { BooksArea } from "../../components/Book/BooksArea";
import { PaginationComponent } from "../../components/Common/Pagination";

import AlertSnackbar from "@/components/SnackBar/AlertSnackBar";
import { PAGINATED_BOOK_REQUESTS } from "@/features/request/queries";
import { PaginationData } from "@/types/interface";

const RequestBooksPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMyRequest, setIsMyRequest] = useState(true);
  const userId = "a1b2c3d4-e5f6-7890-1234-567890abcdef";
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity] = useState<"error" | "warning" | "info" | "success">(
    "success",
  );

  useEffect(() => {
    if (location.state && location.state.message) {
      setSnackbarMessage(location.state.message);
      setSnackbarOpen(true);
      const timer = setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    window.history.replaceState(null, "");
  }, []);

  const { data, loading, error, refetch } = useQuery<{
    paginatedBookRequests: PaginationData;
  }>(PAGINATED_BOOK_REQUESTS, {
    variables: {
      page: currentPage,
      perPage: 8,
      userId,
      isMyRequest: isMyRequest,
    },
    fetchPolicy: "network-only",
  });

  if (error) return <p>Error: {error.message}</p>;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (myRequest: boolean) => {
    setIsMyRequest(myRequest);
    setCurrentPage(1);
    refetch({
      page: 1,
      perPage: 8,
      userId: "your_user_id",
      isMyRequest: myRequest,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          mb: 0,
        }}
      >
        <Button
          variant={isMyRequest ? "contained" : "outlined"}
          onClick={() => handleTabChange(true)}
          sx={{
            borderRadius: "4px",
            px: 4,
            py: 2,
            fontWeight: "bold",
            textTransform: "none",
            minWidth: "240px",
            mb: { xs: 2, sm: 0 },
            mr: { xs: 0, sm: 2 },
            backgroundColor: isMyRequest ? "primary.main" : "white",
            color: isMyRequest ? "white" : "primary.main",
            border: "1px solid",
            borderColor: "primary.main",
            "&:hover": {
              backgroundColor: isMyRequest ? "primary.dark" : "primary.light",
            },
          }}
        >
          リクエストした本
        </Button>

        <Button
          variant={!isMyRequest ? "contained" : "outlined"}
          onClick={() => handleTabChange(false)}
          sx={{
            borderRadius: "4px",
            px: 4,
            py: 2,
            fontWeight: "bold",
            textTransform: "none",
            minWidth: "240px",
            backgroundColor: !isMyRequest ? "primary.main" : "white",
            color: !isMyRequest ? "white" : "primary.main",
            border: "1px solid",
            borderColor: "primary.main",
            "&:hover": {
              backgroundColor: !isMyRequest ? "primary.dark" : "primary.light",
            },
          }}
        >
          リクエストされた本
        </Button>
      </Box>

      <Box mt={2}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data?.paginatedBookRequests.bookRequests.length === 0 ? (
          <Box display="flex" justifyContent="center">
            <Card
              sx={{
                width: "100%",
                maxWidth: "md",
                backgroundColor: "grey.200",
                mt: 6,
                borderRadius: "8px",
                boxShadow: 3,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: 4,
                }}
              >
                <InfoIcon
                  sx={{ fontSize: 40, mb: 2, color: "text.secondary" }}
                />
                <Typography
                  variant="h5"
                  sx={{ mb: 4, color: "text.secondary" }}
                >
                  まだリクエストがありません。
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <BooksArea
            bookRequests={data?.paginatedBookRequests.bookRequests || []}
            loading={loading}
            userId={userId}
          />
        )}
      </Box>

      <Box mt={-4} display="flex" justifyContent="center">
        <PaginationComponent
          totalCount={data?.paginatedBookRequests.totalCount || 0}
          currentPage={currentPage}
          perPage={data?.paginatedBookRequests.perPage || 12}
          onPageChange={handlePageChange}
        />
      </Box>

      <AlertSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

const AuthenticatedRequestBooksPage = withAuthenticator(RequestBooksPage);
export default AuthenticatedRequestBooksPage;
