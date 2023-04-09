import { useRouter } from "next/navigation";

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
  const router = useRouter();

  function onPage(newPage: number) {
    pokemonList?.next &&
      router.push(
        navigateToPageWithSize(newPage + 1, Number(routerSize) ?? size ?? 20)
      );
  }

  function onNextPage() {
    pokemonList?.next &&
      router.push(
        navigateToPageWithSize(
          currentPage + 1,
          Number(routerSize) ?? size ?? 20
        )
      );
  }

  function onPreviousPage() {
    pokemonList?.previous &&
      router.push(
        navigateToPageWithSize(
          currentPage - 1,
          Number(routerSize) ?? size ?? 20
        )
      );
  }

  function getFirst() {
    return pokemonList ? (currentPage - 1) * pokemonList.results.length + 1 : 0;
  }

  function getLast() {
    return pokemonList ? currentPage * pokemonList.results.length : 0;
  }

  return { getFirst, getLast, onPage, onNextPage, onPreviousPage };
}
