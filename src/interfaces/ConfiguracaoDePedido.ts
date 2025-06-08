import { IBase } from "./Base";

export interface IConfiguracaoDePedido extends IBase {
  emailDeEnvio: string;
  ativo: boolean;
  pedidoMinimoAtacado?: number;
  pedidoMinimoVarejo?: number;
}
