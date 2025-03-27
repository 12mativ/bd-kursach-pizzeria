import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header/header";
import StoreProvider from "../components/providers/redux-store-provider";

export const metadata: Metadata = {
  title: "Pizzeria",
  description:
    "Pizzeria delicious pizza pepperoni italia",
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
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
