import * as React from "react";
import { useState, useEffect } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import User_option from "/src/assets/images/user_option.png";
import Book_management from "/src/assets/images/book_management.png";
import Book_donation from "/src/assets/images/book_donation.png";
import Logout from "/src/assets/images/logout.png";
import Tech_libra_header from "/src/assets/images/tech_libra_header.png";

import Drawer from "@mui/material/Drawer"; // 追加
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List"; // 追加
import ListItem from "@mui/material/ListItem"; // 追加
import ListItemIcon from "@mui/material/ListItemIcon"; // 追加
import ListItemText from "@mui/material/ListItemText"; // 追加
import Toolbar from "@mui/material/Toolbar";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 追加

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

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      // 追加
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsDrawerOpen(open); // 追加
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile ? (
            <>
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
              <IconButton
                sx={{ ml: "auto" }}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)} // 変更
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                BackdropProps={{
                  style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                }}
                PaperProps={{
                  style: {
                    backgroundColor: "black", // ドロワーの背景色を黒に設定
                    color: "white", // テキストの色を白に設定(必要であれば)
                  },
                }}
              >
                <Box sx={{ width: 250 }}>
                  <List>
                    <ListItem button>
                      <ListItemIcon>
                        <img
                          src={User_option}
                          style={{ width: "25px", height: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="ユーザー設定" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <img
                          src={Book_management}
                          style={{ width: "25px", height: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="本の貸借管理" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <img
                          src={Book_donation}
                          style={{ width: "25px", height: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="本の寄付" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <img
                          src={Logout}
                          style={{ width: "25px", height: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="ログアウト" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Button color="inherit">
                  <img
                    src={Tech_libra_header}
                    style={{
                      width: "206.05px",
                      height: "50px",
                    }}
                  />
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
                <Button color="inherit" sx={{ ml: 1.5 }}>
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
