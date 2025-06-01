"use client";

import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";

export default function PesoPaginacao() {
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
      url={rotasApi.peso.paginacao}
      urlAdd={rotasApp.peso.create}
      urlDelete={rotasApi.peso.delete}
      urlView={rotasApp.peso.view}
      urlEdit={rotasApp.peso.edit}
    />
  );
}
