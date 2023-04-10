import { Pagination, PaginationProps } from "ui";
import { usePokemonListPagination } from "./hooks";

export default function PokemonListPagination({
  count,
  currentPage,
  pokemonList,
  size,
}: Pick<PaginationProps, "count" | "currentPage" | "size"> & {
  pokemonList: NamedAPIResourceList<ShortPokemon>;
}) {
  const { getFirst, getLast, onNextPage, onPage, onPreviousPage } =
    usePokemonListPagination({
      pokemonList,
      currentPage,
      routerSize: size,
      size,
    });

  console.log("on component", {
    currentPage,
    routerSize: size,
    size,
    first: getFirst(),
    last: getLast(),
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
