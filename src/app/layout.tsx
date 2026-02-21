import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nook | Coffee & Tea Specialty",
  description: "La tienda Headless basada en filosofía Zen. Especialidad en Té y Café.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FAF9F6] text-[#2C352D] flex flex-col min-h-screen pt-20`}
      >
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
