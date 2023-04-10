"use client";

import { PokemonStorageProvider } from "@/context/pokemon-storage/pokemon-storage-context";
import { CookiesProvider } from "react-cookie";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <PokemonStorageProvider>{children}</PokemonStorageProvider>
    </CookiesProvider>
  );
}

export { Providers };
