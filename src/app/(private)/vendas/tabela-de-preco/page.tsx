"use client";

import { CheckBoxApp } from "@/components/checkbox/inedx";
import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";

export default function TabelaDePrecoPaginacao() {
  return (
    <TabelaPaginacao
      columns={[
        {
          flex: 0.2,
          minWidth: 200,
          field: "descricao",
          headerName: "Descricao",
          sortable: true,
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "ativaEcommerce",
          headerName: "Ativa",
          renderCell: (params: any) => (
            <CheckBoxApp value={params.ativaEcommerce} />
          ),
        },
      ]}
      url={rotasApi.tabelaDePreco.paginacao}
      urlAdd={rotasApp.tabelaDePreco.create}
      urlView={rotasApp.tabelaDePreco.view}
      urlEdit={rotasApp.tabelaDePreco.edit}
    />
  );
}
