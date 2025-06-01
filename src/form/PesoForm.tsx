"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiPeso } from "@/api/UseApiPeso";
import { FormRoot } from "@/components/form/FormRoot";
import { InputApp } from "@/components/input/InputApp";
import { rotasApp } from "@/configs/RotasApp";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { IFormTypes } from "@/interfaces/Form";
import { IPeso } from "@/interfaces/Peso";
import { useEffect } from "react";

export function PesoForm(props: IFormTypes) {
  const { create, obter, update } = useApiPeso();
  const { navigate, params } = useNavigateApp();
  const form = useFormikAdapter<IPeso>({
    initialValues: {
      descricao: "",
    },
    validationSchema: new YupAdapter().string("descricao").build(),
    onSubmit: submit,
  });

  async function submit() {
    const response =
      props.action === "create"
        ? await create.fetch(form.values)
        : await update.fetch(form.values);
    if (response) {
      navigate(rotasApp.peso.pagincao);
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

  const loading =
    create.status === "loading" ||
    update.status === "loading" ||
    obter.status === "loading";

  const readonly = props.action === "view";

  useEffect(() => {
    init();
  }, []);

  return (
    <FormRoot.Form
      titulo="Peso"
      loading={loading}
      readonly={readonly}
      submit={form.onSubmit}
      urlVoltar={rotasApp.peso.pagincao}
    >
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputApp
            label="Descrição"
            maxLength={255}
            id="descricao"
            value={form.values.descricao}
            autoFocus
            onChange={form.onChange}
            onBlur={form.onBlur}
            required
            error={form.error("descricao")}
            helperText={form.helperText("descricao")}
            readonly={readonly}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputApp
            label="Peso real"
            value={form.values.pesoReal}
            onChange={form.onChange}
            id="pesoReal"
            type="number"
            readonly={readonly}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
    </FormRoot.Form>
  );
}
