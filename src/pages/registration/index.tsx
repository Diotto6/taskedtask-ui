import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { userSchema } from "../../schemas";
import { CreateUserType } from "../../types";
import { createUser } from "../api/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import path from "node:path/win32";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Diotto Dev
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const createUserDefault: CreateUserType = {
  email: "",
  password: "",
};

const theme = createTheme();

export default function LoginPage() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: createUserDefault,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      const response = await createUser(data);
      if (response.ok) {
        toast.dismiss();
        toast.success(response.message);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.dismiss();
        toast.error(response.message);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              paddingTop: "8rem",
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Cadastrar
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  value={formik.values.email}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  value={formik.values.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continuar
                </Button>
              </form>
              <Grid container>
                <Grid item>
                  <Link
                    href="/login"
                    variant="subtitle1"
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    {"Já possui um cadastro? Entrar aqui."}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
