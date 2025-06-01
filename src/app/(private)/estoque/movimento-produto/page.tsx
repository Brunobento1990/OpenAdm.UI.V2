"use client";

import ChipApp from "@/components/chip";
import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { tipoMovimentacaoDeProduto } from "@/enums/TipoMovimentacaoProduto";

export default function MovimentoProdutoPaginacao() {
  return (
    <TabelaPaginacao
      columns={[
        {
          flex: 0.2,
          minWidth: 200,
          field: "produto",
          headerName: "Produto",
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "peso",
          headerName: "Peso",
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "tamanho",
          headerName: "Tamanho",
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "quantidadeMovimentada",
          headerName: "Quantidade movimentadao",
          sortable: true,
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "tipoMovimentacaoDeProduto",
          headerName: "Tipo Movimentação",
          renderCell: (params: any) => {

            const status =
              tipoMovimentacaoDeProduto[params.tipoMovimentacaoDeProduto];

            if (!status) {
              return <></>;
            }

            return (
              <ChipApp
                rounded
                size="small"
                skin="light"
                color={status.color}
                label={status.title}
                sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
              />
            );
          },
        },
      ]}
      url={rotasApi.movimentoProduto.paginacao}
      urlAdd={rotasApp.movimentoProduto.create}
    />
  );
}
