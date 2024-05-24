import * as React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import Tech_libra_header from "/src/assets/images/tech_libra_header.png";

const NotLoginHeader: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Button color="inherit" component={Link} to="/">
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
                      to="/about"
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemText primary="サービス概要" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/login"
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemText primary="ログイン" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Button color="inherit" component={Link} to="/">
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
                <Button color="inherit" component={Link} to="/about">
                  サービス概要
                </Button>
                <Button
                  color="inherit"
                  sx={{ ml: 1.5 }}
                  component={Link}
                  to="/login"
                >
                  ログイン
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NotLoginHeader;
