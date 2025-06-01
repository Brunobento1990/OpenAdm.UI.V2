import { AuthProviderApp } from "@/context/AuthContextApp";
import { PageLayout } from "@/layout/PageLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProviderApp>
      <PageLayout>{children}</PageLayout>
    </AuthProviderApp>
  );
}
