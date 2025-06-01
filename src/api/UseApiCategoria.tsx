import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { ICategoria } from "@/interfaces/Categoria";

export function useApiCategoria() {
  const apiGet = useApi({
    method: "GET",
    url: rotasApi.categoria.obter,
  });

  const apiCreate = useApi({
    method: "POST",
    url: rotasApi.categoria.create,
  });

  const apiUpdate = useApi({
    method: "PUT",
    url: rotasApi.categoria.update,
  });

  async function obter(id: string): Promise<ICategoria | undefined> {
    return await apiGet.action({ urlParams: `?id=${id}` });
  }

  async function create(
    body: Partial<ICategoria>
  ): Promise<ICategoria | undefined> {
    return await apiCreate.action({ body });
  }

  async function update(
    body: Partial<ICategoria>
  ): Promise<ICategoria | undefined> {
    return await apiUpdate.action({ body });
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
  };
}
