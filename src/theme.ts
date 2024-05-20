import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url("/src/assets/images/background_image.png")',
          backgroundSize: "cover",
          // backgroundPosition: "top-left",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          "@media (max-width:600px)": {
            backgroundImage:
              'url("/src/assets/images/background_image_mobile.png")',
          },
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default theme;
