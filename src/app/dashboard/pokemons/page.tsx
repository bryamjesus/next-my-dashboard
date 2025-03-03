import { PokemonGrid } from '@/pokemons/components/PokemonGrid';
import { PokemonsResponse } from '@/pokemons/interfaces/pokemons-response';
import { SimplePokemon } from '@/pokemons/interfaces/simple-pokemon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '151 Pokemons',
  description: '151 Pokemons',
};

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((response) => response.json());

  const pokemons = data.results.map((pokemon) => ({
    idPokemon: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }));

  // TODO: Error de prueba para llamar
  // error.js
  // throw new Error('Este es un error de lo que no deberia suceder');

  return pokemons;
};

// TODO: Async functional component -> Next lo manejara como si fuera sync para el cliente
export default async function PokemonsPage() {
  const pokemons = await getPokemons(151);
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Listado de Pokemons <small className="text-blue-700">estático</small>
      </span>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
