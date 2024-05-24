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
          backgroundImage:
            'url("https://tech-libra-images.s3.ap-northeast-1.amazonaws.com/background_image.png")',
          // backgroundSize: "cover",
          // backgroundPosition: "top-left",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          position: "relative", // fixed?
          top: 0,
          left: 0,
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default theme;
