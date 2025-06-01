import { useNavigateApp } from "@/hooks/useNavigateApp";
import { useState } from "react";
import { InputApp } from "../input/InputApp";
import { BoxApp } from "../box/BoxApp";
import { ButtonApp } from "../button";

interface propsHeaderTable {
  urlAdd?: string;
  pesquisar: (search?: string) => void;
}

export function HeaderTable(props: propsHeaderTable) {
  const { navigate, path } = useNavigateApp();
  const [search, setSearch] = useState("");

  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="20px"
      width="100%"
    >
      <ButtonApp
        title="Adicionar"
        onClick={() => navigate(props.urlAdd)}
        variant="contained"
      />
      <form
        style={{
          width: "100%",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (props.pesquisar) {
            props.pesquisar(search?.length === 0 ? undefined : search);
          }
        }}
      >
        <BoxApp display="flex" alignItems="center" gap="0.5rem">
          <InputApp
            size="small"
            label="Pesquisar"
            name="pesquisar"
            id="pesquisar"
            value={search}
            onChange={(_, e) => {
              setSearch(e);
              if (e?.length === 0) {
                props.pesquisar(undefined);
              }
            }}
            endIcon="ic:twotone-search"
          />
        </BoxApp>
      </form>
    </BoxApp>
  );
}
