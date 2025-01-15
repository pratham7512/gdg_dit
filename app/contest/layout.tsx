import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

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
      url: "https://opengraph.b-cdn.net/production/images/7a2c19cd-6d73-4fae-8059-7c19e6daba53.png?token=K63QRdfVskyv82u_oRFcb7pUQsfOsUr_F7o6FofXKr4&height=608&width=1200&expires=33272956430",
      width: 1200,
      height: 611,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG-DIT-CONTEST",
    description: "Google Developers Group DIT",
    images: ["https://opengraph.b-cdn.net/production/images/7a2c19cd-6d73-4fae-8059-7c19e6daba53.png?token=K63QRdfVskyv82u_oRFcb7pUQsfOsUr_F7o6FofXKr4&height=608&width=1200&expires=33272956430"],
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