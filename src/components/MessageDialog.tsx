import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@mui/icons-material";
import {
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Dialog,
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
  console.log(message);

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
    const msg = await putMessages({ id, message, userId }).unwrap();

    toast.dismiss();
    toast.success(msg.message);
    reset({ message: "" });
    onClose();
    refetch();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="lg">
      <DialogTitle width={"calc(100% - 40px)"} noWrap>
        Editar Recado
        <IconButton
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
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit as FieldValue<any>)}>
          <TextField
            fullWidth
            required
            id="message"
            variant="outlined"
            label="Edite seu recado"
            error={Boolean(errors.message)}
            {...register("message")}
            helperText={errors.message?.message as ReactNode}
          />

          <DialogActions>
            <Button
              onClick={() => {
                reset({ message: "" });
                onClose();
              }}
              color="error"
            >
              Cancelar
            </Button>
            <Button variant="contained" type="submit" color="secondary">
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
