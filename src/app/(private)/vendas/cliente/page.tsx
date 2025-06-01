"use client";

import { IconButtonAppComTooltip } from "@/components/icon/icon-button-tooltip";
import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { cnpjMascara, cpfMascara } from "@/utils/mascaras/CpfCnpjMascara";
import { telefoneMascara } from "@/utils/mascaras/TelefoneMascara";

export default function ClientePaginacao() {
  const { navigate } = useNavigateApp();
  return (
    <TabelaPaginacao
      columns={[
        {
          field: "nome",
          headerName: "Nome",
          sortable: true,
        },
        {
          field: "telefone",
          headerName: "Telefone",
          renderCell: (params: any) => telefoneMascara(params?.telefone),
        },
        {
          field: "cpf",
          headerName: "CPF/CNPJ",
          renderCell: (params: any) =>
            params?.cpf ? cpfMascara(params.cpf) : cnpjMascara(params?.cnpj),
        },
        {
          field: "senha",
          headerName: "Atualizar senha",
          renderCell: (params: any) => {
            return (
              <IconButtonAppComTooltip
                onClick={() =>
                  navigate(`/vendas/cliente/atualizar-senha-adm/${params.id}`)
                }
                icon="material-symbols-light:refresh-rounded"
                titulo={"Atualizar senha do e-commerce"}
              />
            );
          },
        },
      ]}
      url={rotasApi.cliente.paginacao}
      urlAdd={rotasApp.cliente.create}
      urlView={rotasApp.cliente.view}
    />
  );
}
