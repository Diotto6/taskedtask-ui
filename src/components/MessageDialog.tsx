import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@mui/icons-material";
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Dialog,
  Box,
  Icon,
} from "@mui/material";
import { ReactNode, useEffect } from "react";
import { FieldValue, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePutMessagesMutation } from "../redux/services/api";
import { messageSchema } from "../schemas";
import type { MessagesTypeProps } from "../types";

type DialogProps = {
  open: boolean;
  arg: MessagesTypeProps;
  refetch: () => void;
  onClose: () => void;
};

export default function MessageDialog({
  open,
  arg,
  refetch,
  onClose,
}: DialogProps) {
  const { message } = arg;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const [putMessages] = usePutMessagesMutation();

  useEffect(() => {
    if (open) {
      reset({ message });
    }
  }, [arg, message, reset, open, onClose]);

  const onSubmit = async (data: { message: string }) => {
    const { message } = data;
    const { id, userId } = arg;

    await putMessages({ id, message, userId })
      .unwrap()
      .then((msg) => {
        if (msg.ok) {
          toast.success("Recado alterado com sucesso!");
          reset({ message: "" });
          setTimeout(() => {
            onClose();
            refetch();
          }, 450);
        } else {
          toast.error("Ops.. algo deu errado, tente novamente");
          refetch();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle noWrap>
        Editar Recado
        <Icon
          aria-label="close"
          onClick={() => {
            onClose();
            reset({ message: "" });
          }}
          sx={{
            position: "absolute",
            right: 10,
            top: 8,
          }}
        >
          <Close />
        </Icon>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit as FieldValue<any>)}>
          <TextField
            fullWidth
            id="message"
            variant="standard"
            label="Edite seu recado"
            error={Boolean(errors.message)}
            {...register("message")}
            helperText={errors.message?.message as ReactNode}
          />

          <DialogActions sx={{ pt: 2 }}>
            <Box pr={2}>
              <Button
                onClick={() => {
                  reset({ message: "" });
                  onClose();
                }}
                color="error"
              >
                Cancelar
              </Button>
            </Box>
            <Button variant="contained" type="submit" color="secondary">
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
