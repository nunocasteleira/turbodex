import { PokemonAssembler } from "@/assemblers/pokemon-assembler";
import { ValidationError } from "@/models/validation-error";
import { getBaseUrl } from "./generic-service";

const SERVICE_URL = "api/pokemon";

export type PokemonListResponse = {
  shortPokemon: NamedAPIResourceList<ShortPokemon>;
  errorCode: number | null;
};

export type PokemonResponse = {
  pokemon: DetailedPokemon & ValidationError;
  errorCode: number | null;
};

export class PokemonService {
  static async getPokemonList(
    page = 1,
    size = 20
  ): Promise<PokemonListResponse> {
    const url = new URL(SERVICE_URL, getBaseUrl());
    url.searchParams.set("page", String(page));
    url.searchParams.set("size", String(size));
    console.log(url.toString());
    
    const res = await fetch(url);
    
    const errorCode = res.ok ? null : res.status;
    const json = await res.json()
    return { errorCode, shortPokemon: json };
  }

  static async getPokemon(dex: string): Promise<PokemonResponse> {
    const url = new URL(SERVICE_URL + "/" + dex, getBaseUrl());
    const res = await fetch(url);
    const errorCode = res.ok ? null : res.status;
    return { errorCode, pokemon: await res.json() };
  }

  static async getPokemonFromList(list: string[]): Promise<ShortPokemon[]> {
    const result = list.map(async (dex) => {
      const url = new URL(SERVICE_URL + "/" + dex, getBaseUrl());
      const res = await fetch(url);
      return PokemonAssembler.fromFullPokemon(await res.json());
    });

    return Promise.all(result);
  }
}
