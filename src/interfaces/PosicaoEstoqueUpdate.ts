import { IProduto } from "./Produto";

export interface IPosicaoEstoqueUpdate {
  produtoId: string;
  produto: string;
  quantidade: number;
}
