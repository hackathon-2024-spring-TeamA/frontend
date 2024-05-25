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

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { Link, useLocation } from "react-router-dom";

import NotLoginHeader from "./NotLoginHeader";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const checkAuthState = () => {
      const isLoggedIn = localStorage.length > 0;
      setIsLoggedIn(isLoggedIn);
    };

    checkAuthState();
  }, [location]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

  const signOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <NotLoginHeader />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Button color="inherit" component={Link} to="/home">
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
                onClick={toggleDrawer(true)}
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
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
              >
                <Box sx={{ width: 250 }}>
                  <List>
                    <ListItem
                      button
                      component={Link}
                      to="/setting"
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemIcon>
                        <img
                          src={User_option}
                          style={{ width: "25px", height: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="ユーザー設定" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/requests"
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemIcon>
                        <img
                          src={Book_management}
                          style={{ width: "25px", height: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="本の貸借管理" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/donation/selection"
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemIcon>
                        <img
                          src={Book_donation}
                          style={{ width: "25px", height: "25px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="本の寄付" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/"
                      onClick={() => {
                        signOut();
                        toggleDrawer(false);
                      }}
                    >
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
                <Button color="inherit" component={Link} to="/home">
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
                <Button
                  color="inherit"
                  sx={{ mr: 1.3 }}
                  component={Link}
                  to="/setting"
                >
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
                <Button
                  color="inherit"
                  sx={{ mx: 2 }}
                  component={Link}
                  to="/requests"
                >
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
                <Button
                  color="inherit"
                  sx={{ ml: 1 }}
                  component={Link}
                  to="/donation/selection"
                >
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
                <Button
                  color="inherit"
                  sx={{ ml: 1.5 }}
                  component={Link}
                  to="/"
                  onClick={signOut}
                >
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
