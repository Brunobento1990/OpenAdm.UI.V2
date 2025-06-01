import { IPeso } from "./Peso";
import { IProduto } from "./Produto";
import { ITamanho } from "./Tamanho";

export interface IMovimentoProduto {
  produtoId: string;
  produto: IProduto;
  tamanhoId?: string;
  tamanho?: ITamanho;
  pesoId?: string;
  peso?: IPeso;
  quantidade: number;
  observacao?: string;
  tipoMovimentacaoDeProduto: number;
}
