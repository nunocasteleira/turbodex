"use client";

import Image from "next/image";
import clsx from "clsx";
import PokeBall from "public/images/PokeBall.svg";
import { useGetPokemonSprite } from "./queries/use-get-pokemon-sprite";

type Props = {
  pokemonName: string;
  spriteUrl: string;
  lighten?: boolean;
};

const PokemonSprite: React.FC<Props> = ({
  pokemonName,
  spriteUrl,
  lighten = false,
}) => {
  const { sprite, spriteLoading, spriteError } = useGetPokemonSprite(spriteUrl);

  if (spriteLoading || spriteError) {
    return <PokeBall className="mix-blend-plus-lighter" />;
  }

  if (!sprite) {
    return null;
  }

  return (
    <Image
      src={sprite}
      alt={pokemonName}
      fill
      style={{ margin: "unset" }}
      className={clsx(lighten && "mix-blend-darken")}
    />
  );
};

export { PokemonSprite };
