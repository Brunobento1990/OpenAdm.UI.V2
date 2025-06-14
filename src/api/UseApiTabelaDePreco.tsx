import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IItemTabelaDePreco, ITabelaDePreco } from "@/interfaces/TabelaDePreco";

export function useApiTabelaDePreco() {
  const apiTabelaAtiva = useApi({
    method: "GET",
    url: "tabelas-de-precos/get-tabela-by-produtoId?produtoId=",
  });

  const apiCreate = useApi({
    method: "POST",
    url: rotasApi.tabelaDePreco.create,
  });

  const apiListarItens = useApi({
    method: "GET",
    url: rotasApi.tabelaDePreco.listarItens,
  });

  const apiUpdate = useApi({
    method: "PUT",
    url: rotasApi.tabelaDePreco.editar,
  });

  const apiObter = useApi({
    method: "GET",
    url: rotasApi.tabelaDePreco.obter,
  });

  async function obterTabelaDePrecoAtivaPorProdutoId(
    produtoId?: string
  ): Promise<ITabelaDePreco | undefined> {
    return await apiTabelaAtiva.action({ urlParams: produtoId ?? "" });
  }

  async function criar(
    body: Partial<ITabelaDePreco>
  ): Promise<ITabelaDePreco | undefined> {
    return await apiCreate.action({ body });
  }

  async function editar(
    body: Partial<ITabelaDePreco>
  ): Promise<ITabelaDePreco | undefined> {
    return await apiUpdate.action({ body });
  }

  async function obter(id: string): Promise<ITabelaDePreco | undefined> {
    return await apiObter.action({ urlParams: `?id=${id}` });
  }

  async function listarItens(
    tabelaDePrecoId: string
  ): Promise<IItemTabelaDePreco[] | undefined> {
    return await apiListarItens.action({
      urlParams: `?tabelaDePrecoId=${tabelaDePrecoId}`,
    });
  }

  return {
    obterTabelaDePrecoAtivaPorProdutoId: {
      fetch: obterTabelaDePrecoAtivaPorProdutoId,
    },
    criar: {
      fetch: criar,
      status: apiCreate.statusRequisicao,
    },
    editar: {
      fetch: editar,
      status: apiUpdate.statusRequisicao,
    },
    obter: {
      fetch: obter,
      status: apiObter.statusRequisicao,
    },
    listarItens: {
      fetch: listarItens,
      status: apiListarItens.statusRequisicao,
    },
  };
}
