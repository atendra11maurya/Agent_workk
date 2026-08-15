import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";

import { getRequestSiteUrl } from "@/src/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const title = "CodeAux — Revenue-Focused Website Design & Development";
const description =
  "Premium websites designed around stronger credibility, clearer conversion paths and better business outcomes.";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getRequestSiteUrl(await headers());
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s — CodeAux",
    },
    description,
    applicationName: "CodeAux",
    category: "business",
    alternates: { canonical: "/" },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: "/",
      siteName: "CodeAux",
      title,
      description,
      images: [
        {
          url: "/og.png",
          width: 1536,
          height: 1024,
          alt: "CodeAux — Websites built to grow your revenue.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    verification: googleVerification
      ? { google: googleVerification }
      : undefined,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#050608",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
