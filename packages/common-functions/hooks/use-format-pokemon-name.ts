import { formatPokemonName } from "../format";

function useFormatPokemonName(name: string | undefined) {
  return formatPokemonName(name)
}

export { useFormatPokemonName };
