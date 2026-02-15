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
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
