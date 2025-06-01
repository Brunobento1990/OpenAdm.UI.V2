import { IBase } from "./Base";

export interface ICategoria extends IBase {
  descricao: string;
  inativoEcommerce: boolean;
  foto?: string;
  novaFoto?: string;
}
