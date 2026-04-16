import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZetaZone — Burning Man Camp",
  description:
    "ZetaZone is a Burning Man theme camp. Explore our gallery, projects, and camp notes.",
  metadataBase: new URL("https://zetazone.org"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "ZetaZone — Burning Man Camp",
    description:
      "ZetaZone is a Burning Man theme camp. Explore our gallery, projects, and camp notes.",
    url: "https://zetazone.org",
    siteName: "ZetaZone",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
