import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { ILojasParceiras } from "@/interfaces/LojasParceiras";

export function useApiLojasParceiras() {
  const apiCreate = useApi({
    method: "POST",
    url: rotasApi.lojasParceiras.create,
  });

  const apiUpdate = useApi({
    method: "PUT",
    url: rotasApi.lojasParceiras.update,
  });

  const apiGet = useApi({
    method: "GET",
    url: rotasApi.lojasParceiras.obter,
  });

  async function obter(id: string): Promise<ILojasParceiras | undefined> {
    return await apiGet.action({ urlParams: `?id=${id}` });
  }

  async function create(
    body: Partial<ILojasParceiras>
  ): Promise<ILojasParceiras | undefined> {
    return await apiCreate.action({ body });
  }

  async function update(
    body: Partial<ILojasParceiras>
  ): Promise<ILojasParceiras | undefined> {
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
