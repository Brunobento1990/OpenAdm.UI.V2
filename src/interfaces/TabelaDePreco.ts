import { IBase } from "./Base";
import { IPeso } from "./Peso";
import { IProduto } from "./Produto";
import { ITamanho } from "./Tamanho";

export interface ITabelaDePreco extends IBase {
  descricao: string;
  ativaEcommerce: boolean;
  itensTabelaDePreco?: IItemTabelaDePreco[];
}

export interface IItemTabelaDePreco extends IBase {
  valorUnitarioAtacado: number;
  valorUnitarioVarejo: number;
  tabelaDePrecoId: string;
  tabelaDePreco: ITabelaDePreco;
  tamanhoId?: string;
  tamanho?: ITamanho;
  pesoId?: string;
  peso?: IPeso;
  produtoId: string;
  produto: IProduto;
}
