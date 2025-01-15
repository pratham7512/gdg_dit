import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';



export const metadata: Metadata = {
  title: "GDG-DIT",
  description: "Google Developers Group DIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet" />
        <meta property="og:image" content="/images/og/image" />
        <meta property="twitter:image" content="/images/og/image" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Providers>
        {children}
        <Analytics/>
        </Providers>
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "b9e716f7fd4f40d5ad8530acc42f9c9a"}'></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RNM0KRQE1D"></script>
      </body>
    </html>
  );
}
