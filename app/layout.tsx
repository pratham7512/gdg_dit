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

        <title>GDG-DIT</title>
        <meta name="description" content="Google Developers Group DIT"/>

        <meta property="og:url" content="https://gdgdit.tech"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="GDG-DIT"/>
        <meta property="og:description" content="Google Developers Group DIT"/>
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/632dc987-2c3b-4717-831b-41d46ef4f2e7.png?token=KnTi8TsMuVtycoOhBn4o1HTKwwM4BVwAEXv-cWM93tc&height=610&width=1200&expires=33272938647"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="gdgdit.tech"/>
        <meta property="twitter:url" content="https://gdgdit.tech"/>
        <meta name="twitter:title" content="GDG-DIT"/>
        <meta name="twitter:description" content="Google Developers Group DIT"/>
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/632dc987-2c3b-4717-831b-41d46ef4f2e7.png?token=KnTi8TsMuVtycoOhBn4o1HTKwwM4BVwAEXv-cWM93tc&height=610&width=1200&expires=33272938647"/>

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
