import { PageLayout } from "@/layout/PageLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout>{children}</PageLayout>;
}
