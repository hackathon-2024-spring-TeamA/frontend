import React from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Amplify } from "aws-amplify";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import awsExports from "./aws-exports";
import router from "./router.tsx";
import theme from "./theme.ts";

Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
