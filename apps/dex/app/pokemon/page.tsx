import { redirect } from "next/navigation";
import { PokemonCard } from "../../src/components/pokemon-card";
import { PokemonService } from "../../src/services/pokemon-service";

const DEFAULT_PARAMETERS = {
  defaultPage: 1,
  defaultSize: 20,
};

export function navigateToPageWithSize(page: number, size: number) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("size", String(size));

  return `?${params.toString()}`;
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
  searchParams: { page, size },
}: {
  searchParams: { page: number; size: number };
}) {
  if (!page || !size) {
    redirect(
      navigateToPageWithSize(
        DEFAULT_PARAMETERS.defaultPage,
        DEFAULT_PARAMETERS.defaultSize
      )
    );
  }
  const { pokemonList } = await getPokemonList(page, size);
  return (
    <section className="flex max-h-full w-full flex-col">
      <div className="h-full flex-[1_1_100%] overflow-auto">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-2 sm:px-4 md:grid-cols-3 lg:grid-cols-4">
          {pokemonList.results.map((pokemon) => (
            <div key={pokemon.id}>
              <h3>{pokemon.name}</h3>
              <p>{pokemon.id}</p>
            </div>
            // <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>
      {/* <Pagination
        count={pokemonList.count}
        size={size}
        first={getFirst()}
        last={getLast()}
        currentPage={page}
        onNextPage={onNextPage}
        onPage={onPage}
        onPreviousPage={onPreviousPage}
        className="mx-auto w-full max-w-7xl flex-none bg-slate-50"
      /> */}
    </section>
  );
}
