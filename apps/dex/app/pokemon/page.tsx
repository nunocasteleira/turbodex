import { redirect } from "next/navigation";
import { PokemonCard } from "../../src/components/pokemon-card";
import { PokemonService } from "../../src/services/pokemon-service";
import PokemonListPagination from "./pokemon-list-pagination";
import { navigateToPageWithSize } from "./hooks";
import { Suspense } from "react";

const DEFAULT_PARAMETERS = {
  defaultPage: 1,
  defaultSize: 20,
};

async function redirectIfNoParams(page: number, size: number) {
  if (!page || !size) {
    redirect(
      navigateToPageWithSize(
        DEFAULT_PARAMETERS.defaultPage,
        DEFAULT_PARAMETERS.defaultSize
      )
    );
  }
}

async function getPokemonList(page: number, size: number) {
  const { errorCode, shortPokemon: pokemonList } =
    await PokemonService.getPokemonList(page, size);

  return {
    errorCode,
    page: +page,
    pokemonList,
    size: +size,
  };
}

export default async function Pokemon({
  searchParams,
}: {
  searchParams: { page: string; size: string };
}) {
  const page = Number(searchParams.page);
  const size = Number(searchParams.size);

  await redirectIfNoParams(page, size);

  const { pokemonList } = await getPokemonList(page, size);

  return (
    <section className="flex max-h-full w-full flex-col">
      <div className="h-full flex-[1_1_100%] overflow-auto">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-2 sm:px-4 md:grid-cols-3 lg:grid-cols-4">
          {pokemonList.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <PokemonListPagination
          count={pokemonList.count}
          size={size}
          currentPage={page}
          pokemonList={pokemonList}
        />
      </Suspense>
    </section>
  );
}
