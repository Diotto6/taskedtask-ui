import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { userSchema } from "../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePostUserMutation } from "../../redux/services/api";
import { UserTypeProps } from "../../types";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/authSlice";
import { setCookie } from "nookies";
import Copyright from "../../components/Copyright";
import theme from "../../styles/theme";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [postUser, { isLoading, isError }] = usePostUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserTypeProps>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (result: UserTypeProps) => {
    try {
      const data = await postUser(result).unwrap();

      if (data?.ok === true) {
        toast.dismiss();
        toast.success(data?.message);
        dispatch(setToken({ token: data.token }));
        setCookie(null, "token", data.token, {
          maxAge: 86400,
          path: `/messages/${data.user.id}`,
        });
        setCookie(null, "userId", data.user.id, {
          maxAge: 86400,
          path: `/messages/${data.user.id}`,
        });
        setCookie(
          null,
          "name",
          data.user.firstName + " " + data.user.lastName,
          {
            maxAge: 86400,
            path: `/messages/${data.user.id}`,
          }
        );
        setTimeout(() => {
          router.push({
            pathname: `/messages/${data.user.id}`,
          });
        }, 2000);
        if (data?.ok === false) {
          toast.dismiss();
          toast.error(data?.message);
        }
        if (isError) {
          toast.dismiss();
          toast.error("Algo deu errado, tente novamente");
        }
      }
    } catch (error) {
      console.error("rejected", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          component={Paper}
          elevation={3}
          square
          sx={{ height: "100%" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <motion.h2
                animate={{
                  translateY: [-150, 0],
                  rotateX: [0, 270, 0],
                  scale: [3, 1],
                }}
                transition={{ duration: 2 }}
              >
                Entrar
              </motion.h2>
            </Box>
            <Box sx={{ mt: 1 }}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ maxWidth: "500px" }}
              >
                <TextField
                  margin="dense"
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  autoFocus
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLoading ? (
                    <>
                      <Typography pr={1}>Entrando</Typography>
                      <Box display="inline-flex">
                        <CircularProgress size={17} color="info" />
                      </Box>
                    </>
                  ) : (
                    <Typography>Entrar</Typography>
                  )}
                </Button>
              </form>
              <Grid container>
                <Link href="/registration" variant="subtitle1">
                  {"Não possui uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: "25%" }} />
        </Grid>
        <Grid
          item
          xs={false}
          sm={6}
          md={7}
          sx={{
            backgroundImage:
              "url(https://getwallpapers.com/wallpaper/full/8/4/8/82583.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Grid>
      </Grid>
    </ThemeProvider>
  );
}
