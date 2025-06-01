import { IBase } from "./Base";
import { ICategoria } from "./Categoria";
import { IPeso } from "./Peso";
import { ITamanho } from "./Tamanho";

export interface IProduto extends IBase {
  descricao: string;
  especificacaoTecnica?: string;
  foto: string;
  novaFoto?: string;
  tamanhos: ITamanho[];
  pesos: IPeso[];
  categoriaId: string;
  categoria: ICategoria;
  referencia?: string;
  peso?: number;
  inativoEcommerce: boolean;
}
