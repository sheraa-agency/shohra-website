import type { Metadata, Viewport } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, Sora } from "next/font/google";
import "./globals.css";

/* Brand typography — Alexandria for Arabic display, IBM Plex Sans Arabic for body,
   Sora for Latin/English display (matching the official site's Sora usage) */
const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-alexandria",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "شُهرة | SHOHRA — وكالة تسويق رقمي في جدة · Digital Growth Agency",
  description:
    "مؤسسة شُهرة التسويقية — وكالة تسويق رقمي سعودية في جدة: سيو، إدارة الحملات الإعلانية، تصميم وتطوير المتاجر الإلكترونية، UI/UX، سوشيال ميديا، وهوية بصرية. شركاء نمو لأكثر من 150 متجراً في المملكة والخليج. SHOHRA is a Saudi digital marketing & e-commerce growth agency based in Jeddah.",
  keywords: [
    "شهره التسويقية",
    "وكالة تسويق في جدة",
    "تسويق إلكتروني السعودية",
    "SHOHRA",
    "digital marketing agency Jeddah",
    "Saudi e-commerce agency",
    "تصميم متاجر سلة",
    "إدارة حملات إعلانية",
    "SEO السعودية",
  ],
  authors: [{ name: "SHOHRA Marketing Agency" }],
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/touch-icon.png",
  },
  openGraph: {
    title: "SHOHRA | شُهرة — وكالة تسويق رقمي متكاملة · جدة",
    description:
      "نصنع حضوراً رقمياً يليق بطموح علامتك التجارية. شركاء نمو لأكثر من 150 متجراً إلكترونياً في المملكة والخليج.",
    images: [
      {
        url: "https://www.shohrah.com/assets/images/shohrah/home-1.png",
        width: 1030,
        height: 880,
        alt: "SHOHRA Marketing Agency",
      },
    ],
    locale: "ar_SA",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHOHRA | شُهرة — وكالة تسويق رقمي متكاملة",
    description:
      "شركاء نمو رقمي لأكثر من 150 متجراً في السعودية والخليج. Strategic Digital Growth. Creative Excellence. Measurable Results.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06131a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Verified from the Ministry of Commerce CR certificate & Saudi Business
     Center e-commerce authentication (both served under /assets/docs/). */
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "مؤسسة شهرة المستقبل للتسويق الرقمي",
    alternateName: "SHOHRA Marketing Agency",
    url: "https://www.shohrah.com",
    logo: "https://www.shohrah.com/assets/images/shohrah/logo.png",
    address: { "@type": "PostalAddress", addressLocality: "Jeddah", addressCountry: "SA" },
    identifier: [
      { "@type": "PropertyValue", name: "Commercial Registration Number", value: "4030507737" },
      { "@type": "PropertyValue", name: "Unified National Number", value: "7034153762" },
    ],
    sameAs: ["https://linktr.ee/shohramarketing1", "https://www.instagram.com/shohramarketing1/"],
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${alexandria.variable} ${plexArabic.variable} ${sora.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
