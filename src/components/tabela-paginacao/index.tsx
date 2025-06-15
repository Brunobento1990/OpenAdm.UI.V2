import { TypeMethod, useApi } from "@/hooks/UseApi";
import { useLocalStorageApp } from "@/hooks/UseLocalStorageApp";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { useCallback, useEffect, useState } from "react";
import { BoxApp } from "../box/BoxApp";
import { LoadingAppTexto } from "../loading";
import { FooterTable } from "./footer";
import { HeaderTable } from "./header";
import { ISort, ISortingTable, TableApp } from "./tabela";
import { DefaultColuns } from "./default-columns";

interface tableProps {
  columns: any[];
  url: string;
  urlDelete?: string;
  urlAdd?: string;
  urlView?: string;
  urlEdit?: string;
  refreshPai?: boolean;
  filtroComplementar?: any;
  metodo?: TypeMethod;
  minWidth?: number;
  orderBy?: string;
  order?: ISort;
}

export function TabelaPaginacao(props: tableProps) {
  const { navigate } = useNavigateApp();
  const [pagina, setPagina] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<ISortingTable>({
    field: props.orderBy ?? "id",
    sort: props.order ?? "asc",
  });
  const [quantidadePagina, setQuantidadePagina] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);
  const { action, statusRequisicao } = useApi({
    method: props.metodo ?? "POST",
    url: props.url,
    naoRenderizarResposta: true,
    statusInicial: "loading",
  });

  const body = {
    skip: search ? 0 : pagina,
    take: 50,
    orderBy: sorting.field,
    asc: sorting.sort === "asc",
    ...props.filtroComplementar,
  };

  async function refresh(searchP?: string) {
    setSearch(searchP ?? "");
    const response = await action<any>({
      body: {
        ...body,
        skip: searchP && searchP.length > 0 ? 0 : pagina,
        search: searchP
          ?.replace(".", "")
          ?.replace("-", "")
          ?.replace("/", "")
          ?.toUpperCase(),
      },
    });
    if (response?.values?.length > 0) {
      setRows(response.values);
      setQuantidadePagina(response.totalPaginas);
    }
  }

  const defaultColuns = DefaultColuns({
    urlDelete: props.urlDelete,
    urlEdit: props.urlEdit,
    urlView: props.urlView,
    reload: refresh,
  });

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, sorting, props.refreshPai]);

  const onDoubleClick = useCallback(
    (item: any) => navigate(`${props.urlEdit}/${item?.id}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  const onDoubleClickView = useCallback(
    (item: any) => navigate(`${props.urlView}/${item?.id}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  const newColumns = [
    { field: "numero", headerName: "N°" },
    ...props.columns,
    ...defaultColuns,
  ];

  return (
    <BoxApp
      padding=".5rem"
      overflowy="auto"
      height="100%"
      boxSizing="border-box"
      display="flex"
      flexDirection="column"
      gap=".5rem"
    >
      <HeaderTable urlAdd={props.urlAdd} pesquisar={refresh} />
      {statusRequisicao === "loading" ? (
        <LoadingAppTexto comBox height="calc(100vh - 200px)" />
      ) : (
        <>
          <TableApp
            onDoubleClick={
              !props.urlEdit
                ? !props.urlView
                  ? undefined
                  : onDoubleClickView
                : onDoubleClick
            }
            heigth="calc(100vh - 200px)"
            columns={newColumns}
            rows={rows}
            sorting={sorting}
            setSorting={setSorting}
            search={search}
            minWidth={props.minWidth}
            stickyHeader
          />
        </>
      )}
      <FooterTable
        pagina={pagina}
        setPagina={setPagina}
        quantidadePagina={quantidadePagina}
      />
    </BoxApp>
  );
}
