"use client";

import { CheckBoxApp } from "@/components/checkbox/inedx";
import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { Box } from "@mui/material";

export default function ProdutoPaginacao() {
  return (
    <TabelaPaginacao
      columns={[
        {
          flex: 0.2,
          minWidth: 200,
          field: "foto",
          headerName: "Foto",
          renderCell: (params: any) => (
            <Box
              component="img"
              loading="lazy"
              src={params.foto}
              sx={{ width: "100px", height: "50px", borderRadius: "5px" }}
            />
          ),
        },
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
          field: "referencia",
          headerName: "Referencia",
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "inativoEcommerce",
          headerName: "Inativo",
          renderCell: (params: any) => (
            <CheckBoxApp value={params.inativoEcommerce} />
          ),
        },
      ]}
      url={rotasApi.produto.paginacao}
      urlAdd={rotasApp.produto.create}
      urlDelete={rotasApi.produto.delete}
      urlView={rotasApp.produto.view}
      urlEdit={rotasApp.produto.edit}
    />
  );
}
