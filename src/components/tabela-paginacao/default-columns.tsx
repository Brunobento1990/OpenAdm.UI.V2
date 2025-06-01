import { listaIcones } from "@/configs/listaIcones";
import { useApi } from "@/hooks/UseApi";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { IconButtonAppComTooltip } from "../icon/icon-button-tooltip";
import { useModal } from "../modal";

interface propsDefaultColumns {
  urlDelete?: string;
  urlEdit?: string;
  urlView?: string;
  reload?: () => Promise<any>;
}

export function DefaultColuns(props: propsDefaultColumns) {
  const { navigate } = useNavigateApp();
  const modal = useModal();
  const { action } = useApi({
    method: "DELETE",
    url: props.urlDelete ?? "",
  });

  async function excluir(arg: any) {
    modal.show({
      confirmarPromise: async () => {
        await action<any>({
          urlParams: `?id=${arg?.id}`,
          message: `Registro excluido com sucesso!`,
        });
        modal.close();
        if (props.reload) {
          await props.reload();
        }
      },
      mensagem: `Deseja realmente excluir o registro?`,
    });
  }

  function renderColunaVisualizar(params: any) {
    if (!props.urlView) {
      return null;
    }

    return (
      <IconButtonAppComTooltip
        titulo="Visualizar"
        onClick={() => navigate(`${props.urlView}/${params.id}`)}
        icon={listaIcones.visualizar}
      />
    );
  }

  function renderColunaEditar(params: any) {
    if (!props.urlEdit) {
      return null;
    }
    return (
      <IconButtonAppComTooltip
        titulo="Editar"
        onClick={() => navigate(`${props.urlEdit}/${params.id}`)}
        icon={listaIcones.editar}
      />
    );
  }

  function renderColunarInativar(params: any) {
    if (!props.urlDelete) {
      return null;
    }

    return (
      <IconButtonAppComTooltip
        titulo={params?.ativo ? "Inativar" : "Ativar"}
        onClick={() => excluir(params)}
        icon={listaIcones.lixeira}
      />
    );
  }

  function handleColuns(params: any) {
    return (
      <>
        {renderColunaVisualizar(params)}
        {renderColunaEditar(params)}
        {renderColunarInativar(params)}
      </>
    );
  }

  const defaultColumns: any = {
    field: "actions",
    headerName: "Ações",
    align: "center",
    minWidth: 150,
    headerAlign: "center",
    renderCell: (params: any) => {
      return handleColuns(params);
    },
    sortable: false,
    flex: 0.2,
  };

  return defaultColumns;
}
