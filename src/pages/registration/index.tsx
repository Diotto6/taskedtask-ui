import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThemeProvider } from "@mui/material/styles";
import { createUserSchema } from "../../schemas";
import { CreateUserTypeProps } from "../../types";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { usePostCreateUserMutation } from "../../redux/services/api";
import { ReactNode } from "react";
import Copyright from "../../components/Copyright";
import theme from "../../styles/theme";

export default function LoginPage() {
  const [postCreateUser, { isLoading, isError }] = usePostCreateUserMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserTypeProps>({
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = async (result: CreateUserTypeProps) => {
    const data = await postCreateUser(result).unwrap();
    try {
      if (data?.ok === true) {
        toast.dismiss();
        toast.success(data?.message);
        setTimeout(
          () =>
            router.push({
              pathname: "/login",
            }),
          2000
        );
      }
      if (data?.ok === false) {
        toast.dismiss();
        toast.error(data?.message);
      }
      if (isError) {
        toast.dismiss();
        toast.error("Algo deu errado, tente novamente");
      }
    } catch (error) {
      console.error("rejected", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          height={"100vh"}
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://cdn.wallpapersafari.com/25/40/iQLFe5.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          height={"100vh"}
        >
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <motion.h2
                animate={{
                  translateX: [150, 0],
                  rotate: [0, 270, 0],
                }}
                transition={{ duration: 2 }}
              >
                Cadastrar
              </motion.h2>
            </Box>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoComplete="firstName"
                  error={Boolean(errors.firstName)}
                  {...register("firstName")}
                  helperText={errors.firstName?.message as ReactNode}
                />
                <TextField
                  margin="dense"
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  autoComplete="lastName"
                  error={Boolean(errors.lastName)}
                  {...register("lastName")}
                  helperText={errors.lastName?.message as ReactNode}
                />
                <TextField
                  margin="dense"
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  error={Boolean(errors.email)}
                  {...register("email")}
                  helperText={errors.email?.message as ReactNode}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Senha"
                  type="password"
                  id="password"
                  error={Boolean(errors.password)}
                  {...register("password")}
                  helperText={errors.password?.message as ReactNode}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Confirme a Senha"
                  type="password"
                  id="passwordConfirm"
                  error={Boolean(errors.passwordConfirm)}
                  {...register("passwordConfirm")}
                  helperText={errors.passwordConfirm?.message as ReactNode}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {!isLoading ? (
                    <Typography>Cadastrar</Typography>
                  ) : (
                    <>
                      <Typography pr={1}>Cadastrando</Typography>
                      <Box pr={2} display="inline-flex">
                        <CircularProgress size={17} color="info" />
                      </Box>
                    </>
                  )}
                </Button>
              </form>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="subtitle1">
                    {"Já possui um cadastro? Entrar aqui."}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
