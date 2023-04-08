import { NextResponse } from 'next/server';
import { PokemonAssembler } from "@/assemblers/pokemon-assembler";
import { listQuerySchema } from "@/schemas/api/list-query";

const BASE_URL = "https://pokeapi.co/api/v2";
const SERVICE_URL = "/pokemon";

export async function GET(request: Request){
  const { searchParams } = new URL(request.url);
  const query = {
     page: searchParams.get('page'),
     size: searchParams.get('size'),
  }
  const parsed = listQuerySchema.parse(query);
  const { page, size } = parsed;

  let pokemon: Awaited<ReturnType<typeof getPokemonListAndDetails>>;
  try {
    pokemon = await getPokemonListAndDetails(page, size);
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json(pokemon);
};

async function getPokemonList(
  page = "0",
  size = "20"
): Promise<NamedAPIResourceList<NamedAPIResource>> {
  const url = new URL(BASE_URL + SERVICE_URL);
  url.searchParams.set("limit", size);
  const offset = +size * (+page - 1);
  url.searchParams.set("offset", String(offset));

  const res = await fetch(url);
  return res.json();
}

async function getPokemonFromUrl(url: string): Promise<Pokemon> {
  const res = await fetch(url);
  return res.json();
}

async function getPokemonListAndDetails(
  page = "0",
  size = "20"
): Promise<NamedAPIResourceList<ShortPokemon>> {
  const pokemonList = await getPokemonList(page, size);

  const pokemonDetailList = await Promise.all(
    pokemonList.results.map(async (pokemon) =>
      PokemonAssembler.fromFullPokemon(await getPokemonFromUrl(pokemon.url))
    )
  );

  return { ...pokemonList, results: pokemonDetailList };
}