import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E131F",
    },
    success: {
      main: "#38405F",
    },
    secondary: {
      main: "#8B939C",
    },
    info: {
      main: "#59546C",
    },
    error: {
      main: "#C41538",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: "11px",
        },
      },
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
