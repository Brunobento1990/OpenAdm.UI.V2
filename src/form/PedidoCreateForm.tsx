"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiCliente } from "@/api/UseApiCliente";
import { useAPiPedido } from "@/api/UseApiPedido";
import { useApiTabelaDePreco } from "@/api/UseApiTabelaDePreco";
import { BoxApp } from "@/components/box/BoxApp";
import { ButtonApp } from "@/components/button";
import { DividerApp } from "@/components/divider";
import { DropDownAutoFetchApp } from "@/components/dropdown";
import { DropDownAutoFetchPostApp } from "@/components/dropdown/DropDownAutoFetchPost";
import { FormRoot } from "@/components/form/FormRoot";
import { IconButtonAppComTooltip } from "@/components/icon/icon-button-tooltip";
import { IconConsultaCep } from "@/components/icon/icon-consulta-cep";
import { InputApp } from "@/components/input/InputApp";
import { LoadingAppTexto } from "@/components/loading";
import { TableApp } from "@/components/tabela-paginacao/tabela";
import { listaIcones } from "@/configs/listaIcones";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { IItemPedido, IPedido } from "@/interfaces/Pedido";
import { IPeso } from "@/interfaces/Peso";
import { ITabelaDePreco } from "@/interfaces/TabelaDePreco";
import { ITamanho } from "@/interfaces/Tamanho";
import { IUsuario } from "@/interfaces/Usuario";
import { moneyMascara } from "@/utils/mascaras/MoneyMascara";
import { removerItemDeArrayPorIndex } from "@/utils/RemoverItemDeArrayPorIndex";
import { useState } from "react";

const initialValues: Partial<IPedido> = {
  itensPedido: [],
  usuarioId: "",
};

const validationSchema = new YupAdapter().string("usuarioId").build();

