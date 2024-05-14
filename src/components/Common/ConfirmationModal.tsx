import React from "react";

import { Box, Typography, Button, Modal } from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal open={open} onClose={onCancel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          本当に到着ボタンを押しますか？
        </Typography>
        <Typography>本日から２週間が期限となります。</Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onCancel} sx={{ mr: 1 }}>
            いいえ
          </Button>
          <Button variant="contained" onClick={onConfirm}>
            はい
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
