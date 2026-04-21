import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Irreverent Marketing — Shop",
  description:
    "No-BS marketing resources for performance marketers who want results, not participation trophies.",
  openGraph: {
    title: "Irreverent Marketing — Shop",
    description:
      "Two resources built for marketers who are done playing it safe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#080808] text-white">{children}</body>
    </html>
  );
}
