import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatWidget } from "@/components/ChatWidget";

const siteUrl = "https://rodkod.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "РодКод — семейное наследие, книги и поиск предков",
    template: "%s | РодКод",
  },
  description:
    "Родословные книги, поиск предков, семейные древа и помощь в создании истории семьи. Начните с бесплатной консультации.",
  applicationName: "РодКод",
  other: {
    "codex-preview": "development",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "РодКод",
    title: "РодКод — семейное наследие",
    description:
      "Книги, исследования и семейные истории, которые помогают сохранить главное и передать его дальше.",
    images: [
      {
        url: "/products/elitnaya-01.jpg",
        width: 1200,
        height: 900,
        alt: "Элитная родословная книга РодКод",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "РодКод — семейное наследие",
    description:
      "Родословные книги, поиск предков и семейные истории.",
    images: ["/products/elitnaya-01.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17130f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "РодКод",
    url: siteUrl,
    telephone: "+7-901-316-87-26",
    sameAs: ["https://vk.com/rodkod"],
    knowsAbout: [
      "родословные книги",
      "генеалогия",
      "поиск предков",
      "родословное древо",
      "история семьи",
    ],
  };

  return (
    <html lang="ru">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ChatWidget />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
