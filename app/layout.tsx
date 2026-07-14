import type { Viewport } from "next";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider, ThemeScript } from "@/features/theme";
import { loadProfile, loadSiteConfiguration } from "@/lib/content";
import {
  buildSiteMetadata,
  buildSiteStructuredData,
  JsonLd,
} from "@/lib/metadata";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const siteConfig = loadSiteConfiguration();
const profile = loadProfile();
const structuredData = buildSiteStructuredData(siteConfig, profile);

export const metadata = buildSiteMetadata(siteConfig);

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.seo.locale}
      className={`${fontVariables} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <JsonLd data={structuredData} />
      </head>
      <body className="min-h-full flex flex-col bg-canvas font-sans text-text-primary antialiased">
        <NextTopLoader
          color="#8b7355"
          initialPosition={0.08}
          crawl={true}
          showSpinner={false}
          height={3}
          shadow="0 0 10px #8b7355,0 0 5px #8b7355"
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
