import { Pagination, PaginationProps } from "ui";
import { usePokemonListPagination } from "./hooks";

function PokemonListPagination({
  count,
  currentPage,
  pokemonList,
  size,
  navigate,
}: Pick<PaginationProps, "count" | "currentPage" | "size"> & {
  pokemonList: NamedAPIResourceList<ShortPokemon>;
  navigate: (page: number, size: number) => string;
}) {
  const { getFirst, getLast, onNextPage, onPage, onPreviousPage } =
    usePokemonListPagination({
      pokemonList,
      currentPage,
      routerSize: size,
      size,
      navigate,
    });

  return (
    <Pagination
      withLinks
      count={count}
      size={size}
      first={getFirst()}
      last={getLast()}
      currentPage={currentPage}
      onNextPage={onNextPage()}
      onPage={onPage}
      onPreviousPage={onPreviousPage()}
      className="mx-auto w-full max-w-7xl flex-none bg-slate-50"
    />
  );
}

export { PokemonListPagination };
