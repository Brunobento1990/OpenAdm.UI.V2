"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiLojasParceiras } from "@/api/UseApiLojasParceiras";
import { FormRoot } from "@/components/form/FormRoot";
import { InputApp, MaskType } from "@/components/input/InputApp";
import { InputFile } from "@/components/input/InputFile";
import { rotasApp } from "@/configs/RotasApp";
import { useArquivo } from "@/hooks/UseArquivo";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { IFormTypes } from "@/interfaces/Form";
import { ILojasParceiras } from "@/interfaces/LojasParceiras";
import { limparMascaraTelefone } from "@/utils/mascaras/TelefoneMascara";
import { useEffect } from "react";

export function LojasParceirasForm(props: IFormTypes) {
  const { create, obter, update } = useApiLojasParceiras();
  const { navigate, params } = useNavigateApp();
  const { recortarBase64, resolveUploadImagem } = useArquivo();
  const readonly = props.action === "view";
  const form = useFormikAdapter<ILojasParceiras>({
    initialValues: {
      nome: "",
    },
    validationSchema: new YupAdapter().string("nome").build(),
    onSubmit: submit,
  });

  async function init() {
    if (props.action === "create") {
      return;
    }

    const response = await obter.fetch(params.id as string);
    if (response) {
      form.setValue(response);
    }
  }

  async function submit() {
    const body = {
      ...form.values,
      novaFoto: form.values.novaFoto
        ? recortarBase64(form.values.novaFoto).base64
        : undefined,
      contato: limparMascaraTelefone(form.values.contato),
    };

    const response =
      props.action === "create"
        ? await create.fetch(body)
        : await update.fetch(body);

    if (response) {
      navigate(rotasApp.lojasParceiras.pagincao);
    }
  }

  const loading =
    create.status === "loading" ||
    update.status === "loading" ||
    obter.status === "loading";

  useEffect(() => {
    init();
  }, []);

  return (
    <FormRoot.Form
      submit={form.onSubmit}
      readonly={readonly}
      titulo="Lojas parceiras"
      loading={loading}
      urlVoltar={rotasApp.lojasParceiras.pagincao}
    >
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputApp
            label="Nome"
            id="nome"
            value={form.values.nome}
            maxLength={255}
            onChange={form.onChange}
            onBlur={form.onBlur}
            autoFocus
            error={form.error("nome")}
            helperText={form.helperText("nome")}
            required
            readonly={readonly}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputApp
            label="Contato"
            id="contato"
            value={form.values.contato}
            onChange={form.onChange}
            onBlur={form.onBlur}
            mask={MaskType.TELEFONE}
            readonly={readonly}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputApp
            label="Link do facebook"
            id="facebook"
            value={form.values.facebook}
            maxLength={255}
            onChange={form.onChange}
            onBlur={form.onBlur}
            readonly={readonly}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputApp
            label="Link do instagram"
            id="instagram"
            value={form.values.instagram}
            maxLength={255}
            onChange={form.onChange}
            onBlur={form.onBlur}
            readonly={readonly}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <InputApp
            label="Endereço"
            id="endereco"
            value={form.values.endereco}
            maxLength={255}
            onChange={form.onChange}
            onBlur={form.onBlur}
            readonly={readonly}
          />
        </FormRoot.FormItemRow>
        {!readonly && (
          <FormRoot.FormItemRow sm={6} xs={12}>
            <InputFile
              accept={["image/*"]}
              handleFileChange={async (arquivos) => {
                if (arquivos && arquivos.length > 0) {
                  const novaFoto = await resolveUploadImagem(arquivos[0]);
                  form.setValue({
                    novaFoto,
                  });
                }
              }}
              label="Selecione uma logo"
            />
          </FormRoot.FormItemRow>
        )}
      </FormRoot.FormRow>
      {form.values.novaFoto ? (
        <>
          <img
            src={form.values.novaFoto}
            alt="logo"
            style={{ maxWidth: "300px" }}
          />
        </>
      ) : (
        <>
          {form.values.foto && (
            <img
              src={form.values.foto}
              alt="logo"
              style={{ maxWidth: "300px" }}
            />
          )}
        </>
      )}
    </FormRoot.Form>
  );
}
