import { useApi } from "@/hooks/UseApi";
import { IEnderecoBase } from "@/interfaces/Base";

export function useApiCep() {
  const api = useApi({
    method: "GET",
    url: "cep/consultar?cep=",
  });

  async function consultar(cep: string): Promise<IEnderecoBase | undefined> {
    return await api.action({
      urlParams: cep,
    });
  }

  return {
    consulta: {
      fetch: consultar,
      status: api.statusRequisicao,
    },
  };
}
