const RESOURCE = "pokemon";

export function navigateToPageWithSize(page: number, size: number) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("size", String(size));

  return `${RESOURCE}?${params.toString()}`;
}

export function usePokemonListPagination({
  pokemonList,
  currentPage,
  routerSize,
  size,
}: {
  pokemonList: NamedAPIResourceList<ShortPokemon>;
  currentPage: number;
  routerSize: number;
  size: number;
}) {
  function onPage(newPage: number): string {
    return navigateToPageWithSize(newPage + 1, Number(routerSize) ?? size ?? 20)
  }

  function onNextPage(): string {
    return pokemonList?.next ?
        navigateToPageWithSize(
          currentPage + 1,
          Number(routerSize) ?? size ?? 20
      ) : navigateToPageWithSize(
        currentPage,
        Number(routerSize) ?? size ?? 20
    );
  }

  function onPreviousPage(): string {
    return pokemonList?.previous ?
        navigateToPageWithSize(
          currentPage - 1,
          Number(routerSize) ?? size ?? 20
      ) :  navigateToPageWithSize(
        currentPage,
        Number(routerSize) ?? size ?? 20
    );
  }

  function getFirst() {
    return pokemonList ? (currentPage - 1) * size : 0;
  }

  function getLast() {
    return pokemonList ? (currentPage - 1) * size + pokemonList.results.length : 0;
  }

  return { getFirst, getLast, onPage, onNextPage, onPreviousPage };
}
