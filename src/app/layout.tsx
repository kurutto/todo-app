import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import { NextAuthProvider } from "@/lib/next-auth/provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <NextAuthProvider>
          <div className="w-5/6 mx-auto mt-12 mb-5">
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
