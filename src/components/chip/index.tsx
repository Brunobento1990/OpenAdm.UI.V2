import MuiChip from "@mui/material/Chip";
import clsx from "clsx";
import { ChipProps } from "@mui/material/Chip";

export type CustomChipProps = ChipProps & { skin?: "light"; rounded?: boolean };

const ChipApp = (props: CustomChipProps) => {
  const { sx, skin, color, rounded } = props;

  const propsToPass = { ...props };

  propsToPass.rounded = undefined;

  return (
    <MuiChip
      {...propsToPass}
      variant="filled"
      className={clsx({
        "MuiChip-rounded": rounded,
        "MuiChip-light": skin === "light",
      })}
      color={color}
      sx={sx}
    />
  );
};

export default ChipApp;
