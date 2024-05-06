import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MockCards from "./pages/mock/MockCards";

import MainLayout from "@/components/Layout/MainLayout";
import MockAboutPage from "@/pages/mock/MockAboutPage";
import MockHomePage from "@/pages/mock/MockHomePage";

import "@aws-amplify/ui-react/styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React from "react";

import { Button } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const AuthWrapper: React.FC<WithAuthenticatorProps> = ({ signOut, user }) => (
  <ThemeProvider theme={theme}>
    <div>
      {user ? (
        <>
          <p>Welcome, {user.username}</p>
          <Button variant="contained" color="secondary" onClick={signOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button variant="contained" color="primary" href="/login">
            Sign In
          </Button>
          <Button variant="contained" color="secondary" href="/signup">
            Sign Up
          </Button>
        </>
      )}
    </div>
  </ThemeProvider>
);

const AuthenticatedHomePage = withAuthenticator(MockHomePage);
const AuthenticatedAuthWrapper = withAuthenticator(AuthWrapper);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route
        path="/"
        element={
          <AuthenticatedAuthWrapper>
            <AuthenticatedHomePage />
          </AuthenticatedAuthWrapper>
        }
      />
      <Route path="/mock">
        {/* // mock用ページ */}
        <Route index element={<MockHomePage />} />
        <Route path="about" element={<MockAboutPage />} />
        <Route path="cards" element={<MockCards />} />
      </Route>
    </Route>,
  ),
);

export default router;
