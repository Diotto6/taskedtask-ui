import { Box, Button, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import theme from "../../src/styles/theme";
import { Titleize } from "../components/Titleize";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container sx={{ display: "flex", backgroundColor: "black" }}>
          <Grid
            container
            sx={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              color: "whitesmoke",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              sx={{
                pl: "1rem",
                display: "flex",
                alignItems: "center",
                verticalAlign: "middle",
              }}
            >
              <Titleize />
            </Grid>
            <Grid item display="flex">
              <Box pr="1em">
                <Button
                  sx={{
                    px: 2,
                    py: 1,
                  }}
                  onClick={() =>
                    router.push({
                      pathname: "/registration",
                    })
                  }
                  variant="contained"
                  color="info"
                >
                  Comece agora
                </Button>
              </Box>
              <Box pr="1em">
                <Button
                  sx={{
                    px: 2,
                    py: 1,
                  }}
                  onClick={() =>
                    router.push({
                      pathname: "/login",
                    })
                  }
                  variant="contained"
                  color="success"
                >
                  Entrar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid component="footer" color="blanchedalmond"></Grid>
      </ThemeProvider>
    </>
  );
}
