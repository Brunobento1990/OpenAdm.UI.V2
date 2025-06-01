"use client";

import { CheckBoxApp } from "@/components/checkbox/inedx";
import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { Box } from "@mui/material";

export default function BannerPaginacao() {
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
              src={params.foto}
              sx={{ width: "100px", height: "50px", borderRadius: "5px" }}
            />
          ),
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "ativo",
          headerName: "Ativo",
          renderCell: (params: any) => <CheckBoxApp value={params.ativo} />,
          sortable: true,
        },
      ]}
      url={rotasApi.banner.paginacao}
      urlAdd={rotasApp.banner.create}
      urlDelete={rotasApi.banner.delete}
      urlView={rotasApp.banner.view}
      urlEdit={rotasApp.banner.edit}
    />
  );
}
