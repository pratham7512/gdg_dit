import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "GDG-DIT-CONTEST",
  description: "Google Developers Group DIT",
  metadataBase: new URL("https://gdgdit.tech"),
  openGraph: {
    title: "GDG-DIT-CONTEST",
    description: "Google Developers Group DIT",
    url: "https://gdgdit.tech",
    type: "website",
    images: [{
      url: "https://opengraph.b-cdn.net/production/images/e78d7a0a-5b29-430f-a3da-70bd6513b29f.png?token=XDvGmyCg0JaeZ7TVSowZgpWu-iU-wtPRGDSL8-dbgNg&height=611&width=1200&expires=33272939018",
      width: 1200,
      height: 611,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG-DIT-CONTEST",
    description: "Google Developers Group DIT",
    images: ["https://opengraph.b-cdn.net/production/images/e78d7a0a-5b29-430f-a3da-70bd6513b29f.png?token=XDvGmyCg0JaeZ7TVSowZgpWu-iU-wtPRGDSL8-dbgNg&height=611&width=1200&expires=33272939018"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.className}>
      <body>
        {children}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "b9e716f7fd4f40d5ad8530acc42f9c9a"}'
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RNM0KRQE1D"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RNM0KRQE1D');
            `,
          }}
        />
      </body>
    </html>
  );
}