import type { Metadata } from "next";
import { Hanken_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Oneko from "@/components/Oneko";
import { siteConfig } from "@/config/site";
import Script from "next/script";

const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: `${siteConfig.name} — Portfolio`,
//   description: siteConfig.seoDescription,
//   openGraph: {
//     title: siteConfig.name,
//     description: siteConfig.seoDescription,
//     url: siteConfig.website,
//     siteName: siteConfig.name,
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteConfig.name,
//     description: siteConfig.seoDescription,
//   },
// };

export const metadata: Metadata = {
  title: {
    default: "Sanyam Aggarwal",
    template: "%s | Sanyam Aggarwal",
  },

  description: siteConfig.seoDescription,

  authors: [
    {
      name: "Sanyam Aggarwal",
    },
  ],

  metadataBase: new URL("https://aggarwalsanyam.vercel.app"),

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Sanyam Aggarwal",
    description: siteConfig.seoDescription,
    url: "https://aggarwalsanyam.vercel.app",
    siteName: "Sanyam Aggarwal",
    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 6o0,
        alt: "Sanyam Aggarwal Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sanyam Aggarwal",
    description: siteConfig.seoDescription,

    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${hanken.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={UMAMI_ID}
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Oneko />
        </ThemeProvider>
      </body>
    </html>
  );
}
