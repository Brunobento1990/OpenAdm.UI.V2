"use client";

import { useApiProduto } from "@/api/UseApiProduto";
import { CheckBoxApp } from "@/components/checkbox/inedx";
import { useModal } from "@/components/modal";
import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { IProduto } from "@/interfaces/Produto";
import { Box } from "@mui/material";
import { useState } from "react";

export default function ProdutoPaginacao() {
  const [refresh, setRefresh] = useState(false);
  const { inativar } = useApiProduto();
  const { show } = useModal();

  function inativarProduto(produto: IProduto) {
    if (!produto) {
      return;
    }
    show({
      confirmarPromise: async () => {
        const response = await inativar.fetch(produto.id);
        if (response?.result) {
          setRefresh((state) => !state);
        }
      },
      mensagem: [
        `Produto: ${produto.descricao}`,
        `Deseja realmente ${
          produto.inativoEcommerce ? "ativar" : "inativar"
        } o produto?`,
      ],
    });
  }

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
          renderCell: (params: IProduto) => (
            <CheckBoxApp
              value={params.inativoEcommerce}
              onChange={() => inativarProduto(params)}
            />
          ),
        },
      ]}
      url={rotasApi.produto.paginacao}
      urlAdd={rotasApp.produto.create}
      urlDelete={rotasApi.produto.delete}
      urlView={rotasApp.produto.view}
      urlEdit={rotasApp.produto.edit}
      refreshPai={refresh}
    />
  );
}
