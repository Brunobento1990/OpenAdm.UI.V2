"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiCliente } from "@/api/UseApiCliente";
import { FormRoot } from "@/components/form/FormRoot";
import { InputApp } from "@/components/input/InputApp";
import { rotasApp } from "@/configs/RotasApp";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { IAtualizarSenhaUsuarioAdm } from "@/interfaces/AtualizarSenhaUsuarioAdm";

export function AtualizarSenhaClienteForm() {
  const { navigate, params } = useNavigateApp();
  const { atualizarSenha } = useApiCliente();
  const form = useFormikAdapter<IAtualizarSenhaUsuarioAdm>({
    initialValues: {
      usuarioId: params.id,
      senha: "",
      confirmarSenha: "",
    },
    validationSchema: new YupAdapter()
      .string("senha")
      .string("confirmarSenha")
      .build(),
    onSubmit: submit,
  });

  async function submit() {
    const response = await atualizarSenha.fetch(form.values);
    if (response) {
      navigate(rotasApp.cliente.paginacao);
    }
  }

  return (
    <FormRoot.Form
      submit={form.onSubmit}
      titulo="Atualizar senha cliente"
      loading={atualizarSenha.status === "loading"}
      urlVoltar={rotasApp.cliente.paginacao}
    >
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <InputApp
            id="senha"
            label="Senha"
            autoFocus
            value={form.values.senha}
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("senha")}
            helperText={form.helperText("senha")}
            maxLength={20}
            isPassword
            required
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <InputApp
            id="confirmarSenha"
            label="Confirmar senha"
            value={form.values.confirmarSenha}
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("confirmarSenha")}
            helperText={form.helperText("confirmarSenha")}
            maxLength={20}
            isPassword
            required
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
    </FormRoot.Form>
  );
}
