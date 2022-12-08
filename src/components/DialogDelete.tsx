import { Close } from "@mui/icons-material";
import {
  DialogTitle,
  Icon,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDestroyMessagesMutation } from "../redux/services/api";
import type { MessagesTypeProps } from "../types";

type DialogProps = {
  open: boolean;
  arg: MessagesTypeProps;
  refetch: () => void;
  onClose: () => void;
};

export default function MessageDialogDelete({
  open,
  arg,
  refetch,
  onClose,
}: DialogProps) {
  const { message } = arg;
  const [destroyMessages, { isLoading }] = useDestroyMessagesMutation();

  async function destroyMessage(result: MessagesTypeProps) {
    await destroyMessages(result)
      .unwrap()
      .then((payload) => {
        if (payload.ok) {
          toast.error("Recado deletado com sucesso!");
          setTimeout(() => {
            onClose();
            refetch();
          }, 450);
        } else {
          toast.error("Ops.. algo deu errado, tente novamente");
          refetch();
        }
      })
      .catch((error) => console.error("rejected", error));
  }

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle noWrap>
        Deletar Recado
        <Icon
          aria-label="close"
          onClick={() => {
            onClose();
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
        <Box display="flex">
          <Typography variant="h6">Tem certeza que deseja deletar</Typography>
          <Box pl={1.5}>
            <Typography variant="h6">
              <span
                style={{ textDecoration: "underline" }}
              >{`"${message}"`}</span>
            </Typography>
          </Box>
        </Box>
        <DialogActions sx={{ pt: 2 }}>
          <Box pr={2}>
            <Button
              onClick={() => {
                onClose();
              }}
              color="secondary"
            >
              Cancelar
            </Button>
          </Box>
          <Button
            variant="contained"
            type="submit"
            color="error"
            onClick={() => destroyMessage(arg)}
          >
            {isLoading ? "Deletando..." : "Deletar"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
