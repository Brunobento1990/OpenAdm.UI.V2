"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiTabelaDePreco } from "@/api/UseApiTabelaDePreco";
import { CheckBoxApp } from "@/components/checkbox/inedx";
import { FormRoot } from "@/components/form/FormRoot";
import { InputApp } from "@/components/input/InputApp";
import { rotasApp } from "@/configs/RotasApp";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { IFormTypes } from "@/interfaces/Form";
import { ITabelaDePreco } from "@/interfaces/TabelaDePreco";
import { useEffect } from "react";

export function TabelaDePrecoForm(props: IFormTypes) {
  const { criar, editar, obter } = useApiTabelaDePreco();
  const { navigate, params } = useNavigateApp();

  const form = useFormikAdapter<ITabelaDePreco>({
    initialValues: {
      descricao: "",
      ativaEcommerce: false,
    },
    validationSchema: new YupAdapter().string("descricao").build(),
    onSubmit: submit,
  });

  async function submit() {
    const response =
      props.action === "create"
        ? await criar.fetch(form.values)
        : await editar.fetch(form.values);
    if (response) {
      navigate(rotasApp.tabelaDePreco.paginacao);
    }
  }

  async function init() {
    if (props.action === "create") {
      return;
    }
    const response = await obter.fetch(params.id as string);
    if (response) {
      form.setValue(response);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const readonly = props.action === "view";
  const loading =
    criar.status === "loading" ||
    editar.status === "loading" ||
    obter.status === "loading";

  return (
    <FormRoot.Form
      loading={loading}
      urlVoltar={rotasApp.tabelaDePreco.paginacao}
      readonly={readonly}
      submit={form.onSubmit}
      titulo="Tabela de preço"
    >
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <InputApp
            label="Descrição"
            maxLength={255}
            id="descricao"
            onChange={form.onChange}
            onBlur={form.onBlur}
            autoFocus
            readonly={readonly}
            required
            error={form.error("descricao")}
            helperText={form.helperText("descricao")}
            value={form.values.descricao}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <CheckBoxApp
            label="Ativa ecommerce"
            id="ativaEcommerce"
            onChange={form.onChange}
            readonly={readonly}
            value={form.values.ativaEcommerce}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
    </FormRoot.Form>
  );
}
