import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Liturgia Diária - Leituras da Missa Católica",
    template: "%s | Liturgia Diária",
  },
  description:
    "Liturgia diária católica em 4 línguas: português, inglês, espanhol e italiano. Leituras da missa, orações e Bíblia.",
  keywords: [
    "liturgia diária",
    "missa",
    "leituras",
    "católica",
    "evangelho",
    "orações",
    "bíblia",
    "daily mass",
    "lecturas",
    "liturgia",
  ],
  authors: [{ name: "Liturgia Diária IA" }],
  creator: "Liturgia Diária IA",
  publisher: "Liturgia Diária IA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://liturgia-diaria-ia.vercel.app",
    title: "Liturgia Diária - Leituras da Missa Católica",
    description:
      "Liturgia diária católica em 4 línguas: português, inglês, espanhol e italiano.",
    siteName: "Liturgia Diária IA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liturgia Diária - Leituras da Missa Católica",
    description:
      "Liturgia diária católica em 4 línguas: português, inglês, espanhol e italiano.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
