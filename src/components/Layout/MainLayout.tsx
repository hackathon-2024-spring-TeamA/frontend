import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Box sx={{ margin: 2 }}>
        <main>
          <Outlet />
        </main>
      </Box>
    </div>
  );
};

export default MainLayout;
