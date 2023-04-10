import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Turbodex",
  description: "Pokédex, powered by Turborepo and Next.js 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
