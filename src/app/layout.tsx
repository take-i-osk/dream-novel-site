import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ReaderStoreHydrator } from "@/components/ReaderStoreHydrator";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "俺の夢",
    template: "%s | 俺の夢",
  },
  description: "個人運営の夢小説アーカイブサイトです。",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReaderStoreHydrator />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
