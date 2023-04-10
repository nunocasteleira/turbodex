import { capitalize } from "../string";

function formatPokemonName(name: string | undefined) {
  const formattedPokemonName = name ? capitalize(name) : "";
  return { formattedPokemonName };
}

export { formatPokemonName };
