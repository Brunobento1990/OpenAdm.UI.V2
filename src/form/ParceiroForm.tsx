"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiParceiro } from "@/api/UseApiParceiro";
import { BoxApp } from "@/components/box/BoxApp";
import { DropDownApp } from "@/components/dropdown/DropDownApp";
import { FormRoot } from "@/components/form/FormRoot";
import { IconButtonAppComTooltip } from "@/components/icon/icon-button-tooltip";
import { InputApp, MaskType } from "@/components/input/InputApp";
import { InputFile } from "@/components/input/InputFile";
import { LoadingAppTexto } from "@/components/loading";
import { TextApp } from "@/components/text/TextApp";
import { listaIcones } from "@/configs/listaIcones";
import {
  RedeSocialEnum,
  redeSocialEnumDescricao,
  redesSociaisOpcoes,
} from "@/enums/RedeSocialEnum";
import { useArquivo } from "@/hooks/UseArquivo";
import { IParceiro } from "@/interfaces/Parceiro";
import { clearMaskCpfCnpj } from "@/utils/mascaras/CpfCnpjMascara";
import { limparMascaraDinheiro } from "@/utils/mascaras/MoneyMascara";
import { limparMascaraTelefone } from "@/utils/mascaras/TelefoneMascara";
import { removerItemDeArrayPorIndex } from "@/utils/RemoverItemDeArrayPorIndex";
import { Card } from "@mui/material";
import { useEffect } from "react";

