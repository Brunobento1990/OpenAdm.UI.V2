import { Stack, Typography } from "@mui/material";
import DashboardCard from "@/app/(private)/(DashboardLayout)/components/shared/DashboardCard";

interface PropsMonthlyEarnings {
  titulo: string;
  subTitulo: string;
  subTitulo2: string;
}

const MonthlyEarnings = (props: PropsMonthlyEarnings) => {
  return (
    <DashboardCard title={props.titulo}>
      <>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Typography variant="subtitle2" fontWeight="600">
            {props.subTitulo}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {props.subTitulo2}
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
