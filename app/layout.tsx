import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Jost, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const notoTelugu = Noto_Sans_Telugu({
  variable: "--font-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kunal & Pravalika — Wedding Invitation",
  description:
    "Together with their families, Kunal & Pravalika invite you to celebrate — 21–23 August 2026, NV Convention Hall, Hanamkonda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${jost.variable} ${notoTelugu.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-ivory text-ink font-body">
        {children}
      </body>
    </html>
  );
}