export function ParceiroForm() {
  const { editar, excluirRedeSocial, excluirTelefone, obter } =
    useApiParceiro();
  const { resolveUploadImagem, recortarBase64, formatarBase64 } = useArquivo();
  const form = useFormikAdapter<IParceiro>({
    initialValues: {
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: "",
      telefones: [],
      redesSociais: [],
    },
    validationSchema: new YupAdapter()
      .string("cnpj")
      .string("razaoSocial")
      .string("nomeFantasia")
      .build(),
    onSubmit: submit,
  });

  async function excluirRedeSocialLocal(redeSocialId: string, index: number) {
    if (!redeSocialId) {
      form.setValue({
        redesSociais: removerItemDeArrayPorIndex(
          index,
          form.values.redesSociais
        ),
      });
      return;
    }

    const response = await excluirRedeSocial.fetch(redeSocialId);
    if (response) {
      form.setValue({
        redesSociais: removerItemDeArrayPorIndex(
          index,
          form.values.redesSociais
        ),
      });
    }
  }

  async function excluirTelefoneLocal(telefoneId: string, index: number) {
    if (!telefoneId) {
      form.setValue({
        telefones: removerItemDeArrayPorIndex(index, form.values.telefones),
      });
      return;
    }

    const response = await excluirTelefone.fetch(telefoneId);
    if (response) {
      form.setValue({
        telefones: removerItemDeArrayPorIndex(index, form.values.telefones),
      });
    }
  }

  function onChangeRedeSocial(
    index: number,
    link?: string,
    tipo?: RedeSocialEnum
  ) {
    let novasRedesSociais = [...form.values.redesSociais];
    let redeSocial = novasRedesSociais[index];
    if (redeSocial) {
      redeSocial.link = link ?? "";
      redeSocial.redeSocialEnum = tipo as any;
    }

    form.setValue({
      redesSociais: novasRedesSociais,
    });
  }

  function onChangeTelefone(index: number, value?: string) {
    let novosTelefones = [...form.values.telefones];
    let telefone = novosTelefones[index];
    if (telefone) {
      telefone.telefone = value ?? "";
    }

    form.setValue({
      telefones: novosTelefones,
    });
  }

  async function submit() {
    await editar.fetch({
      ...form.values,
      cnpj: clearMaskCpfCnpj(form.values.cnpj),
      telefones: form.values.telefones
        .filter((x) => x.telefone)
        .map((x) => {
          return {
            ...x,
            telefone: limparMascaraTelefone(x.telefone) ?? '',
          };
        }),
      redesSociais: form.values.redesSociais.filter(
        (x) => x.link && x.redeSocialEnum
      ),
    });
  }

  async function init() {
    const response = await obter.fetch();
    if (response) {
      form.setValue(response);
    }
  }

  async function onChangeLogo(arquivos?: FileList) {
    if (!arquivos || !arquivos.length) {
      return;
    }
    const logo = await resolveUploadImagem(arquivos[0]);
    form.setValue({
      logo: recortarBase64(logo).base64,
    });
  }

  useEffect(() => {
    init();
  }, []);

  const loading = obter.status === "loading" || editar.status === "loading";

  return (
    <FormRoot.Form
      submit={form.onSubmit}
      titulo="Minha empresa"
      loading={loading}
    >
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={3}>
          <InputApp
            id="cnpj"
            label="CNPJ"
            value={form.values.cnpj}
            onChange={form.onChange}
            onBlur={form.onBlur}
            required
            mask={MaskType.CNPJ}
            autoFocus
            error={form.error("cnpj")}
            helperText={form.helperText("cnpj")}
            name="cnpj"
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={9}>
          <InputApp
            id="razaoSocial"
            label="Razão social"
            value={form.values.razaoSocial}
            onChange={form.onChange}
            onBlur={form.onBlur}
            required
            maxLength={255}
            error={form.error("razaoSocial")}
            helperText={form.helperText("razaoSocial")}
            name="razaoSocial"
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={9}>
          <InputApp
            id="nomeFantasia"
            label="Nome fantasia"
            value={form.values.nomeFantasia}
            onChange={form.onChange}
            onBlur={form.onBlur}
            required
            maxLength={255}
            error={form.error("nomeFantasia")}
            helperText={form.helperText("nomeFantasia")}
            name="nomeFantasia"
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={3}>
          <InputFile
            accept={["image/*"]}
            label="Selecione sua logo"
            handleFileChange={onChangeLogo}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <Card>
            {excluirRedeSocial.status === "loading" && (
              <LoadingAppTexto comBox texto="Excluindo rede social" />
            )}
            <BoxApp display="flex" alignItems="center" justifyContent="center">
              <TextApp titulo="Redes sociais" />
              <IconButtonAppComTooltip
                icon={listaIcones.adicionar}
                titulo="Adicione redes sociais"
                cor="green"
                onClick={() => {
                  form.setValue({
                    redesSociais: [
                      ...(form.values.redesSociais ?? []),
                      { link: "" } as any,
                    ],
                  });
                }}
              />
            </BoxApp>
            {form.values.redesSociais.map((redeSocial, index) => (
              <BoxApp
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="10px"
                padding="1rem"
              >
                <DropDownApp
                  id={`RedeSocial${index}`}
                  keyLabel="descricao"
                  label="Tipo"
                  values={redesSociaisOpcoes}
                  value={redesSociaisOpcoes.find(
                    (x) => x.id === redeSocial.redeSocialEnum
                  )}
                  onChange={(_, value) =>
                    onChangeRedeSocial(index, redeSocial.link, value)
                  }
                />
                <InputApp
                  id={`link${index}`}
                  label="Link"
                  value={redeSocial.link}
                  maxLength={500}
                  onChange={(_, value) =>
                    onChangeRedeSocial(index, value, redeSocial.redeSocialEnum)
                  }
                />
                <IconButtonAppComTooltip
                  icon={listaIcones.lixeira}
                  cor="red"
                  titulo=""
                  onClick={async () =>
                    await excluirRedeSocialLocal(redeSocial.id, index)
                  }
                />
              </BoxApp>
            ))}
          </Card>
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow sm={6} xs={12}>
          <Card>
            {excluirTelefone.status === "loading" && (
              <LoadingAppTexto comBox texto="Excluindo telefone" />
            )}
            <BoxApp display="flex" alignItems="center" justifyContent="center">
              <TextApp titulo="Telefones" />
              <IconButtonAppComTooltip
                icon={listaIcones.adicionar}
                titulo="Adicione telefones"
                cor="green"
                onClick={() => {
                  form.setValue({
                    telefones: [
                      ...(form.values.telefones ?? []),
                      { telefone: "" } as any,
                    ],
                  });
                }}
              />
            </BoxApp>
            {form.values.telefones.map((telefone, index) => (
              <BoxApp
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="10px"
                padding="1rem"
              >
                <InputApp
                  id={`telefone${index}`}
                  label="Telefone"
                  value={telefone.telefone}
                  mask={MaskType.TELEFONE}
                  onChange={(_, value) => onChangeTelefone(index, value)}
                />
                <IconButtonAppComTooltip
                  icon={listaIcones.lixeira}
                  cor="red"
                  titulo=""
                  onClick={async () => excluirTelefoneLocal(telefone.id, index)}
                />
              </BoxApp>
            ))}
          </Card>
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      {form.values.logo && (
        <img
          src={formatarBase64(form.values.logo)}
          alt="logo"
          style={{ maxWidth: "300px" }}
        />
      )}
    </FormRoot.Form>
  );
}
