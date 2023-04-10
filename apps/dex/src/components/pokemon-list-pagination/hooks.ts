export function usePokemonListPagination({
  pokemonList,
  currentPage,
  routerSize,
  size,
  navigate,
}: {
  pokemonList: NamedAPIResourceList<ShortPokemon>;
  currentPage: number;
  routerSize: number;
  size: number;
  navigate: (page: number, size: number) => string;
}) {
  function onPage(newPage: number): string {
    return navigate(newPage + 1, Number(routerSize) ?? size ?? 20);
  }

  function onNextPage(): string {
    return pokemonList?.next
      ? navigate(currentPage + 1, Number(routerSize) ?? size ?? 20)
      : navigate(currentPage, Number(routerSize) ?? size ?? 20);
  }

  function onPreviousPage(): string {
    return pokemonList?.previous
      ? navigate(currentPage - 1, Number(routerSize) ?? size ?? 20)
      : navigate(currentPage, Number(routerSize) ?? size ?? 20);
  }

  function getFirst() {
    return pokemonList ? (currentPage - 1) * size : 0;
  }

  function getLast() {
    return pokemonList
      ? (currentPage - 1) * size + pokemonList.results.length
      : 0;
  }

  return { getFirst, getLast, onPage, onNextPage, onPreviousPage };
}
