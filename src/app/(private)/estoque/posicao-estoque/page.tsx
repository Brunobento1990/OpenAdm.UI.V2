"use client";

import ChipApp from "@/components/chip";
import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { formatDateComHoras } from "@/utils/mascaras/FormtaDate";

export const quantidade: any = {
  0: { title: "Em aberto", color: "warning" },
  1: { title: "Entregue", color: "success" },
};

export default function PosicaoEstoquePaginacao() {
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
          flex: 0.1,
          minWidth: 100,
          field: "peso",
          headerName: "Peso",
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: "tamanho",
          headerName: "Tamanho",
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "quantidade",
          headerName: "Posição do estoque",
          renderCell: (params: any) => {
            const status = quantidade[params.quantidade > 0 ? 1 : 0];

            return (
              <ChipApp
                rounded
                size="small"
                skin="light"
                color={status.color}
                label={params.quantidade}
                sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
              />
            );
          },
        },
        {
          flex: 0.175,
          minWidth: 140,
          field: "dataDeAtualizacao",
          headerName: "Ultima movimentação",
          renderCell: (params: any) => {
            return formatDateComHoras(params.dataDeAtualizacao);
          },
        },
      ]}
      url={rotasApi.posicaoEstoque.paginacao}
      urlEdit={rotasApp.posicaoEstoque.edit}
    />
  );
}
