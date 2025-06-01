export const rotasApi = {
  login: "/login/funcionario",
  banner: {
    paginacao: "banners/paginacao",
    delete: "banners/delete",
  },
  lojasParceiras: {
    paginacao: "lojas-parceiras/paginacao",
    delete: "lojas-parceiras/delete",
    create: "lojas-parceiras/create",
    update: "lojas-parceiras/update",
    obter: "lojas-parceiras/get-loja",
  },
  categoria: {
    paginacao: "categorias/paginacao",
    delete: "categorias/delete",
    create: "categorias/create",
    update: "categorias/update",
    obter: "categorias/get-categoria",
  },
  cliente: {
    paginacao: "usuarios/paginacao",
    create: "usuarios/create-admin",
    atualizarSenha: "usuario/atualizar-senha-adm",
    obter: "usuarios/get-conta-adm?id=",
  },
  peso: {
    paginacao: "pesos/paginacao",
    delete: "pesos/delete",
    create: "pesos/create",
    update: "pesos/update",
    obter: "pesos/get-peso",
  },
  tamanho: {
    paginacao: "tamanhos/paginacao",
    delete: "tamanhos/delete",
    create: "tamanhos/create",
    update: "tamanhos/update",
    obter: "tamanhos/get-tamanho",
  },
  produto: {
    paginacao: "produtos/paginacao",
    delete: "produtos/delete",
    create: "produtos/create",
    update: "produtos/update",
    obter: "produtos/get-produto",
  },
  movimentoProduto: {
    paginacao: "movimentacao-de-produto/paginacao",
    movimentar: "estoques/movimentar-estoque",
  },
  posicaoEstoque: {
    paginacao: "estoques/paginacao",
    update: "estoques/update",
    obter: "estoques/get-estoque?id=",
  },
  pedido: {
    paginacao: "pedidos/paginacao",
  },
  parceiro: {
    obter: "parceiro/obter",
    editar: "parceiro/editar",
    excluirTelefone: "parceiro/telefone",
    excluirRedeSocial: "parceiro/rede-social",
  },
  tabelaDePreco: {
    paginacao: "tabelas-de-precos/paginacao",
    create: "tabelas-de-precos/create-admin",
    obter: "tabelas-de-precos/get-conta-adm?id=",
  },
};
