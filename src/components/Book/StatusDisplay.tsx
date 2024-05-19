import { Box, Typography } from "@mui/material";

import { BookRequest } from "@/types/interface";

interface StatusProps {
  bookRequest: BookRequest;
  userId: string;
}

export const StatusDisplay: React.FC<StatusProps> = ({
  bookRequest,
  userId,
}) => {
  const isRequester = bookRequest.requester_id === userId;
  const statusText = isRequester
    ? {
        requested: "リクエスト済み",
        sending: "発送中",
        arrived: "到着済み",
      }
    : {
        requested: "未発送",
        sending: "発送中",
        arrived: "到着済み",
      };

  const statusColor = isRequester
    ? {
        requested: "primary.main",
        sending: "grey.500",
        arrived: "black",
      }
    : {
        requested: "error.main",
        sending: "grey.500",
        arrived: "primary.main",
      };

  return (
    <Box
      sx={{
        px: 2,
        py: 0.5,
        bgcolor: statusColor[bookRequest.status],
        borderRadius: "10px",
        color: "white",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "2em",
      }}
    >
      <Typography variant="body2" component="p" align="center">
        {statusText[bookRequest.status]}
      </Typography>
    </Box>
  );
};
