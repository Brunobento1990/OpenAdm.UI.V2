import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IConfiguracaoDeEmail } from "@/interfaces/EmailConfiguracao";

export function useApiConfiguracaoEmail() {
  const createApi = useApi({
    method: "POST",
    url: rotasApi.configuracaoEmail.create,
  });

  const apiObter = useApi({
    method: "GET",
    url: rotasApi.configuracaoEmail.obter,
    naoRenderizarErro: true,
  });

  async function obter(): Promise<IConfiguracaoDeEmail | undefined> {
    return await apiObter.action();
  }

  async function criar(
    body: Partial<IConfiguracaoDeEmail>
  ): Promise<IConfiguracaoDeEmail | undefined> {
    return await createApi.action({
      body,
      message: "Configuração atualizada com sucesso",
    });
  }

  return {
    obter: {
      fetch: obter,
      status: apiObter.statusRequisicao,
    },
    create: {
      fetch: criar,
      status: createApi.statusRequisicao,
    },
  };
}
