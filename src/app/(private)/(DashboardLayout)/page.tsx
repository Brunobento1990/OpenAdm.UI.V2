"use client";
import { Box } from "@mui/material";
// components
import MovimentoProdutoHomePage from "@/app/(private)/(DashboardLayout)/components/dashboard/MovimentoProdutoHomePage";
import MonthlyEarnings from "@/app/(private)/(DashboardLayout)/components/dashboard/MonthlyEarnings";
import { GridApp } from "@/components/grid/GridApp";
import { useHomeApi } from "@/api/UseHomeApi";
import { useEffect, useState } from "react";
import { IHome } from "@/interfaces/Home";
import ComparacaoPedidoMes from "./components/dashboard/ComparacaoPedidoMes";
import PageContainer from "./components/container/PageContainer";
import { LoadingAppTexto } from "@/components/loading";

const Dashboard = () => {
  const [home, setHome] = useState<IHome>();
  const { obterHome } = useHomeApi();

  async function init() {
    const response = await obterHome.fetch();
    if (response) {
      setHome(response);
    }
  }

  useEffect(() => {
    init();
  }, []);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      {obterHome.status === "loading" ? (
        <LoadingAppTexto comBox />
      ) : (
        <Box>
          <GridApp container spacing={3}>
            <GridApp xs={12} lg={8}>
              <MovimentoProdutoHomePage movimentos={home?.movimentos ?? []} />
            </GridApp>
            <GridApp xs={12} lg={4}>
              <GridApp container spacing={3}>
                <GridApp xs={12}>
                  <ComparacaoPedidoMes variacao={home?.variacaoMensalPedido} />
                </GridApp>
                <GridApp xs={12}>
                  <MonthlyEarnings
                    titulo="Acesso e-commerce"
                    subTitulo={`${home?.quantidadeDeAcessoEcommerce}`}
                    subTitulo2="no mês"
                  />
                </GridApp>
              </GridApp>
            </GridApp>
            {/* <GridApp xs={12} lg={4}>
            <RecentTransactions />
          </GridApp>
          <GridApp xs={12} lg={8}>
            <ProductPerformance />
          </GridApp>
          <GridApp xs={12}>
            <Blog />
          </GridApp> */}
          </GridApp>
        </Box>
      )}
    </PageContainer>
  );
};

export default Dashboard;
