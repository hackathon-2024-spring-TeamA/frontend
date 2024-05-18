import React, { useRef, useEffect, useState, useMemo } from "react";

import { Box, Typography, Paper } from "@mui/material";
import { BrowserMultiFormatReader, Result } from "@zxing/library";

interface BarcodeScannerProps {
  onScanSuccess: (isbn: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [latestResult, setLatestResult] = useState<Result | null>(null);
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), []);

  useEffect(() => {
    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result && result !== latestResult) {
          setLatestResult(result);
          onScanSuccess(result.getText());
        } else {
          console.log(error);
        }
      })
      .catch(console.error);

    return () => {
      codeReader.reset();
    };
  }, [codeReader, onScanSuccess, latestResult]);

  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "40vh",
        border: 2,
        borderColor: "grey.500",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
      }}
    >
      <video ref={videoRef} style={{ width: "100%", height: "100%" }} />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          color="white"
          sx={{
            p: 2,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: 2,
          }}
        >
          バーコードを中央に合わせてください
        </Typography>
      </Box>
    </Paper>
  );
};

export default BarcodeScanner;
