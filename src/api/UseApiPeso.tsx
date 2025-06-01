import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IPeso } from "@/interfaces/Peso";

export function useApiPeso() {
  const apiGet = useApi({
    method: "GET",
    url: rotasApi.peso.obter,
  });

  const apiCreate = useApi({
    method: "POST",
    url: rotasApi.peso.create,
  });

  const apiUpdate = useApi({
    method: "PUT",
    url: rotasApi.peso.update,
  });

  async function obter(id: string): Promise<IPeso | undefined> {
    return await apiGet.action({ urlParams: `?id=${id}` });
  }

  async function create(body: Partial<IPeso>): Promise<IPeso | undefined> {
    return await apiCreate.action({ body });
  }

  async function update(body: Partial<IPeso>): Promise<IPeso | undefined> {
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
