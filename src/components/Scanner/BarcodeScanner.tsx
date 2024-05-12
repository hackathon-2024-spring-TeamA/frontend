import React, { useRef, useEffect, useState, useMemo } from "react";

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

  return <video ref={videoRef} style={{ width: "100%", minHeight: "40vh" }} />;
};
export default BarcodeScanner;
