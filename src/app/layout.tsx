// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cutoffPro = localFont({
  src: "../fonts/Cutoff_Pro.otf",  // relatif dari src/app/layout.tsx
  display: "swap",
  variable: "--font-cutoff-pro",
});
export const metadata: Metadata = {
  title: "BatikLens",
  description: "Kenali dan Ciptakan Karya Batik Pilihanmu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cutoffPro.variable} font-cutoff antialiased`}>
        {children}
      </body>
    </html>
  );
}
