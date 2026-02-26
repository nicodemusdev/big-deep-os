import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Big Deep OS",
  description: "Interactive marketing planning dashboard for Big Deep",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-neutral-900">
        {children}
      </body>
    </html>
  );
}
