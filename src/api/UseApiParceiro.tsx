import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IParceiro } from "@/interfaces/Parceiro";

export function useApiParceiro() {
  const apiObter = useApi({
    method: "GET",
    url: rotasApi.parceiro.obter,
  });

  const apiEditar = useApi({
    method: "PUT",
    url: rotasApi.parceiro.editar,
  });

  const apiDeleteRedeSocial = useApi({
    method: "DELETE",
    url: rotasApi.parceiro.excluirRedeSocial,
  });

  const apiDeleteTelefone = useApi({
    method: "DELETE",
    url: rotasApi.parceiro.excluirTelefone,
  });

  async function obter(): Promise<IParceiro | undefined> {
    return await apiObter.action();
  }

  async function editar(
    body: Partial<IParceiro>
  ): Promise<IParceiro | undefined> {
    return await apiEditar.action({ body });
  }

  async function excluirRedeSocial(redeSocialId: string): Promise<any> {
    return await apiDeleteRedeSocial.action({
      urlParams: `?redeSocialId=${redeSocialId}`,
    });
  }

  async function excluirTelefone(telefoneId: string): Promise<any> {
    return await apiDeleteRedeSocial.action({
      urlParams: `?telefoneId=${telefoneId}`,
    });
  }

  return {
    obter: {
      fetch: obter,
      status: apiObter.statusRequisicao,
    },
    editar: {
      fetch: editar,
      status: apiEditar.statusRequisicao,
    },
    excluirRedeSocial: {
      fetch: excluirRedeSocial,
      status: apiDeleteRedeSocial.statusRequisicao,
    },
    excluirTelefone: {
      fetch: excluirTelefone,
      status: apiDeleteTelefone.statusRequisicao,
    },
  };
}
