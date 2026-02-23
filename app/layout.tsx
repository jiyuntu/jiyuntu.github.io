import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ji-Yun Tu",
  description: "Ji-Yun Tu's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100..700&display=swap"
          rel="stylesheet">
        </link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
