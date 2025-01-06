import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Providers from "./components/Providers";
export const metadata: Metadata = {
  title: "D&D Companion",
  description: "Your digital companion for all things D&D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
