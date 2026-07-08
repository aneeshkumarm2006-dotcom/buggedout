"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

// The live /privacy-policy document is standalone: it ships its own minimal
// header and no site footer. Everywhere else gets the shared Nav + Footer.
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const bare = usePathname() === "/privacy-policy";

  if (bare) return <>{children}</>;

  return (
    <>
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
