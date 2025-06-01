import { IBase } from "./Base";

export interface IPeso extends IBase {
  descricao: string;
  pesoReal?: number;
}
