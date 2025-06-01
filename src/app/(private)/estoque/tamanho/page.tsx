"use client";

import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";

export default function TamanhoPaginacao() {
  return (
    <TabelaPaginacao
      columns={[
        {
          flex: 0.2,
          minWidth: 200,
          field: "descricao",
          headerName: "Descrição",
          sortable: true,
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "pesoReal",
          headerName: "Peso real",
        },
      ]}
      url={rotasApi.tamanho.paginacao}
      urlAdd={rotasApp.tamanho.create}
      urlDelete={rotasApi.tamanho.delete}
      urlView={rotasApp.tamanho.view}
      urlEdit={rotasApp.tamanho.edit}
    />
  );
}
