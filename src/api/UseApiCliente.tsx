import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { IAtualizarSenhaUsuarioAdm } from "@/interfaces/AtualizarSenhaUsuarioAdm";
import { ICliente } from "@/interfaces/Cliente";

export function useApiCliente() {
  const apiCreate = useApi({
    method: "POST",
    url: rotasApi.cliente.create,
  });

  const apiAtualizarSenha = useApi({
    method: "POST",
    url: rotasApi.cliente.atualizarSenha,
  });

  const apiGet = useApi({
    method: "GET",
    url: rotasApi.cliente.obter,
  });

  async function create(
    body: Partial<ICliente>
  ): Promise<ICliente | undefined> {
    return await apiCreate.action({
      body,
    });
  }

  async function get(id: string): Promise<ICliente | undefined> {
    return await apiGet.action<ICliente>({
      urlParams: id,
    });
  }

  async function atualizarSenha(body: IAtualizarSenhaUsuarioAdm): Promise<any> {
    return await apiAtualizarSenha.action({
      body,
      message: "Senha atualizada com sucesso",
    });
  }

  return {
    create: {
      fecth: create,
      status: apiCreate.statusRequisicao,
    },
    get: {
      fetch: get,
      status: apiGet.statusRequisicao,
    },
    atualizarSenha: {
      fetch: atualizarSenha,
      status: apiAtualizarSenha.statusRequisicao,
    },
  };
}
