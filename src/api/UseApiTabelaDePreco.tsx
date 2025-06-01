import { useApi } from "@/hooks/UseApi";
import { ITabelaDePreco } from "@/interfaces/TabelaDePreco";

export function useApiTabelaDePreco() {
  const apiTabelaAtiva = useApi({
    method: "GET",
    url: "tabelas-de-precos/get-tabela-by-produtoId?produtoId=",
  });

  async function obterTabelaDePrecoAtivaPorProdutoId(
    produtoId?: string
  ): Promise<ITabelaDePreco | undefined> {
    return await apiTabelaAtiva.action({ urlParams: produtoId ?? "" });
  }
  return {
    obterTabelaDePrecoAtivaPorProdutoId: {
      fetch: obterTabelaDePrecoAtivaPorProdutoId,
    },
  };
}
