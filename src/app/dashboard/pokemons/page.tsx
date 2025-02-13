import { PokemonsResponse } from '@/app/pokemons/interfaces/pokemons-response';
import { SimplePokemon } from '@/app/pokemons/interfaces/simple-pokemon';
import Image from 'next/image';

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((response) => response.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }));

  return pokemons;
};

// Async functional component -> Next lo manejara como si fuera sync para el cliente
export default async function PokemonsPage() {
  const pokemons = await getPokemons(151);
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-10 items-center justify-center">
        {/* TODO: Return implicito */}
        {pokemons.map((pokemon) => (
          <Image
            key={pokemon.id}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            width={100}
            height={100}
            alt={pokemon.name}
          />
        ))}
      </div>
    </div>
  );
}
