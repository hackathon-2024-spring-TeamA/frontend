import React, { useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import AlertSnackbar from "@/components/SnackBar/AlertSnackBar";
import { UPDATE_USER_NICKNAME } from "@/features/user/mutations";
import {
  GET_USER_NICKNAME,
  GET_USER_BOOK_LOANS,
} from "@/features/user/queries";
import { BookLoan } from "@/types/BookLoan";

const UserSettingsPage: React.FC<WithAuthenticatorProps> = ({ user }) => {
  const userId = user?.userId;
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");

  const location = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");

  const {
    data: nicknameData,
    loading: nicknameLoading,
    error: nicknameError,
    refetch,
  } = useQuery(GET_USER_NICKNAME, {
    variables: { userId },
    skip: !userId,
    onCompleted: (data) => {
      setNickname(data.getUserNickname);
    },
  });

  const {
    data: bookLoansData,
    loading: bookLoansLoading,
    error: bookLoansError,
  } = useQuery(GET_USER_BOOK_LOANS, {
    variables: { userId },
    skip: !userId,
  });

  const [updateUserNickname] = useMutation(UPDATE_USER_NICKNAME);

  useEffect(() => {
    if (location.state && location.state.message) {
      setSnackbarMessage(location.state.message);
      setSnackbarSeverity(location.state.severity);
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserNickname({ variables: { userId, nickname } });
      setIsEditing(false);
      setSnackbarMessage("ニックネームを変更しました。");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      await refetch();
    } catch (error) {
      setSnackbarMessage("変更に失敗しました。");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNickname(nicknameData?.getUserNickname || "");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (nicknameLoading || bookLoansLoading) {
    return <div>Loading...</div>;
  }

  if (nicknameError || bookLoansError) {
    return (
      <div>Error: {nicknameError?.message || bookLoansError?.message}</div>
    );
  }

  const bookLoans = bookLoansData?.getUserBookLoans || [];

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            ユーザー設定
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            ニックネーム
          </Typography>
          {isEditing ? (
            <TextField
              label="ニックネーム"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              fullWidth
            />
          ) : (
            <Typography variant="body1">{nickname}</Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                onClick={handleSaveClick}
                sx={{ mr: 2 }}
              >
                保存
              </Button>
              <Button variant="outlined" onClick={handleCancelClick}>
                キャンセル
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleEditClick}>
              編集
            </Button>
          )}
        </Box>
      </Paper>

      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          mt: 4,
          backgroundColor: "grey.100",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            借りた本一覧
          </Typography>
        </Box>
        {bookLoans.length > 0 ? (
          <Box>
            {bookLoans.map((bookLoan: BookLoan) => (
              <Box key={bookLoan.id} sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="bold">
                  {" "}
                  {/* ここで太字に修正 */}
                  本の名前: {bookLoan.book.book_information.title}
                </Typography>
                <Typography variant="body1">
                  借りた日: {new Date(bookLoan.rent_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  期限: {new Date(bookLoan.due_date).toLocaleDateString()} 12:30
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1">まだ本を借りていません</Typography>
          </Box>
        )}
      </Box>

      <AlertSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

const AuthenticatedUserSettingsPage = withAuthenticator(UserSettingsPage);
export default AuthenticatedUserSettingsPage;
