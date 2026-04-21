import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Creative Intelligence Dashboard",
  description: "Irreverent Marketing — AI-powered creative pipeline dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-950 text-gray-100 antialiased">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8" data-testid="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
