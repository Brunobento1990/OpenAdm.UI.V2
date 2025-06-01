import { ReactNode } from "react";
import { BoxApp, justifyContent } from "../box/BoxApp";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { ButtonApp } from "../button";
import { TextApp } from "../text/TextApp";

interface propsForm {
  children: ReactNode;
  submit: () => Promise<any>;
  tituloBotaoSalvar?: string;
  loading?: boolean;
  urlVoltar?: string;
  padding?: string;
  width?: string;
  readonly?: boolean;
  maxWidth?: string;
  heigth?: string;
  footer?: IFooterForm;
  textoButton?: string;
  paddingFooter?: string;
  marginTop?: string;
  titulo: string;
}

interface IFooterForm {
  children?: ReactNode;
  justifyContent?: justifyContent;
}

export function FormApp(props: propsForm) {
  const { navigate } = useNavigateApp();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await props.submit();
      }}
      style={{
        height: "100%",
        width: "100%",
        maxWidth: props.maxWidth,
      }}
    >
      <TextApp titulo={props.titulo} fontWeight={600} fontSize="1.50rem" />
      <BoxApp
        padding={props.padding ?? "0px 1rem 1rem 1rem"}
        boxShadow="none"
        marginTop={props.marginTop ?? "10px"}
        height={props.heigth ?? "calc(100vh - 170px)"}
        overflowy="auto"
        overflowx="hidden"
        width={props.width}
      >
        {props.children}
      </BoxApp>
      <BoxApp
        display="flex"
        justifyContent={props.footer?.justifyContent ?? "end"}
        gap="20px"
        height="30px"
        alignItems="center"
        padding={props.paddingFooter ?? "1rem"}
        width="100%"
        boxSizing="border-box"
      >
        {props.footer?.children}
        <BoxApp
          display="flex"
          justifyContent={"end"}
          gap="20px"
          height="30px"
          alignItems="center"
          width={props.readonly || !props.urlVoltar ? "150px" : "300px"}
        >
          {props.urlVoltar && (
            <ButtonApp
              size="small"
              fullWidth
              variant="outlined"
              title="Voltar"
              onClick={() => navigate(props.urlVoltar)}
            />
          )}
          {!props.readonly && (
            <ButtonApp
              fullWidth
              loading={props.loading}
              onClick={props.submit}
              type="submit"
              title={props.textoButton}
              size="small"
              variant="contained"
            />
          )}
        </BoxApp>
      </BoxApp>
    </form>
  );
}
