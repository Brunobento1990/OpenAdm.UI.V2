"use client";
import { Box } from "@mui/material";
// components
import MovimentoProdutoHomePage from "@/app/(private)/(DashboardLayout)/components/dashboard/MovimentoProdutoHomePage";
import MonthlyEarnings from "@/app/(private)/(DashboardLayout)/components/dashboard/MonthlyEarnings";
import { GridApp } from "@/components/grid/GridApp";
import { useHomeApi } from "@/api/UseHomeApi";
import { useEffect, useState } from "react";
import { IHome, IPosicaoEstoqueHome } from "@/interfaces/Home";
import ComparacaoPedidoMes from "./components/dashboard/ComparacaoPedidoMes";
import PageContainer from "./components/container/PageContainer";
import { LoadingAppTexto } from "@/components/loading";
import { TableApp } from "@/components/tabela-paginacao/tabela";
import { BoxApp } from "@/components/box/BoxApp";
import { TextApp } from "@/components/text/TextApp";
import DashboardCard from "./components/shared/DashboardCard";

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
        <Box height="100%">
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
          <GridApp marginTop="1rem" container spacing={3}>
            <GridApp xs={12} sm={8}>
              <DashboardCard title="Posição de estoque">
                <TableApp
                  stickyHeader
                  columns={[
                    {
                      field: "foto",
                      headerName: "Produto",
                      renderCell: (row: IPosicaoEstoqueHome) => {
                        return (
                          <BoxApp display="flex" alignItems="center" gap="5px">
                            <img
                              style={{ maxWidth: "30px" }}
                              src={row.foto}
                              alt={row.produto}
                            />
                            <TextApp titulo={row.produto} />
                          </BoxApp>
                        );
                      },
                    },
                    {
                      field: "quantidade",
                      headerName: "Quantidade",
                    },
                    {
                      field: "tamanho",
                      headerName: "Tamanho/Peso",
                      renderCell: (row: IPosicaoEstoqueHome) =>
                        row.peso ? row.peso : row.tamanho,
                    },
                  ]}
                  rows={home?.posicaoDeEstoques ?? []}
                />
              </DashboardCard>
            </GridApp>
            <GridApp xs={12} sm={4}>
              <MonthlyEarnings
                titulo="Pedidos em aberto"
                subTitulo={`${home?.pedidosEmAberto}`}
                subTitulo2=" pedidos"
              />
            </GridApp>
          </GridApp>
        </Box>
      )}
    </PageContainer>
  );
};

export default Dashboard;
