"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useApiConfiguracaoPedido } from "@/api/UseApiConfiguracaoPedido";
import { FormRoot } from "@/components/form/FormRoot";
import { InputApp, MaskType } from "@/components/input/InputApp";
import { IConfiguracaoDePedido } from "@/interfaces/ConfiguracaoDePedido";
import { limparMascaraDinheiro } from "@/utils/mascaras/MoneyMascara";
import { useEffect } from "react";

export function ConfiguracaoPedidoForm() {
  const { obter, update } = useApiConfiguracaoPedido();

  const form = useFormikAdapter<IConfiguracaoDePedido>({
    initialValues: { emailDeEnvio: "" },
    validationSchema: new YupAdapter().string("emailDeEnvio").build(),
    onSubmit: submit,
  });

  async function submit() {
    await update.fetch(form.values);
  }

  async function init() {
    const response = await obter.fetch();
    if (response) {
      form.setValue(response);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const loading = obter.status === "loading" || update.status === "loading";

  return (
    <FormRoot.Form
      titulo="Configuração de pedido"
      submit={form.onSubmit}
      loading={loading}
    >
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <InputApp
            label="E-mail de envio"
            name="emailDeEnvio"
            id="emailDeEnvio"
            value={form.values.emailDeEnvio}
            onBlur={form.onBlur}
            onChange={form.onChange}
            helperText={form.helperText("emailDeEnvio")}
            error={form.error("emailDeEnvio")}
            maxLength={255}
            type="email"
            required
            autoFocus
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      <FormRoot.FormRow spacing={3}>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <InputApp
            label="Pedido minimo no atacado"
            name="pedidoMinimoAtacado"
            id="pedidoMinimoAtacado"
            value={form.values.pedidoMinimoAtacado}
            onBlur={form.onBlur}
            onChange={(_, value) =>
              form.setValue({
                pedidoMinimoAtacado: limparMascaraDinheiro(value),
              })
            }
            mask={MaskType.MONEY}
          />
        </FormRoot.FormItemRow>
        <FormRoot.FormItemRow xs={12} sm={6}>
          <InputApp
            label="Pedido minimo no varejo"
            name="pedidoMinimoVarejo"
            id="pedidoMinimoVarejo"
            value={form.values.pedidoMinimoVarejo}
            onBlur={form.onBlur}
            onChange={(_, value) =>
              form.setValue({
                pedidoMinimoVarejo: limparMascaraDinheiro(value),
              })
            }
            mask={MaskType.MONEY}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
    </FormRoot.Form>
  );
}
