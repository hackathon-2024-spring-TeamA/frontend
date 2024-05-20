import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

const NotLoginHeader: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit">tech-libra</Button>
          </Box>
          <Box>
            <Button color="inherit">サービス概要</Button>
            <Button color="inherit">ログイン</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NotLoginHeader;
