import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { setToken } from "../../redux/features/authSlice";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { messageSchema } from "../../schemas";
import { MessagesTypeProps } from "../../types";
import {
  useGetMessagesRefetchMutation,
  usePostMessagesMutation,
} from "../../redux/services/api";
import { useAppDispatch } from "../../hooks/store";
import theme from "../../styles/theme";
import MessageDialog from "../../components/MessageDialog";
import MessageDialogDelete from "../../components/DialogDelete";
import { toast } from "react-toastify";
import Invoice from "../../assets/Invoice.gif";
import Image from "next/image";
import { HeaderMessages } from "../../components/HeaderMessages";

type USER_DICE = {
  user: {
    token: string;
    name: string;
    userId: string;
  };
  userId: string;
  data: {
    service: {
      firstName: string;
      lastName: string;
    }[];
  };
};

export default function ErrandPage({ ...props }: USER_DICE) {
  const userId = props.userId;
  const token = props.user.token;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [dice, setDice] = useState<MessagesTypeProps>();

  const [getMessagesRefetch, { data, isLoading, isSuccess, isError }] =
    useGetMessagesRefetchMutation();

  const firstName = props.data.service[0].firstName;
  const lastName = props.data.service[0].lastName;

  const [postMessages] = usePostMessagesMutation();

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
    const msg = await postMessages(result)
      .unwrap()
      .then((pay) => {
        if (pay.ok) {
          toast.dismiss();
          toast.success("Recado adicionado com sucesso!");
          setTimeout(() => {
            getMessagesRefetch(userId);
            reset({ message: "" });
          }, 1000);
        } else {
          toast.dismiss();
          toast.error("Ops.. algo deu errado, tente novamente");
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return msg;
  };

  useEffect(() => {
    dispatch(setToken({ token }));
    getMessagesRefetch(router.query.userId! as string);
  }, [dispatch, getMessagesRefetch, router.query.userId, token, userId]);

  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          <HeaderMessages name={firstName + " " + lastName} />
          <Grid
            sx={{
              display: "flex",
              height: "90vh",
            }}
          >
            <Grid
              item
              sm={false}
              md={5}
              sx={{
                width: "40vw",
                alignItems: "center",
                justifyContent: "center",
                display: { sm: "none", md: "flex", xs: "none" },
              }}
            >
              <Image src={Invoice} alt="Gif of add Task" />
            </Grid>
            <Grid
              sx={{
                width: "60vw",
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  item
                  width="47vw"
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                  p="3rem 0"
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
              {isLoading ? (
                <>
                  <Box
                    width="46vw"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CircularProgress color="primary" />
                  </Box>
                </>
              ) : isSuccess ? (
                <>
                  {data.errand ? (
                    <>
                      <Grid
                        container
                        display="flex"
                        width="50vw"
                        pl="10px"
                        pr="35px"
                      >
                        {data.errand && data.errand.length > 0 ? (
                          <TableContainer component={Card}>
                            <Table>
                              <TableHead>
                                <TableRow sx={{ backgroundColor: "#8B939C" }}>
                                  <TableCell>
                                    <Typography
                                      fontSize="18px"
                                      variant="button"
                                      fontWeight="500"
                                      fontStyle="oblique"
                                    >
                                      Recados
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography
                                      fontSize="18px"
                                      variant="button"
                                      fontWeight="500"
                                      fontStyle="oblique"
                                    >
                                      Ações
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
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
                                                setDice(e);
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
                                              onClick={() => {
                                                setOpenDialogDelete(true);
                                                setDice(e);
                                              }}
                                            >
                                              <Typography variant="body2">
                                                Deletar
                                              </Typography>
                                            </Button>
                                          </Box>
                                        </TableCell>
                                      </TableRow>
                                      <MessageDialogDelete
                                        onClose={() => {
                                          setOpenDialogDelete(false);
                                        }}
                                        refetch={() =>
                                          getMessagesRefetch(e.userId)
                                        }
                                        open={openDialogDelete}
                                        arg={dice !== undefined ? dice : e}
                                      />
                                      <MessageDialog
                                        onClose={() => {
                                          setOpenDialog(false);
                                        }}
                                        refetch={() =>
                                          getMessagesRefetch(e.userId)
                                        }
                                        open={openDialog}
                                        arg={dice !== undefined ? dice : e}
                                      />
                                    </Fragment>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        ) : (
                          <Typography variant="h6">
                            Não há recados...
                          </Typography>
                        )}
                      </Grid>
                    </>
                  ) : null}
                </>
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
                      {
                        <Typography variant="h6">
                          Faça login novamente
                        </Typography>
                      }
                    </Link>
                  </Typography>
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </>
      </ThemeProvider>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const userId = ctx.params?.userId as string;
  const res = await fetch(`http://localhost:9009/messages/${userId}`);
  const data = await res.json();
  const userCookies = parseCookies(ctx);

  return {
    props: {
      user: userCookies,
      userId: userId,
      data: data,
    },
  };
}
