import React from "react";

import { Snackbar, Alert } from "@mui/material";

interface AlertSnackbarProps {
  open: boolean;
  message: string;
  severity?: "error" | "warning" | "info" | "success";
  onClose: () => void;
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  open,
  message,
  severity = "error",
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
