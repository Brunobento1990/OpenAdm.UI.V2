"use client";

import { CheckBoxApp } from "@/components/checkbox/inedx";
import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { Box } from "@mui/material";

export default function CategoriaPaginacao() {
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
          field: "inativoEcommerce",
          headerName: "Inativo Ecommerce",
          renderCell: (params: any) => (
            <CheckBoxApp value={params.inativoEcommerce} />
          ),
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "foto",
          headerName: "Foto",
          renderCell: (params: any) => {
            if (!params.foto) {
              return <></>;
            }
            return (
              <Box
                component="img"
                src={params.foto}
                sx={{ width: "100px", height: "50px", borderRadius: "5px" }}
              />
            );
          },
          sortable: true,
        },
      ]}
      url={rotasApi.categoria.paginacao}
      urlAdd={rotasApp.categoria.create}
      urlDelete={rotasApi.categoria.delete}
      urlView={rotasApp.categoria.view}
      urlEdit={rotasApp.categoria.edit}
    />
  );
}
