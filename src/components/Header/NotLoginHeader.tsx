import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

import Tech_libra_header from "/src/assets/images/tech_libra_header.png";

const NotLoginHeader: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit">
              <img
                src={Tech_libra_header}
                style={{
                  width: "206.05px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
            </Button>
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
