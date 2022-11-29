import { ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  Menu,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { ExitToApp } from "@mui/icons-material";
import { destroyCookie, parseCookies } from "nookies";
import { setToken } from "../../redux/features/authSlice";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { messageSchema } from "../../schemas";
import { MessagesTypeProps } from "../../types";
import {
  useDestroyMessagesMutation,
  useGetMessagesRefetchMutation,
  usePostMessagesMutation,
} from "../../redux/services/api";
import { useAppDispatch } from "../../hooks/store";
import theme from "../../styles/theme";
import Copyright from "../../components/Copyright";
import MessageDialog from "../../components/MessageDialog";
import { titleize } from "../../utils/titleize";

type USER_DICE = {
  user: {
    token: string;
    name: string;
    userId: string;
  };
  userId: string;
};

export default function ErrandPage({ ...props }: USER_DICE) {
  const userId = props.userId;
  const token = props.user.token;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [dice, setDice] = useState<MessagesTypeProps>();
  const redirect = () => {
    {
      router.push({
        pathname: "/login",
      });
    }
  };

  const [getMessagesRefetch, { data, isLoading, isSuccess, isError }] =
    useGetMessagesRefetchMutation();

  const firstName = data?.service[0].firstName;
  const lastName = data?.service[0].lastName;
  const firstLetter = firstName?.split("")[0].toUpperCase();
  const lastletter = lastName?.split("")[0].toUpperCase();

  const [postMessages] = usePostMessagesMutation();

  const [destroyMessages] = useDestroyMessagesMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessagesTypeProps>({
    resolver: yupResolver(messageSchema),
  });

  const onSubmit = async (result: MessagesTypeProps) => {
    result.userId = userId;
    const msg = await postMessages(result).unwrap();
    getMessagesRefetch(userId);
    reset({ message: "" });
    return msg;
  };

  useEffect(() => {
    dispatch(setToken({ token }));
    getMessagesRefetch(router.query.userId! as string);
  }, [dispatch, getMessagesRefetch, router.query.userId, token, userId]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  function destroyMessage(arg: MessagesTypeProps) {
    destroyMessages(arg);
    getMessagesRefetch(userId);
  }
  const color = [
    "red",
    "yellow",
    "white",
    "orange",
    "blue",
    "green",
    "pink",
    "purple",
    "cyan",
  ];

  const backColor = Math.floor(Math.random() * color.length);

  console.log(color[backColor]);

  return (
    <>
      <ThemeProvider theme={theme}>
        {isSuccess ? (
          <Grid
            container
            component="header"
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
            }}
          >
            <CssBaseline />
            <Grid container sx={{ display: "flex", backgroundColor: "black" }}>
              <Grid
                container
                sx={{
                  height: "70px",
                  display: "flex",
                  alignItems: "center",
                  color: "whitesmoke",
                  justifyContent: "space-between",
                }}
              >
                <Grid pl="1rem">
                  <Typography variant="h6">
                    Seus recados {titleize(firstName + " " + lastName)}
                  </Typography>
                </Grid>
                <Grid pr="3rem">
                  <Box
                    sx={{
                      backgroundColor: color[backColor],
                      borderRadius: "50%",
                    }}
                  >
                    <IconButton onClick={handleClick} size="small">
                      <Typography color="white">
                        {firstLetter + lastletter}
                      </Typography>
                    </IconButton>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 3,
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Button
                      type="submit"
                      onClick={() => {
                        destroyCookie(null, "token");
                        destroyCookie(null, "userId");
                        destroyCookie(null, "token");
                        redirect();
                      }}
                    >
                      <ExitToApp />
                      <Typography variant="subtitle2"> Sair </Typography>
                    </Button>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  item
                  width="80vw"
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                  p="3rem 0"
                  component={Box}
                >
                  <TextField
                    sx={{
                      padding: "0 0.5rem 0 0 ",
                    }}
                    fullWidth
                    id="message"
                    variant="outlined"
                    label="Digite seu recado"
                    error={Boolean(errors.message)}
                    {...register("message")}
                    helperText={errors.message?.message as ReactNode}
                  />

                  <Box
                    sx={{
                      pb: errors.message ? "22px" : 0,
                    }}
                  >
                    <Button variant="contained" type="submit" color="secondary">
                      {isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                  </Box>
                </Grid>
              </form>
            </Grid>

            {data.errand ? (
              <>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {data.errand && data.errand.length > 0 ? (
                    <Grid
                      alignItems="center"
                      display="flex"
                      justifyContent="center"
                      component={Paper}
                      elevation={3}
                      xs={10}
                      sm={10}
                      md={11}
                    >
                      <TableContainer component={Card}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#c4c2c2" }}>
                              <TableCell>
                                <Typography variant="h6">Recados </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="h6">Ações</Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {isLoading ? (
                              <>
                                <Box
                                  width="100vw"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <CircularProgress color="primary" />
                                </Box>
                              </>
                            ) : null}
                            {data?.errand.map((e: MessagesTypeProps) => {
                              return (
                                <Fragment key={e.id}>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      <Typography variant="h6">
                                        {e.message}
                                      </Typography>
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Box pr={1}>
                                        <Button
                                          variant="contained"
                                          color="secondary"
                                          onClick={() => {
                                            setOpenDialog(true);
                                            console.log(e);
                                            setDice(e);
                                            console.log(openDialog);
                                          }}
                                        >
                                          <Typography variant="body2">
                                            Editar
                                          </Typography>
                                        </Button>
                                      </Box>
                                      <Box>
                                        <Button
                                          variant="contained"
                                          type="submit"
                                          color="error"
                                          onClick={() => destroyMessage(e)}
                                        >
                                          <Typography variant="body2">
                                            Deletar
                                          </Typography>
                                        </Button>
                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                  <MessageDialog
                                    onClose={() => {
                                      setOpenDialog(false);
                                    }}
                                    refetch={() => getMessagesRefetch(e.userId)}
                                    open={openDialog}
                                    arg={dice !== undefined ? dice : e}
                                  />
                                </Fragment>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  ) : (
                    <Typography variant="h6">Não há recados...</Typography>
                  )}
                </Grid>
                <Copyright sx={{ mt: 10 }} />
              </>
            ) : null}
          </Grid>
        ) : isError ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70vh"
          >
            <Typography variant="h6">
              Algo deu errado
              <Link
                href="/login"
                variant="subtitle1"
                sx={{
                  color: "black",
                }}
              >
                {<Typography variant="h6">Faça login novamente</Typography>}
              </Link>
            </Typography>
          </Box>
        ) : null}
      </ThemeProvider>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const userId = ctx.params?.userId;

  const userCookies = parseCookies(ctx);

  return {
    props: {
      user: userCookies,
      userId: userId,
    },
  };
}
