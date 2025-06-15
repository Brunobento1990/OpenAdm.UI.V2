import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IProduto } from "@/interfaces/Produto";

export function useApiProduto() {
  const apiGet = useApi({
    method: "GET",
    url: rotasApi.produto.obter,
  });

  const apiCreate = useApi({
    method: "POST",
    url: rotasApi.produto.create,
  });

  const apiUpdate = useApi({
    method: "PUT",
    url: rotasApi.produto.update,
  });

  const apiInativar = useApi({
    method: "PUT",
    url: rotasApi.produto.inativar,
  });

  async function obter(id: string): Promise<IProduto | undefined> {
    return await apiGet.action({ urlParams: `?id=${id}` });
  }

  async function create(
    body: Partial<IProduto>
  ): Promise<IProduto | undefined> {
    return await apiCreate.action({ body });
  }

  async function update(
    body: Partial<IProduto>
  ): Promise<IProduto | undefined> {
    return await apiUpdate.action({ body });
  }

  async function inativar(id: string): Promise<any> {
    return await apiInativar.action({
      urlParams: id,
      message: "Produto inativado com sucesso",
    });
  }

  return {
    obter: {
      fetch: obter,
      status: apiGet.statusRequisicao,
    },
    create: {
      fetch: create,
      status: apiCreate.statusRequisicao,
    },
    update: {
      fetch: update,
      status: apiUpdate.statusRequisicao,
    },
    inativar: {
      fetch: inativar,
      status: apiInativar.statusRequisicao,
    },
  };
}
