import { StatusPedidoEnum } from "@/enums/StatusPedidoEnum";
import { IBase } from "./Base";
import { IPeso } from "./Peso";
import { IProduto } from "./Produto";
import { ITamanho } from "./Tamanho";

export interface IPedido extends IBase {
  statusPedido: StatusPedidoEnum;
  valorTotal: number;
  totalItens: number;
  usuario: string;
  totalAReceber?: number;
  itensPedido: IItemPedido[];
}

export interface IItemPedido extends IBase {
  pesoId?: string;
  peso?: IPeso;
  tamanhoId?: string;
  tamanho?: ITamanho;
  produtoId: string;
  produto: IProduto;
  pedidoId: string;
  valorUnitario: number;
  quantidade: number;
  valorTotal: number;
}
