import { listaIcones } from "@/configs/listaIcones";
import { IconButtonAppComTooltip } from "./icon-button-tooltip";
import { useApiCep } from "@/api/UseApiCep";
import { IEnderecoBase } from "@/interfaces/Base";

interface IconConsultaCepProps {
  cep?: string;
  setEndereco: (endereco?: IEnderecoBase) => void;
}

export function IconConsultaCep(props: IconConsultaCepProps) {
  const { consulta } = useApiCep();

  async function consultarCep() {
    if (!props.cep) {
      return;
    }
    const response = await consulta.fetch(props.cep);
    props.setEndereco(response);
  }

  return (
    <IconButtonAppComTooltip
      icon={
        consulta.status === "loading"
          ? listaIcones.loading
          : listaIcones.searchGlobal
      }
      titulo="Consultar cep"
      onClick={consultarCep}
    />
  );
}
