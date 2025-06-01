import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IPeso } from "@/interfaces/Peso";
import { ITamanho } from "@/interfaces/Tamanho";

export function useApiTamanho() {
  const apiGet = useApi({
    method: "GET",
    url: rotasApi.tamanho.obter,
  });

  const apiCreate = useApi({
    method: "POST",
    url: rotasApi.tamanho.create,
  });

  const apiUpdate = useApi({
    method: "PUT",
    url: rotasApi.tamanho.update,
  });

  async function obter(id: string): Promise<ITamanho | undefined> {
    return await apiGet.action({ urlParams: `?id=${id}` });
  }

  async function create(
    body: Partial<ITamanho>
  ): Promise<ITamanho | undefined> {
    return await apiCreate.action({ body });
  }

  async function update(
    body: Partial<ITamanho>
  ): Promise<ITamanho | undefined> {
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
