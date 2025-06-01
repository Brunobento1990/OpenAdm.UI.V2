"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiEstoque } from "@/api/UseApiEstoque";
import { DropDownAutoFetchApp } from "@/components/dropdown";
import { DropDownApp } from "@/components/dropdown/DropDownApp";
import { FormRoot } from "@/components/form/FormRoot";
import { InputApp } from "@/components/input/InputApp";
import { rotasApp } from "@/configs/RotasApp";
import { tiposMovimentacaoOpcoes } from "@/enums/TipoMovimentacaoProduto";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { IMovimentoProduto } from "@/interfaces/MovimentoProduto";

export function MovimentoProdutoForm() {
  const { movimentar } = useApiEstoque();
  const { navigate } = useNavigateApp();
  const form = useFormikAdapter<IMovimentoProduto>({
    initialValues: {
      quantidade: 0,
      produtoId: "",
      tipoMovimentacaoDeProduto: 0,
    },
    validationSchema: new YupAdapter()
      .string("produtoId")
      .number("quantidade")
      .number("tipoMovimentacaoDeProduto")
      .build(),
    onSubmit: submit,
  });

  async function submit() {
    const response = await movimentar.fetch({
      ...form.values,
      tipoMovimentacaoDeProduto: form.values.tipoMovimentacaoDeProduto - 1,
    });
    if (response) {
      navigate(rotasApp.movimentoProduto.paginacao);
    }
  }

  return (
    <FormRoot.Form
      titulo="Movimentar estoque"
      submit={form.onSubmit}
      urlVoltar={rotasApp.movimentoProduto.paginacao}
      loading={movimentar.status === "loading"}
    >
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <DropDownAutoFetchApp
            keyLabel="descricao"
            id="produtoId"
            label="Produto"
            url="produtos/all-list"
            value={form.values.produto}
            autoFocus
            error={form.error("produtoId")}
            helperText={form.helperText("produtoId")}
            required
            onChange={(_, produto) =>
              form.setValue({ produto, produtoId: produto?.id })
            }
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={3}>
          <DropDownApp
            id="tipoMovimentacaoDeProduto"
            keyLabel="descricao"
            label="Tipo de movimentação"
            values={tiposMovimentacaoOpcoes}
            error={form.error("tipoMovimentacaoDeProduto")}
            helperText={form.helperText("tipoMovimentacaoDeProduto")}
            onChange={form.onChange}
            required
            onBlur={form.onBlur}
            value={tiposMovimentacaoOpcoes.find(
              (x) => x.id === form.values.tipoMovimentacaoDeProduto
            )}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={3}>
          <InputApp
            label="Quantidade"
            type="number"
            id="quantidade"
            error={form.error("quantidade")}
            helperText={form.helperText("quantidade")}
            value={form.values.quantidade}
            onChange={form.onChange}
            onBlur={form.onBlur}
            required
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormRow spacing={3}>
          <FormRoot.FormItemRow xs={12} sm={12}>
            <InputApp
              id="observacao"
              label="Observação"
              onChange={form.onChange}
              value={form.values.observacao}
              maxLength={255}
            />
          </FormRoot.FormItemRow>
        </FormRoot.FormRow>
      </FormRoot.FormRow>
    </FormRoot.Form>
  );
}
