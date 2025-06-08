"use client";

import { useAPiPedido } from "@/api/UseApiPedido";
import { ChipApp } from "@/components/divider";
import { IconButtonAppComTooltip } from "@/components/icon/icon-button-tooltip";
import { TabelaPaginacao } from "@/components/tabela-paginacao";
import { rotasApi } from "@/configs/RotasApi";
import { rotasApp } from "@/configs/RotasApp";
import { statusPedido } from "@/enums/StatusPedidoEnum";
import { useArquivo } from "@/hooks/UseArquivo";
import { useNavigateApp } from "@/hooks/useNavigateApp";

export default function PedidoPaginacao() {
  const { navigate } = useNavigateApp();
  const { generatePdfFromBase64 } = useArquivo();
  const { downloadPedido } = useAPiPedido();

  async function downloadPedidoLocal(id: string) {
    const pdfBase64 = await downloadPedido.fetch(id);
    if (pdfBase64?.pdf) {
      const pdf = await generatePdfFromBase64(pdfBase64.pdf);
      const link = document.createElement("a");
      link.href = pdf;
      link.download = `${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <TabelaPaginacao
      columns={[
        {
          flex: 0.2,
          width: 200,
          field: "usuario",
          headerName: "Cliente",
        },
        {
          flex: 0.175,
          width: 10,
          field: "statusPedido",
          headerName: "Status",
          sortable: true,
          renderCell: (params: any) => {
            const status = statusPedido[params.statusPedido];
            return <ChipApp cor={status.color} titulo={status.title} />;
          },
        },
        {
          field: "status2",
          headerName: "Baixar",
          align: "center",
          renderCell: (params: any) => {
            return (
              <IconButtonAppComTooltip
                titulo={"Modificar status do pedido"}
                icon="fe:app-menu"
                placement="top"
                onClick={() =>
                  navigate(
                    `${rotasApp.pedido.modificarStatusPedido}/${params.id}`
                  )
                }
              />
            );
          },
        },
        {
          field: "status3",
          headerName: "PDF",
          align: "center",
          renderCell: (params: any) => {
            return (
              <IconButtonAppComTooltip
                titulo={"Download do pedido"}
                placement="top"
                icon="material-symbols-light:download"
                onClick={() => downloadPedidoLocal(`${params.id}`)}
              />
            );
          },
        },
        // {
        //   field: "pix",
        //   headerName: "PIX",
        //   align: "center",
        //   renderCell: (params: any) => {
        //     return (
        //       <Tooltip title="PIX" placement="top">
        //         <IconButton
        //           onClick={() => navigate(`pedidos/gerar-pix/${params.id}`)}
        //         >
        //           <IconifyIcon icon="ic:sharp-pix" />
        //         </IconButton>
        //       </Tooltip>
        //     );
        //   },
        // },
      ]}
      url={rotasApi.pedido.paginacao}
    />
  );
}
