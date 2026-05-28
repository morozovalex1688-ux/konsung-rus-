import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Консунг Рус | Эксклюзивный дистрибьютор Sejoy в России",
  description: "Профессиональные глюкометры Sejoy и тест-полоски. Официальный поставщик для аптек, дистрибьюторов и медицинских учреждений. Точная диагностика уровня сахара в крови.",
  icons: {
    icon: "/images/logo.webp",
  },
  openGraph: {
    title: "Консунг Рус | Эксклюзивный дистрибьютор Sejoy в России",
    description: "Профессиональные глюкометры Sejoy и тест-полоски. Официальный поставщик для аптек, дистрибьюторов и медицинских учреждений.",
    images: [{ url: "/images/hero-main.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased scroll-smooth overflow-x-hidden">
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 overflow-x-hidden">
        {children}

        {/* Basic JSON-LD for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ООО «Консунг Рус»",
              "url": "https://konsungrus.ru",
              "logo": "https://konsungrus.ru/images/logo.webp",
              "description": "Эксклюзивный дистрибьютор медицинских изделий Sejoy в России",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Санкт-Петербург",
                "streetAddress": "наб. Обводного канала, д. 118А, литера Х, офис 306",
                "postalCode": "190005",
                "addressCountry": "RU"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+7-800-333-19-23",
                "contactType": "customer service",
                "email": "info@konsungrus.ru"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
