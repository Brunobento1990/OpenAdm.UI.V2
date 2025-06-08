"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { useAPiPedido } from "@/api/UseApiPedido";
import { BoxApp } from "@/components/box/BoxApp";
import { DividerApp } from "@/components/divider";
import { DropDownApp } from "@/components/dropdown/DropDownApp";
import { FormRoot } from "@/components/form/FormRoot";
import { TextApp } from "@/components/text/TextApp";
import { rotasApp } from "@/configs/RotasApp";
import { opcoesStatusPedido } from "@/enums/StatusPedidoEnum";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { IPedido } from "@/interfaces/Pedido";
import { formatDateComHoras } from "@/utils/mascaras/FormtaDate";
import { moneyMascara } from "@/utils/mascaras/MoneyMascara";
import { useEffect } from "react";

export function ModificarStatusPedidoForm() {
  const { obter, atualizarStatus } = useAPiPedido();
  const { navigate, params } = useNavigateApp();
  const form = useFormikAdapter<IPedido>({
    onSubmit: submit,
  });

  async function init() {
    const response = await obter.fetch(params.id as string);
    if (response) {
      form.setValue(response);
    }
  }

  async function submit() {
    const response = await atualizarStatus.fetch({
      pedidoId: form.values.id,
      statusPedido: form.values.statusPedido,
    });
    if (response) {
      navigate(rotasApp.pedido.paginacao);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const loading =
    obter.status === "loading" || atualizarStatus.status === "loading";

  return (
    <FormRoot.Form
      submit={form.onSubmit}
      loading={loading}
      titulo="Status do pedido"
      urlVoltar={rotasApp.pedido.paginacao}
    >
      <BoxApp>
        <TextApp titulo={`N°: #${form.values.numero}`} />
        <TextApp
          titulo={`Data de cadastro: ${formatDateComHoras(
            form.values.dataDeCriacao
          )}`}
        />
        <TextApp
          titulo={`Ultima atualização: ${formatDateComHoras(
            form.values.dataDeAtualizacao
          )}`}
        />
        <TextApp titulo={`Cliente: ${form.values.usuario}`} />
        <TextApp titulo={`Total: ${moneyMascara(form.values.valorTotal)}`} />
        {/* {status?.color && (
          <BoxApp display="flex" gap="1rem">
            <TextApp texto="Status: " />
            <StatusApp cor={status.color} titulo={status.title} />
          </BoxApp>
        )} */}
      </BoxApp>
      <DividerApp
        cor="primary"
        chip="Selecione o status"
        marginTop="1rem"
        marginBotton="1rem"
      />
      <DropDownApp
        id="statusPedido"
        keyLabel="label"
        label="Status"
        required
        onChange={form.onChange}
        values={opcoesStatusPedido}
        value={opcoesStatusPedido.find(
          (x) => x.id === form.values.statusPedido
        )}
      />
      {/* <RadioApp
        label={"Atualizar status"}
        id={"status"}
        value={statusPedidoSelecionado}
        row
        onChange={(_, value) => setStatusPedidoSelecionado(value)}
        options={[
          
        ]}
      /> */}
    </FormRoot.Form>
  );
}
