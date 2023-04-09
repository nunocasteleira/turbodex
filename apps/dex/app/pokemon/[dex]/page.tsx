import React from "react";
import Link from "next/link";
// import Error from "next/error";
import clsx from "clsx";
import {
  capitalize,
  useFormatDexNumber,
  useFormatPokemonName,
} from "common-functions";
import { Button, Pill } from "ui";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
// import { FavoriteIcon } from "@/components/favorite-icon";
import { PokemonFlavorGallery } from "@/components/pokemon-flavor-gallery";
import { SpriteGallery } from "@/components/sprite-gallery";
import { TypePills } from "@/components/type-pills";
// import { usePokemonStorage } from "@/context/pokemon-storage/pokemon-storage-context";
import { PokemonService } from "@/services/pokemon-service";
import { usePokemonDetailPagination } from "./hooks";

type Props = {
  count: number;
  errorCode: number | null;
  pokemon: Awaited<DetailedPokemon>;
};

async function getPokemonDetails(dex: string): Promise<Props> {
  const { errorCode: pokemonErrorCode, pokemon } =
    await PokemonService.getPokemon(dex);
  const {
    errorCode: pokemonListErrorCode,
    shortPokemon: { count },
  } = await PokemonService.getPokemonList();

  const errorCode: number | null = pokemonErrorCode || pokemonListErrorCode;

  return {
    errorCode,
    pokemon,
    count,
  };
}

async function DexPage({ params: { dex } }: { params: { dex: string } }) {
  const { count, errorCode, pokemon } = await getPokemonDetails(dex);
  const { formattedDexNumber } = useFormatDexNumber(pokemon.id);
  const { formattedPokemonName } = useFormatPokemonName(pokemon.name);
  const { hasNextPage, hasPreviousPage, onNextPage, onPreviousPage } =
    usePokemonDetailPagination({
      id: pokemon.id,
      count,
    });
  // const router = useRouter();
  // const { favoritePokemon, toggleFavoritePokemon } = usePokemonStorage();

  return (
    <div className="max-h-full overflow-auto">
      <div className="mx-auto grid max-h-full max-w-7xl grid-cols-1 gap-y-2 overflow-auto lg:grid-cols-3">
        <section className="col-span-2 mx-auto w-full p-4 lg:col-span-3">
          <Link href={"/pokemon"}>&larr; Back to List</Link>
        </section>
        <section className="mx-auto w-full">
          <SpriteGallery pokemon={pokemon} />
        </section>
        <section className="col-span-2 flex w-full flex-col gap-4 p-6">
          {/* <button
            className="flex h-8 w-full justify-end px-10"
            onClick={() => toggleFavoritePokemon(pokemon.id)}
          >
            <FavoriteIcon
              className="w-8"
              favoritePokemon={favoritePokemon}
              id={pokemon.id}
            />
          </button> */}
          <div className="mb-2 flex flex-row items-center justify-between gap-2">
            <PreviousPokemon
              hasPreviousPage={hasPreviousPage()}
              onPreviousPage={onPreviousPage()}
            />
            <div className="pokedex-title-gradient flex h-full w-full flex-row items-center justify-around rounded-lg">
              <span>No. {formattedDexNumber}</span>
              <h2 className="text-slate-100">{formattedPokemonName}</h2>
            </div>
            <NextPokemon
              hasNextPage={hasNextPage()}
              onNextPage={onNextPage()}
            />
          </div>

          <div className="mx-4 flex flex-col items-center justify-between px-6">
            <DexTableLine
              Left={({ className }) => <span className={className}>Type</span>}
              Right={({ className }) => (
                <ul className={className}>
                  <TypePills
                    types={pokemon.types.map((type) => type.type.name)}
                  />
                </ul>
              )}
            />

            <DexTableLine
              Left={({ className }) => (
                <span className={className}>Height</span>
              )}
              Right={({ className }) => (
                <span className={className}>{pokemon.height}</span>
              )}
            />

            <DexTableLine
              Left={({ className }) => (
                <span className={className}>Weight</span>
              )}
              Right={({ className }) => (
                <span className={className}>{pokemon.weight}</span>
              )}
            />

            <DexTableLine
              Left={({ className }) => (
                <span className={className}>Abilities</span>
              )}
              Right={({ className }) => (
                <ul className={clsx("gap-2", className)}>
                  {pokemon.abilities.map((ability) => (
                    <Pill key={ability.ability.name}>
                      {capitalize(ability.ability.name)}
                    </Pill>
                  ))}
                </ul>
              )}
            />
            <PokemonFlavorGallery species={pokemon} />
          </div>
        </section>
      </div>
    </div>
  );
}

type LineProps = {
  className: string;
};

type DexTableLineProps = {
  Left: React.ComponentType<LineProps>;
  Right: React.ComponentType<LineProps>;
};

function DexTableLine({ Left, Right }: DexTableLineProps) {
  return (
    <div className="flex w-full flex-row">
      <Left className="w-full bg-slate-300 p-4 text-center" />
      <Right className="flex w-full flex-row p-4" />
    </div>
  );
}

function PreviousPokemon({
  hasPreviousPage,
  onPreviousPage,
}: {
  hasPreviousPage: boolean;
  onPreviousPage: string;
}) {
  return hasPreviousPage ? (
    <Link href={onPreviousPage}>
      <ArrowLeftCircleIcon className={clsx("h-8 w-8", "text-orange-400")} />
    </Link>
  ) : (
    <ArrowLeftCircleIcon className={clsx("h-8 w-8", "text-orange-400/20")} />
  );
}

function NextPokemon({
  hasNextPage,
  onNextPage,
}: {
  hasNextPage: boolean;
  onNextPage: string;
}) {
  return hasNextPage ? (
    <Link href={onNextPage}>
      <ArrowRightCircleIcon className={clsx("h-8 w-8", "text-slate-900")} />
    </Link>
  ) : (
    <ArrowRightCircleIcon className={clsx("h-8 w-8", "text-slate-900/20")} />
  );
}

export default DexPage;
