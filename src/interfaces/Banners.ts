import { IBase } from "./Base";

export interface IBanner extends IBase {
  foto: string;
  ativo: boolean;
  novaFoto?: string;
}
