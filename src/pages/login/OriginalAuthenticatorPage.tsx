import React, { useEffect } from "react";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RedirectOnLogin: React.FC = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  const navigate = useNavigate();

  useEffect(() => {
    if (route === "authenticated") {
      navigate("/home");
    }
  }, [route, navigate]);

  return null; // リダイレクトのみを行い、何もレンダリングしない
};

const LoginPage: React.FC = () => {
  return (
    <Box sx={{ pt: 22 }}>
      {" "}
      {/* BoxコンポーネントでAuthenticatorをラップ */}
      <Authenticator.Provider>
        <Authenticator>
          <RedirectOnLogin /> {/* Authenticator の子コンポーネントとして配置 */}
        </Authenticator>
      </Authenticator.Provider>
    </Box>
  );
};

export default LoginPage;
