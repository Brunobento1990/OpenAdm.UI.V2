import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IConfiguracaoDePedido } from "@/interfaces/ConfiguracaoDePedido";

export function useApiConfiguracaoPedido() {
  const apiUpdate = useApi({
    method: "PUT",
    url: rotasApi.configuracaoPedido.create,
  });

  const apiObter = useApi({
    method: "GET",
    url: rotasApi.configuracaoPedido.obter,
    naoRenderizarErro: true,
  });

  async function update(
    body: Partial<IConfiguracaoDePedido>
  ): Promise<IConfiguracaoDePedido | undefined> {
    return await apiUpdate.action({
      body,
      message: "Configuração atualizada com sucesso",
    });
  }

  async function obter(): Promise<IConfiguracaoDePedido | undefined> {
    return await apiObter.action();
  }

  return {
    obter: {
      fetch: obter,
      status: apiObter.statusRequisicao,
    },
    update: {
      fetch: update,
      status: apiUpdate.statusRequisicao,
    },
  };
}
