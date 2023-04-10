const RESOURCE = "pokemon";

export function navigateToPageWithSize(page: number, size: number) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("size", String(size));

  return `${RESOURCE}?${params.toString()}`;
}