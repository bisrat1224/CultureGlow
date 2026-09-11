import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Help | CultureGlow24",
  robots: { index: false, follow: false },
};

export default function AdminHelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
