import { useApi } from "@/hooks/UseApi";
import { IHome } from "@/interfaces/Home";

export function useHomeApi() {
  const api = useApi({
    method: "GET",
    url: "/home/adm",
    naoRenderizarErro: true,
    statusInicial: "loading",
  });

  async function obterHome(): Promise<IHome | undefined> {
    return await api.action();
  }

  return {
    obterHome: {
      fetch: obterHome,
      status: api.statusRequisicao,
    },
  };
}