export function PedidoCreateForm() {
  const [itemPedido, setItemPedido] = useState<IItemPedido>();
  const { listarItens } = useApiTabelaDePreco();
  const { criar } = useAPiPedido();
  const { get } = useApiCliente();
  const { navigate } = useNavigateApp();
  const form = useFormikAdapter<IPedido>({
    initialValues,
    validationSchema,
    onSubmit: submit,
  });

  async function selecionarTabelaDePreco(tabelaDePreco?: ITabelaDePreco) {
    if (!tabelaDePreco) {
      form.setValue({
        tabelaDePreco: undefined,
      });
      return;
    }
    const itens = await listarItens.fetch(tabelaDePreco.id);
    if (itens) {
      form.setValue({
        tabelaDePreco: {
          ...tabelaDePreco,
          itensTabelaDePreco: itens,
        },
      });
    }
  }

  async function selecionarCliente(cliente?: IUsuario) {
    if (!cliente) {
      form.setValue({
        usuario: undefined,
        usuarioId: undefined,
      });
      return;
    }
    const response = await get.fetch(cliente.id);
    if (response) {
      form.setValue({
        usuario: response,
        usuarioId: response.id,
        enderecoEntrega: response.enderecoUsuario,
      });
    }
  }

  async function selecionarPeso(peso?: IPeso) {
    const preco = form.values.tabelaDePreco?.itensTabelaDePreco?.find(
      (x) =>
        x.produtoId === itemPedido?.produtoId &&
        x.pesoId === peso?.id &&
        x.tamanhoId === itemPedido?.tamanhoId
    );
    const valorUnitario = itemPedido?.valorUnitario
      ? itemPedido.valorUnitario
      : form.values.usuario?.isAtacado
      ? preco?.valorUnitarioAtacado
      : preco?.valorUnitarioVarejo;

    setItemPedido({
      ...(itemPedido ?? {}),
      peso,
      pesoId: peso?.id,
      valorUnitario,
    } as any);
  }

  async function selecionarTamanho(tamanho?: ITamanho) {
    const preco = form.values.tabelaDePreco?.itensTabelaDePreco?.find(
      (x) =>
        x.produtoId === itemPedido?.produtoId &&
        x.pesoId === itemPedido?.id &&
        x.tamanhoId === tamanho?.id
    );
    const valorUnitario = itemPedido?.valorUnitario
      ? itemPedido.valorUnitario
      : form.values.usuario?.isAtacado
      ? preco?.valorUnitarioAtacado
      : preco?.valorUnitarioVarejo;

    setItemPedido({
      ...(itemPedido ?? {}),
      tamanho,
      tamanhoId: tamanho?.id,
      valorUnitario,
    } as any);
  }

  function setEnderecoEntrega(key: string, value: any) {
    form.setValue({
      enderecoEntrega: {
        ...(form.values.enderecoEntrega ?? {}),
        [key]: value,
      } as any,
    });
  }

  function adicionarItem() {
    if (!itemPedido) {
      return;
    }

    form.setValue({
      itensPedido: [...form.values.itensPedido, itemPedido],
    });
    setItemPedido(undefined);
  }

  async function submit() {
    const response = await criar.fetch(form.values);
    if (response) {
      navigate(rotasApp.pedido.paginacao);
    }
  }

  return (
    <FormRoot.Form
      urlVoltar={rotasApp.pedido.paginacao}
      submit={form.onSubmit}
      titulo="Pedido"
    >
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <DropDownAutoFetchPostApp
            id="usuarioId"
            keyLabel="nome"
            label="Cliente"
            url={rotasApi.cliente.paginacaoDropdown}
            error={form.error("usuarioId")}
            helperText={form.helperText("usuarioId")}
            onChange={async (_, value) => await selecionarCliente(value)}
            value={form.values.usuario}
            autoFocus
            required
          />
          {get.status === "loading" && (
            <LoadingAppTexto comBox texto="Carregando dados do cliente..." />
          )}
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <DropDownAutoFetchApp
            id="tabelaDePreco"
            keyLabel="descricao"
            label="Tabela de preço"
            url={rotasApi.tabelaDePreco.listar}
            value={form.values.tabelaDePreco}
            required
            onChange={async (_, value) => await selecionarTabelaDePreco(value)}
          />
          {listarItens.status === "loading" && (
            <LoadingAppTexto comBox texto="Carregando preços..." />
          )}
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <DividerApp width="100%" cor="primary" chip="Adicione os itens" />
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={4}>
          <DropDownAutoFetchPostApp
            id="produtoId"
            keyLabel="descricao"
            label="Produto"
            url={rotasApi.produto.paginacaoDropDown}
            value={itemPedido?.produto}
            onChange={(_, value) => {
              setItemPedido({
                ...itemPedido,
                produto: value,
                produtoId: value?.id,
              } as any);
            }}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={4}>
          <DropDownAutoFetchApp
            id="pesoId"
            keyLabel="descricao"
            label="Peso"
            url={rotasApi.peso.listar}
            value={itemPedido?.peso}
            onChange={(_, value) => {
              selecionarPeso(value);
            }}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={4}>
          <DropDownAutoFetchApp
            id="tamanhoId"
            keyLabel="descricao"
            label="Tamanho"
            url={rotasApi.tamanho.listar}
            value={itemPedido?.tamanho}
            onChange={(_, value) => {
              selecionarTamanho(value);
            }}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={4}>
          <InputApp
            label="Quantidade"
            type="number"
            value={itemPedido?.quantidade}
            id="quantidade"
            onChange={(_, value) =>
              setItemPedido({
                ...itemPedido,
                quantidade:
                  typeof value === "string" ? parseFloat(value) : value,
              } as any)
            }
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={4}>
          <InputApp
            label="Vlr unitário"
            type="number"
            value={itemPedido?.valorUnitario}
            id="valorUnitario"
            onChange={(_, value) =>
              setItemPedido({
                ...itemPedido,
                valorUnitario:
                  typeof value === "string" ? parseFloat(value) : value,
              } as any)
            }
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={4}>
          <BoxApp
            display="flex"
            alignItems="center"
            height="100%"
            justifyContent="start"
          >
            <ButtonApp
              onClick={adicionarItem}
              variant="contained"
              title="Adicionar item"
            />
          </BoxApp>
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <TableApp
        columns={[
          {
            field: "foto",
            headerName: "Foto",
            renderCell: (item: IItemPedido) => {
              return (
                <img
                  src={item.produto?.foto}
                  alt={item.produto?.descricao}
                  style={{ maxWidth: "50px" }}
                />
              );
            },
          },
          {
            field: "produto",
            headerName: "Produto",
            renderCell: (item: IItemPedido) => item.produto?.descricao,
          },
          {
            field: "pesoTamanho",
            headerName: "Peso/Tamanho",
            renderCell: (item: IItemPedido) =>
              item.tamanho ? item.tamanho.descricao : item.peso?.descricao,
          },
          {
            field: "valorUnitario",
            headerName: "Vlr un",
            renderCell: (item: IItemPedido) =>
              moneyMascara(item?.valorUnitario),
          },
          {
            field: "qtd",
            headerName: "Qtd",
            renderCell: (item: IItemPedido) => item.quantidade,
          },
          {
            field: "total",
            headerName: "Total",
            renderCell: (item: IItemPedido) =>
              moneyMascara((item?.valorUnitario ?? 0) * (item.quantidade ?? 0)),
          },
          {
            field: "excluir",
            headerName: "Excluir",
            renderCell: (_: IItemPedido, i: number) => (
              <IconButtonAppComTooltip
                icon={listaIcones.lixeira}
                titulo=""
                onClick={() =>
                  form.setValue({
                    itensPedido: removerItemDeArrayPorIndex(
                      i,
                      form.values.itensPedido
                    ),
                  })
                }
                cor="red"
              />
            ),
          },
        ]}
        rows={form.values.itensPedido}
      />
      <DividerApp
        chip="Endereço de entraga"
        marginTop="1rem"
        width="100%"
        cor="primary"
      />
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow sm={3} xs={12}>
          <BoxApp display="flex" alignItems="center">
            <InputApp
              label="CEP"
              id="cep"
              onChange={setEnderecoEntrega}
              value={form.values.enderecoEntrega?.cep}
              maxLength={8}
            />
            <IconConsultaCep
              setEndereco={(endereco) =>
                form.setValue({
                  enderecoEntrega: endereco,
                })
              }
              cep={form.values.enderecoEntrega?.cep}
            />
          </BoxApp>
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputApp
            label="Rua"
            id="logradouro"
            onChange={setEnderecoEntrega}
            value={form.values.enderecoEntrega?.logradouro}
            maxLength={255}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow sm={3} xs={12}>
          <InputApp
            label="N°"
            id="numero"
            onChange={setEnderecoEntrega}
            value={form.values.enderecoEntrega?.numero}
            maxLength={10}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputApp
            label="Cidade"
            id="localidade"
            onChange={setEnderecoEntrega}
            value={form.values.enderecoEntrega?.localidade}
            maxLength={255}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow sm={3} xs={12}>
          <InputApp
            label="Bairro"
            id="bairro"
            onChange={setEnderecoEntrega}
            value={form.values.enderecoEntrega?.bairro}
            maxLength={255}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow sm={3} xs={12}>
          <InputApp
            label="UF"
            id="uf"
            onChange={setEnderecoEntrega}
            value={form.values.enderecoEntrega?.uf}
            maxLength={2}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow sm={12} xs={12}>
          <InputApp
            label="Complemento"
            id="complemento"
            onChange={setEnderecoEntrega}
            value={form.values.enderecoEntrega?.complemento}
            maxLength={255}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
    </FormRoot.Form>
  );
}
