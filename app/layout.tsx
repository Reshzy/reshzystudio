import { loadSiteConfiguration } from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const siteConfig = loadSiteConfiguration();

export const metadata = buildSiteMetadata(siteConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.seo.locale} className={`${fontVariables} h-full`}>
      <body className="min-h-full flex flex-col bg-canvas font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
