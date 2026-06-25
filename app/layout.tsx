import type { Metadata, Viewport } from "next";
import { Bungee, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SignupProvider from "@/components/SignupProvider";
import RevealObserver from "@/components/RevealObserver";
import { ROUTES } from "@/lib/copy";

const display = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = DM_Sans({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buggedout.com"),
  title: {
    default: ROUTES.home.title,
    template: "%s",
  },
  description: ROUTES.home.description,
  applicationName: "BuggedOut.com",
  openGraph: {
    type: "website",
    siteName: "BuggedOut.com",
    title: ROUTES.home.title,
    description: ROUTES.home.description,
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BuggedOut.com — live animal racing and betting arena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ROUTES.home.title,
    description: ROUTES.home.description,
    images: ["/assets/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060C0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body suppressHydrationWarning>
        {/* No-JS fallback: reveal animations stay hidden without JS, so force them visible. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>.reveal,.reveal-divider{opacity:1!important;transform:none!important;clip-path:none!important}</style>",
          }}
        />
        <SignupProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
          <RevealObserver />
        </SignupProvider>
      </body>
    </html>
  );
}
