import "./globals.css";
import type { Metadata } from "next";
import { Inter, Open_Sans, Cairo } from "next/font/google";
import Provider from "@/components/providers";
import { cn } from "@/lib/utlis";
const cairo = Cairo({ subsets: ["latin"] });
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
      <body className={cn(cairo.className)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
