import { Box, keyframes, styled, Typography } from "@mui/material";

const making = keyframes`
0% {
 width: 0px;
}
100% {
width: 17rem;
}
`;

const onAnimation = keyframes`
0% {
border-right-color: rgba(255,255,255, .75);
}
100% {
border-right-color: transparent;
}
`;

type Titleize = {
  name?: string;
};
const Title = styled(Typography)(() => ({
  color: "#eee",
  whiteSpace: "nowrap",
  overflow: "hidden",
  borderRight: "2px solid rgba(255,255,255, 0.75)",
  animation: `${onAnimation} 900ms steps(42) infinite normal , ${making} 4s steps(42) 1s normal both`,
}));

export const Titleize = () => {
  return (
    <Box pb={1}>
      <Title variant="h4">
        TaskedTask APP
        <svg
          width={38}
          height={38}
          viewBox="0 0 440 640"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.7 332.3h412.7v22c0 37.7-29.3 68-65.3 68h-19L259.3 512v-89.7H83c-36 0-65.3-30.3-65.3-68v-22zm0-23.6h412.7v-85H17.7v85zm0-109.4h412.7v-85H17.7v85zM365 0H83C47 0 17.7 30.3 17.7 67.7V90h412.7V67.7C430.3 30.3 401 0 365 0z"
            fill="#ebe7e7"
          />
        </svg>
      </Title>
    </Box>
  );
};
