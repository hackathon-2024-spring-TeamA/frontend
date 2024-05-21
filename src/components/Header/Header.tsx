import * as React from "react";
import { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import User_option from "/src/assets/images/user_option.png";
import Book_management from "/src/assets/images/book_management.png";
import Book_donation from "/src/assets/images/book_donation.png";
import Logout from "/src/assets/images/logout.png";
import Tech_libra from "/src/assets/images/tech-libra.png";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px以下をモバイルとして扱う
    };

    handleResize(); // 初期化時に一度実行

    window.addEventListener("resize", handleResize); // リサイズ時に実行

    return () => {
      window.removeEventListener("resize", handleResize); // クリーンアップ
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile ? (
            <IconButton
              sx={{ ml: "auto" }}
              color="inherit"
              aria-label="menu"
              onClick={() => console.log("Open menu")}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Button color="inherit">
                  <img
                    src={Tech_libra}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  tech-libra
                </Button>
              </Box>
              <Box>
                <Button color="inherit" sx={{ mr: 1.3 }}>
                  <img
                    src={User_option}
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "10px",
                    }}
                  />
                  ユーザー設定
                </Button>
                <Button color="inherit" sx={{ mx: 2 }}>
                  <img
                    src={Book_management}
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "10px",
                    }}
                  />
                  本の貸借管理
                </Button>
                <Button color="inherit" sx={{ ml: 1 }}>
                  <img
                    src={Book_donation}
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "10px",
                    }}
                  />
                  本の寄付
                </Button>
                <Button color="inherit" sx={{ ml: 0 }}>
                  <img
                    src={Logout}
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "10px",
                    }}
                  />
                  ログアウト
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
