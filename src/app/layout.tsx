"use client";

import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSnackbarApp } from "@/components/snack/SnackBarApp";
import { useModal } from "@/components/modal";
import { AuthProviderApp } from "@/context/AuthContextApp";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Componet: ComponentSnack } = useSnackbarApp();
  const { Component: ComponentModal } = useModal();

  return (
    <html lang="pt-BR">
      <head>
        <title>{`Open Adm - Ecommerce`}</title>
        <meta name="description" content={`Open Adm – Ecommerce.`} />
      </head>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <AuthProviderApp>
            <CssBaseline />
            <ComponentSnack />
            <ComponentModal />
            {children}
          </AuthProviderApp>
        </ThemeProvider>
      </body>
    </html>
  );
}
