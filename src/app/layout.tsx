import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FireLink Zambia",
  description: "ICT-enabled fire disaster reporting and response management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
