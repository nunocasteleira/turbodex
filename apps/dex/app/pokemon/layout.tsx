import { Header } from "./header";

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      <Header />
      <main className="flex-[1_1_100%] overflow-hidden">{children}</main>
      {/* <FavoritesBar /> */}
    </div>
  );
}
