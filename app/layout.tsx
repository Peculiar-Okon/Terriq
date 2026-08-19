import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TerrIQ",
  description:
    "Environmental intelligence for better decisions about where you live.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
