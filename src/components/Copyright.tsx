import { SxProps, Typography, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { DetailsHTMLAttributes } from "react";

interface CopyrightProps extends DetailsHTMLAttributes<HTMLSpanElement> {
  prop?: OverridableComponent<TypographyTypeMap<{}, "span">>;
  sx?: SxProps;
}

function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Diotto Dev
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
