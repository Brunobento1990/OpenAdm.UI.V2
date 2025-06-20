import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IPedido } from "@/interfaces/Pedido";

export function useAPiPedido() {
  const apiDownLoadPdf = useApi({
    method: "GET",
    url: rotasApi.pedido.downloadPedido,
  });

  const apiObter = useApi({
    method: "GET",
    url: rotasApi.pedido.obter,
  });

  const apiCriar = useApi({
    method: "POST",
    url: rotasApi.pedido.criar,
  });

  const apiAtualizarStatus = useApi({
    method: "PUT",
    url: rotasApi.pedido.atualizaStatus,
  });

  async function downloadPedido(id: string): Promise<any> {
    return await apiDownLoadPdf.action({
      urlParams: `?pedidoId=${id}`,
    });
  }

  async function obter(id: string): Promise<IPedido | undefined> {
    return await apiObter.action({ urlParams: `?pedidoId=${id}` });
  }

  async function criar(body: Partial<IPedido>): Promise<IPedido | undefined> {
    return await apiCriar.action({
      body,
      message: "Pedido criado com sucesso",
    });
  }

  async function atualizarStatus(body: any): Promise<any> {
    return await apiAtualizarStatus.action({
      body,
      message: "Status atualizado com sucesso",
    });
  }

  return {
    downloadPedido: {
      fetch: downloadPedido,
      status: apiDownLoadPdf.statusRequisicao,
    },
    obter: {
      fetch: obter,
      status: apiObter.statusRequisicao,
    },
    atualizarStatus: {
      fetch: atualizarStatus,
      status: apiAtualizarStatus.statusRequisicao,
    },
    criar: {
      fetch: criar,
      status: apiCriar.statusRequisicao,
    },
  };
}
