"use client";

import React from "react";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(private)/(DashboardLayout)/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import { IMovimentoProdutoHome } from "@/interfaces/Home";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PropsMovimentoProdutoHomePage {
  movimentos: IMovimentoProdutoHome[];
}

const MovimentoProdutoHomePage = (props: PropsMovimentoProdutoHomePage) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const categorias = Array.from(
    new Set(
      props.movimentos.flatMap((mov) =>
        mov.dados.map((d) => d.categoria.trim())
      )
    )
  );

  const seriescolumnchart = categorias.map((categoria) => ({
    name: categoria,
    data: props.movimentos.map((mov) => {
      const item = mov.dados.find((d) => d.categoria.trim() === categoria);
      return item ? item.quantidade : 0;
    }),
  }));

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: props.movimentos.map((x) => x.mes),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };
  return (
    <DashboardCard
      title={`Movimento de produtos dos últimos ${props.movimentos.length} meses`}
    >
      <Chart
        options={{
          ...optionscolumnchart,
          chart: {
            toolbar: {
              show: true,
              tools: {
                download: false,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true,
              },
            },
          },
        }}
        series={seriescolumnchart}
        type="bar"
        height={370}
        width={"100%"}
      />
    </DashboardCard>
  );
};

export default MovimentoProdutoHomePage;
