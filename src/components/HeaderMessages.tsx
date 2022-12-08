import { ExitToApp } from "@mui/icons-material";
import {
  Grid,
  Typography,
  IconButton,
  Avatar,
  Menu,
  Button,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useState, MouseEvent } from "react";
import { titleize } from "../utils/titleize";

type HeaderMessagesProps = {
  name: string;
};

export function HeaderMessages({ name }: HeaderMessagesProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const redirect = () => {
    {
      router.push({
        pathname: "/login",
      });
    }
  };
  return (
    <Grid
      container
      sx={{
        height: "80px",
        backgroundColor: "#0E131F",
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
        <Box>
          <svg
            width={28}
            height={28}
            viewBox="0 0 440 640"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.7 332.3h412.7v22c0 37.7-29.3 68-65.3 68h-19L259.3 512v-89.7H83c-36 0-65.3-30.3-65.3-68v-22zm0-23.6h412.7v-85H17.7v85zm0-109.4h412.7v-85H17.7v85zM365 0H83C47 0 17.7 30.3 17.7 67.7V90h412.7V67.7C430.3 30.3 401 0 365 0z"
              fill="#fdfafa"
            />
          </svg>
        </Box>
        <Box pb={1} pl={1}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.8rem",
            }}
          >
            Seus recados {titleize(name)}
          </Typography>
        </Box>
      </Grid>
      <Grid pr="3rem">
        <Box
          sx={{
            borderRadius: "50%",
          }}
        >
          <IconButton color="success" onClick={handleClick} size="small">
            <Avatar />
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
              destroyCookie({}, "token");
              destroyCookie({}, "userId");
              destroyCookie({}, "token");
              redirect();
            }}
          >
            <ExitToApp />
            <Typography sx={{ pl: 1 }} variant="subtitle2">
              Sair do APP
            </Typography>
          </Button>
        </Menu>
      </Grid>
    </Grid>
  );
}
