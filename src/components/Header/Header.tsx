import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

import User_option from "/src/assets/images/user_option.png";
import Book_management from "/src/assets/images/book_management.png";
import Book_donation from "/src/assets/images/book_donation.png";
import Logout from "/src/assets/images/logout.png";

const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit">tech-libra</Button>
          </Box>
          <Box>
            <Button color="inherit" sx={{ mr: 1.3 }}>
              <img
                src={User_option}
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              ユーザー設定
            </Button>
            <Button color="inherit" sx={{ mx: 2 }}>
              <img
                src={Book_management}
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              本の貸借管理
            </Button>
            <Button color="inherit" sx={{ ml: 1 }}>
              <img
                src={Book_donation}
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              本の寄付
            </Button>
            <Button color="inherit" sx={{ ml: 0 }}>
              <img
                src={Logout}
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              ログアウト
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
