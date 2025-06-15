import Grid from "@mui/material/Grid";
import { ReactNode } from "react";
import { alignItems, justifyContent } from "../box/BoxApp";

interface propsGridApp {
  children: ReactNode | ReactNode[];
  spacing?: number;
  display?: string;
  xs?: number;
  sm?: number;
  container?: boolean;
  withItem?: boolean;
  marginTop?: string;
  padding?: string;
  width?: string;
  height?: string;
  alignItems?: alignItems;
  justifyContent?: justifyContent;
  md?: number;
  className?: string;
  lg?: number;
  xl?: number;
}

export function GridApp(props: propsGridApp) {
  const size = {
    xs: props.xs,
    sm: props.sm,
    md: props.md,
    lg: props.lg,
    xl: props.xl,
  };
  const sx = {
    marginTop: props.marginTop,
    padding: props.padding,
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
  };

  return (
    <Grid
      sx={sx}
      size={size}
      display={props.display}
      container={props.container}
      spacing={props.spacing}
      className={props.className}
      height={props.height}
    >
      {props.children}
    </Grid>
  );
}
