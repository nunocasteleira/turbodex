const BASE_PATH = '/pokemon/'
export function usePokemonDetailPagination({
  id,
  count,
}: {
  id: number;
  count: number;
}) {
  function hasPreviousPage() {
    return id > 1;
  }
  function hasNextPage() {
    return id < count;
  }

  function onPreviousPage() {
    return hasPreviousPage() ? BASE_PATH + String(id - 1) : BASE_PATH + String(id);
  }

  function onNextPage() {
    return hasNextPage() ? BASE_PATH + String(id + 1) : BASE_PATH + String(id);
  }

  return { hasPreviousPage, hasNextPage, onPreviousPage, onNextPage };
}
