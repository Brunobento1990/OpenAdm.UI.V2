import { IBase } from "./Base";

export interface IConfiguracaoDeEmail extends IBase {
  email: string;
  servidor: string;
  senha: string;
  porta: number;
  ativo: boolean;
}
