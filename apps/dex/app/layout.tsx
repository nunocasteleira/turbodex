import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Turbodex",
  description: "Pokédex, powered by Turborepo and Next.js 13",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
