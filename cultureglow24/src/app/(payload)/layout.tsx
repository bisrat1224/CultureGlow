import { RootLayout as PayloadRootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PayloadRootLayout importMap={importMap}>
      {children}
    </PayloadRootLayout>
  );
}