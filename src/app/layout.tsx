"use client";

import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSnackbarApp } from "@/components/snack/SnackBarApp";
import { useModal } from "@/components/modal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Componet: ComponentSnack } = useSnackbarApp();
  const { Component: ComponentModal } = useModal();

  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <ComponentSnack />
          <ComponentModal />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
