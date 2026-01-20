import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WIN - BizBuilders AI",
  description: "Automation is everywhere. Intelligence is rare. WIN turns your existing tools into a learning workflow.",
  openGraph: {
    title: "WIN - BizBuilders AI",
    description: "Automation is everywhere. Intelligence is rare.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/visuals/icon.png" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
