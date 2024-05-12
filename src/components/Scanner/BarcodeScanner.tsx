import React, { useRef, useEffect } from "react";

import { BrowserMultiFormatReader } from "@zxing/library";

interface BarcodeScannerProps {
  onScanSuccess: (isbn: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          onScanSuccess(result.getText());
        } else {
          console.log(error);
        }
      })
      .catch(console.error);

    return () => {
      codeReader.reset();
    };
  }, [onScanSuccess]);

  return <video ref={videoRef} style={{ width: "100%", minHeight: "40vh" }} />;
};
export default BarcodeScanner;
