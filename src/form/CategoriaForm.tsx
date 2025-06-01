"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiCategoria } from "@/api/UseApiCategoria";
import { CheckBoxApp } from "@/components/checkbox/inedx";
import { FormRoot } from "@/components/form/FormRoot";
import { InputApp } from "@/components/input/InputApp";
import { InputFile } from "@/components/input/InputFile";
import { rotasApp } from "@/configs/RotasApp";
import { useArquivo } from "@/hooks/UseArquivo";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { ICategoria } from "@/interfaces/Categoria";
import { IFormTypes } from "@/interfaces/Form";
import { useEffect } from "react";

export function CategoriaForm(props: IFormTypes) {
  const { create, obter, update } = useApiCategoria();
  const { navigate, params } = useNavigateApp();
  const { recortarBase64, resolveUploadImagem } = useArquivo();
  const form = useFormikAdapter<ICategoria>({
    initialValues: {
      descricao: "",
    },
    validationSchema: new YupAdapter().string("descricao").build(),
    onSubmit: submit,
  });

  async function submit() {
    const body = {
      ...form.values,
      novaFoto: form.values.novaFoto
        ? recortarBase64(form.values.novaFoto).base64
        : undefined,
    };
    const response =
      props.action === "create"
        ? await create.fetch(body)
        : await update.fetch(body);
    if (response) {
      navigate(rotasApp.categoria.pagincao);
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
      titulo="Categoria"
      loading={loading}
      readonly={readonly}
      submit={form.onSubmit}
      urlVoltar={rotasApp.categoria.pagincao}
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
          <CheckBoxApp
            label="Inativo Ecommerce"
            value={form.values.inativoEcommerce}
            onChange={form.onChange}
            id="inativoEcommerce"
            readonly={readonly}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputFile
            accept={["image/*"]}
            handleFileChange={async (arquivos) => {
              if (arquivos && arquivos.length > 0) {
                const novaFoto = await resolveUploadImagem(arquivos[0]);
                form.setValue({ novaFoto });
              }
            }}
            label="Selecione uma foto"
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow sm={6} xs={12}>
          {form.values.novaFoto ? (
            <>
              <img
                src={form.values.novaFoto}
                style={{ maxWidth: "300px" }}
                alt="categoria"
              />
            </>
          ) : (
            <>
              {form.values.foto && (
                <img
                  src={form.values.foto}
                  style={{ maxWidth: "300px" }}
                  alt="categoria"
                />
              )}
            </>
          )}
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
    </FormRoot.Form>
  );
}
