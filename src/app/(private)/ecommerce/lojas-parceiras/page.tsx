"use client";

import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { TextApp } from "@/components/text/TextApp";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { telefoneMascara } from "@/utils/mascaras/TelefoneMascara";
import { Box } from "@mui/material";

export default function LojasParceirasPaginacao() {
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
          field: "nome",
          headerName: "Nome",
          sortable: true,
        },
        {
          flex: 0.2,
          minWidth: 200,
          field: "contato",
          headerName: "Contato",
          renderCell: (params: any) => (
            <TextApp titulo={telefoneMascara
              (params.contato)} />
          ),
        },
      ]}
      url={rotasApi.lojasParceiras.paginacao}
      urlAdd={rotasApp.lojasParceiras.create}
      urlDelete={rotasApi.lojasParceiras.delete}
      urlView={rotasApp.lojasParceiras.view}
      urlEdit={rotasApp.lojasParceiras.edit}
    />
  );
}
