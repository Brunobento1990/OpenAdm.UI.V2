import { Typography } from "@mui/material";

interface PropsTextApp {
  titulo?: string;
  fontSize?: string;
  fontWeight?: number;
  color?:
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "textDisabled"
    | "textPrimary"
    | "textSecondary";
}

export function TextApp(props: PropsTextApp) {
  return (
    <Typography
      fontSize={props.fontSize}
      color={props.color}
      fontWeight={props.fontWeight}
    >
      {props.titulo ?? ""}
    </Typography>
  );
}
