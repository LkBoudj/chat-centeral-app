import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/providers";
import { cn } from "@/lib/utlis";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Central",
  description: "Chat Central",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
