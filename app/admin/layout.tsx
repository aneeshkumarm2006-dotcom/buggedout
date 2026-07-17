import type { Metadata } from "next";

// Keeps every /admin route (including the client-rendered login page, which
// cannot export metadata itself) out of search indexes.
export const metadata: Metadata = {
  title: "BuggedOut Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
