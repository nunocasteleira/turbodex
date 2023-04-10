import { capitalize } from "../string";
import { formatDexNumber } from "./format-dex-number";

function formatPokemonDetailPageName(name: string | undefined, id: number | undefined) {
  return name && id ? capitalize(name) + " " + formatDexNumber(id) + " | Turbodex" : "Turbodex"
}

export { formatPokemonDetailPageName };
