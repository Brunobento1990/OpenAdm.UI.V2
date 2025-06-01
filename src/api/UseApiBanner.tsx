import { useApi } from "@/hooks/UseApi";
import { IBanner } from "@/interfaces/Banners";

export function useApiBanner() {
  const apiGet = useApi({
    method: "GET",
    url: "/banners/get-banner?id=",
  });

  const apiCreate = useApi({
    method: "POST",
    url: "/banners/create",
  });

  const apiUpdate = useApi({
    method: "PUT",
    url: "/banners/update",
  });

  async function obter(id: string): Promise<IBanner | undefined> {
    return await apiGet.action({ urlParams: id });
  }

  async function create(body: Partial<IBanner>): Promise<IBanner | undefined> {
    return await apiCreate.action({ body });
  }

  async function update(body: Partial<IBanner>): Promise<IBanner | undefined> {
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
