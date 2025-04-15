import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header/header";
import StoreProvider from "../components/providers/redux-store-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { CartProvider } from "@/components/providers/cart-provider";

export const metadata: Metadata = {
  title: "Пиццерия",
  description: "Pizzeria delicious pizza pepperoni italia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white">
        <StoreProvider>
          <CartProvider>
            <ModalProvider />
            {children}
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
