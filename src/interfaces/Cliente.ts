import { IBase, IEnderecoBase } from "./Base";

export interface ICliente extends IBase {
  email: string;
  nome: string;
  telefone?: string;
  cnpj?: string;
  cpf?: string;
  avatar?: string;
  quantidadeDePedido?: number;
  isAtacado?: boolean;
  senha: string;
  reSenha: string;
  enderecoUsuario?: IEnderecoBase;
}
