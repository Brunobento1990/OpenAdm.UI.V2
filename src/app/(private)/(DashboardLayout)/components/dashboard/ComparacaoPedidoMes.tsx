"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar } from "@mui/material";

import DashboardCard from "@/app/(private)/(DashboardLayout)/components/shared/DashboardCard";
import { GridApp } from "@/components/grid/GridApp";
import { IVariacaoMensalPedido } from "@/interfaces/Home";

interface PropsHome {
  variacao?: IVariacaoMensalPedido;
}

const ComparacaoPedidoMes = (props: PropsHome) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    labels: [
      props.variacao?.anoAnterior?.toString() ?? "Ano Anterior",
      props.variacao?.anoAtual?.toString() ?? "Ano Atual",
    ],
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [
    props.variacao?.totalAnoAnterior ?? 0,
    props.variacao?.totalAnoAtual,
  ];

  if (!props.variacao) {
    return <></>;
  }

  return (
    <DashboardCard title="Comparação do mês">
      <GridApp container spacing={3}>
        {/* column */}
        <GridApp xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {props.variacao?.porcentagem > 0 ? "+" : "-"}
            {props.variacao?.porcentagem ?? ""} %
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Typography variant="subtitle2" fontWeight="600">
              {props.variacao?.mes ?? ""}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              ano anterior
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primary,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {props.variacao?.anoAnterior ?? ""}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primarylight,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {props.variacao?.anoAtual ?? ""}
              </Typography>
            </Stack>
          </Stack>
        </GridApp>
        {/* column */}
        <GridApp xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height={150}
            width={"100%"}
          />
        </GridApp>
      </GridApp>
    </DashboardCard>
  );
};

export default ComparacaoPedidoMes;
