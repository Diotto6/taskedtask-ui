import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#333",
    },
    info: {
      main: "#fdfdfd",
    },
    error: {
      main: "#E81B17",
    },
  },

  typography: {
    h5: {
      fontWeight: "500",
    },
    fontFamily: `system-ui`,
  },
});

export default theme;
