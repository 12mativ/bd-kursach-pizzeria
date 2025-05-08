import { CartProvider } from "@/components/providers/cart-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import type { Metadata } from "next";
import StoreProvider from "../components/providers/redux-store-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

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
    <html lang="ru">
      <body className="bg-neutral-900 text-white">
        <StoreProvider>
          <CartProvider>
            <ModalProvider />
            {children}
            <Toaster richColors />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
