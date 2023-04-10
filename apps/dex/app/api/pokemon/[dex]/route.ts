import { NextResponse } from 'next/server';
import { dexQuerySchema } from "@/schemas/api/dex-query";

const BASE_URL = "https://pokeapi.co/api/v2";
const SERVICE_URL = "/pokemon";
const SPECIES_URL = "/pokemon-species";

export async function GET(_request: Request, {params} : {params: {dex: string}}){
  const parsed = dexQuerySchema.parse(params);
  const { dex } = parsed;

  let pokemon: Awaited<ReturnType<typeof getPokemon>>;
  let species: Awaited<ReturnType<typeof getPokemonSpecies>>;

  try {
    pokemon = await getPokemon(dex);
    species = await getPokemonSpecies(pokemon.species.name);
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ ...pokemon, ...species });
}

async function getPokemon(dex: string): Promise<Pokemon> {
  const url = new URL(BASE_URL + SERVICE_URL + "/" + dex);
  const res = await fetch(url);
  return res.json();
}

async function getPokemonSpecies(dex: string): Promise<PokemonSpecies> {
  const url = new URL(BASE_URL + SPECIES_URL + "/" + dex);
  const res = await fetch(url);
  return res.json();
}
