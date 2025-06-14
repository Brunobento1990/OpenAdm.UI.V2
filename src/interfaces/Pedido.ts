import { StatusPedidoEnum } from "@/enums/StatusPedidoEnum";
import { IBase, IEnderecoBase } from "./Base";
import { IPeso } from "./Peso";
import { IProduto } from "./Produto";
import { ITamanho } from "./Tamanho";
import { ITabelaDePreco } from "./TabelaDePreco";
import { ICliente } from "./Cliente";

export interface IPedido extends IBase {
  statusPedido: StatusPedidoEnum;
  valorTotal: number;
  totalItens: number;
  usuario: ICliente;
  usuarioId: string;
  totalAReceber?: number;
  tabelaDePreco?: ITabelaDePreco;
  itensPedido: IItemPedido[];
  enderecoEntrega?: IEnderecoBase;
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
