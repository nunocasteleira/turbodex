import { getBaseUrl } from "@/services/generic-service";
import { Header } from "./header";
import { FavoritesBar } from "@/components/favorites-bar";

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      <Header />
      <pre>{getBaseUrl()}</pre>
      <main className="flex-[1_1_100%] overflow-hidden">{children}</main>
      <FavoritesBar />
    </div>
  );
}
