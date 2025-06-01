import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IMovimentoProduto } from "@/interfaces/MovimentoProduto";
import { IPosicaoEstoqueUpdate } from "@/interfaces/PosicaoEstoqueUpdate";

export function useApiEstoque() {
  const apiMovimentarProduto = useApi({
    method: "PUT",
    url: rotasApi.movimentoProduto.movimentar,
  });

  const apiObter = useApi({
    method: "GET",
    url: rotasApi.posicaoEstoque.obter,
  });

  const apiAtualizarEstoque = useApi({
    method: "PUT",
    url: rotasApi.posicaoEstoque.update,
  });

  async function movimentar(body: Partial<IMovimentoProduto>): Promise<any> {
    return await apiMovimentarProduto.action({
      body,
      message: "Movimentação concluida",
    });
  }

  async function update(body: Partial<IPosicaoEstoqueUpdate>): Promise<any> {
    return await apiAtualizarEstoque.action({
      body,
      message: "Movimentação concluida",
    });
  }

  async function obter(id: string): Promise<any> {
    return await apiObter.action({ urlParams: id });
  }

  return {
    movimentar: {
      fetch: movimentar,
      status: apiMovimentarProduto.statusRequisicao,
    },
    update: {
      fetch: update,
      status: apiAtualizarEstoque.statusRequisicao,
    },
    obter: {
      fetch: obter,
      status: apiObter.statusRequisicao,
    },
  };
}
