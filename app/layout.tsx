import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SignupProvider from "@/components/SignupProvider";
import RevealObserver from "@/components/RevealObserver";
import CustomCursor from "@/components/CustomCursor";
import { ROUTES } from "@/lib/copy";

const display = Chakra_Petch({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = Share_Tech_Mono({
  weight: "400",
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
        alt: "BuggedOut.com — live animal racing arena",
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
  themeColor: "#080B08",
};

// Static, decorative system-status strip that scrolls above the nav.
const TICKER = (
  <>
    <span>SYSTEM <b>ONLINE</b></span><span>ARENA_07</span>
    <span>SPECTATORS <b>47,210</b></span><span>NEXT ROUND <i>00:09</i></span>
    <span>UPTIME <b>24/7</b></span><span>LATENCY <b>12MS</b></span>
    <span>CHAOS LEVEL <i>MAX</i></span>
  </>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
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

        {/* Fixed atmospheric overlays — neon perspective grid, city glow, scanlines, grain, vignette. */}
        <div className="fx-grid" aria-hidden="true" />
        <div className="fx-glow" aria-hidden="true" />
        <div className="fx fx-vig" aria-hidden="true" />
        <div className="fx fx-scan" aria-hidden="true" />
        <div className="fx fx-beam" aria-hidden="true" />
        <div className="fx fx-grain" aria-hidden="true" />

        <SignupProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>

          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
          <RevealObserver />
          <CustomCursor />
        </SignupProvider>
      </body>
    </html>
  );
}
