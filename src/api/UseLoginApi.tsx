import { rotasApi } from "@/configs/RotasApi";
import { useApi } from "@/hooks/UseApi";
import { ILogin } from "@/interfaces/Login";
import { ILoginResponse } from "@/interfaces/LoginResponse";

export function useLoginApi() {
  const api = useApi({
    method: "POST",
    url: rotasApi.login,
    naoRenderizarResposta: true,
  });

  async function login(body: ILogin): Promise<ILoginResponse | undefined> {
    return await api.action({ body });
  }

  return {
    login: {
      fetch: login,
      status: api.statusRequisicao,
    },
  };
}
