"use client";

import React, { ReactEventHandler } from "react";
import { usePokemonStorage } from "@/context/pokemon-storage/pokemon-storage-context";
import { FavoriteIcon } from "../favorite-icon";
import clsx from "clsx";

type Props = {
  id: ShortPokemon["id"];
  className?: string;
};

function FavoritePokemon({ id, className }: Props) {
  const { favoritePokemon, toggleFavoritePokemon } = usePokemonStorage();

  const handleFavorite: ReactEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    toggleFavoritePokemon(id);
  };

  return (
    <button onClick={handleFavorite} className={clsx("h-8 w-8", className)}>
      <FavoriteIcon
        favoritePokemon={favoritePokemon}
        id={id}
        className="h-8 w-8"
      />
    </button>
  );
}

export { FavoritePokemon };
