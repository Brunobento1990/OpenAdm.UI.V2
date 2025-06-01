"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiEstoque } from "@/api/UseApiEstoque";
import { BoxApp } from "@/components/box/BoxApp";
import { FormRoot } from "@/components/form/FormRoot";
import { InputApp } from "@/components/input/InputApp";
import { TextApp } from "@/components/text/TextApp";
import { rotasApp } from "@/configs/RotasApp";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { IPosicaoEstoqueUpdate } from "@/interfaces/PosicaoEstoqueUpdate";
import { useEffect } from "react";

export function PosicaoEstoqueForm() {
  const { update, obter } = useApiEstoque();
  const { navigate, params } = useNavigateApp();

  const form = useFormikAdapter<IPosicaoEstoqueUpdate>({
    initialValues: {
      quantidade: 0,
      produtoId: "",
    },
    validationSchema: new YupAdapter()
      .string("produtoId")
      .number("quantidade")
      .build(),
    onSubmit: submit,
  });

  async function submit() {
    const response = await update.fetch(form.values);
    if (response) {
      navigate(rotasApp.posicaoEstoque.paginacao);
    }
  }

  async function init() {
    const response = await obter.fetch(params?.id as string);
    if (response) {
      form.setValue(response);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <FormRoot.Form
      titulo="Atualizar estoque"
      submit={form.onSubmit}
      urlVoltar={rotasApp.posicaoEstoque.paginacao}
      loading={update.status === "loading" || obter.status === "loading"}
    >
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <BoxApp display="flex" alignItems="center" gap="1rem">
            <TextApp titulo={"Produto:"} fontWeight={600} />
            <TextApp titulo={form.values.produto} />
          </BoxApp>
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
      </FormRoot.FormRow>
    </FormRoot.Form>
  );
}
