import { RedeSocialEnum } from "@/enums/RedeSocialEnum";
import { IBase } from "./Base";

export interface IParceiro extends IBase {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  logo?: string;
  telefones: ITelefoneParceiro[];
  redesSociais: IRedeSocial[];
}

export interface ITelefoneParceiro {
  id: string;
  telefone: string;
}

export interface IRedeSocial extends IBase {
  link: string;
  redeSocialEnum: RedeSocialEnum;
}
