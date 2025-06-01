import { IBase } from "./Base";

export interface ILojasParceiras extends IBase {
  nome: string;
  foto?: string;
  novaFoto?: string;
  instagram?: string;
  facebook?: string;
  endereco?: string;
  contato?: string;
}
