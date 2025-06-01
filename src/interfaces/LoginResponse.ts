import { IUsuario } from "./Usuario";

export interface ILoginResponse {
  usuario: IUsuario;
  token: string;
  refreshToken: string;
}
