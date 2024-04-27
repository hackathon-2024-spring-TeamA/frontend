import React from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./routes/router.tsx";
import theme from "./styles/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
