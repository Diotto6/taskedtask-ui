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
import { ReactNode } from "react";
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
import Image from "next/image";
import Org from "../../assets/OrgProjects.gif";

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
      <Grid container component="main" height="100vh" p="5%">
        <CssBaseline />
        <Grid
          item
          xs={13}
          sm={12}
          md={5}
          lg={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography
              fontSize="24px"
              variant="button"
              fontWeight="600"
              fontStyle="oblique"
            >
              Entrar
            </Typography>
            <svg
              width={28}
              height={28}
              viewBox="0 0 440 640"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7 332.3h412.7v22c0 37.7-29.3 68-65.3 68h-19L259.3 512v-89.7H83c-36 0-65.3-30.3-65.3-68v-22zm0-23.6h412.7v-85H17.7v85zm0-109.4h412.7v-85H17.7v85zM365 0H83C47 0 17.7 30.3 17.7 67.7V90h412.7V67.7C430.3 30.3 401 0 365 0z"
                fill="#131212"
              />
            </svg>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "500px" }}>
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
            <Grid item>
              <Link href="/registration" variant="subtitle1">
                {"Não possui uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </form>
        </Grid>
        <Grid
          item
          xs={false}
          sm={false}
          md={6}
          alignItems="center"
          justifyContent="center"
          sx={{
            display: { sm: "none", md: "flex", xs: "none" },
          }}
        >
          <Image src={Org} alt="Org Projects Login image" />
        </Grid>
        <Grid
          item
          width="100vw"
          display="flex"
          alignItems="end"
          justifyContent="right"
          component="footer"
        >
          <Copyright />
          <a href="https://www.instagram.com/nicodiotto/">
            <svg
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer"
              width={28}
              height={28}
              viewBox="0 0 448 512"
              fill="#0E131F"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                stroke="#0E131F"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/nicolas-diotto-741404218/">
            <svg
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer"
              width={24}
              height={24}
              viewBox="0 0 448 512"
              fill="#0E131F"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                stroke="#0E131F"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="https://github.com/Diotto6">
            <svg
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer"
              width={24}
              height={24}
              viewBox="0 0 448 512"
              fill="#0E131F"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                stroke="#0E131F"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
