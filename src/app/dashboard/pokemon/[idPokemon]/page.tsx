import { Pokemon } from '@/pokemons/interfaces/pokemon';
import { Metadata } from 'next';

interface Props {
  params: { idPokemon: string };
}

const getPokemon = async (idPokemon: string): Promise<Pokemon> => {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${idPokemon}`,
    {
      cache: 'force-cache', // TODO: Cannot find name 'await'.
    }
  ).then((response) => response.json());
  console.log(`Se cargó: ${pokemon.name}`);
  return pokemon;
};

export default async function PokemonPage({ params }: Props) {
  // Necesita el awit por que no llega el valor siempre
  const { idPokemon } = await params;
  const pokemon = await getPokemon(idPokemon);
  // console.log({ params });
  return (
    <div>
      <h1>Pokemon {idPokemon}</h1>
      <div>{JSON.stringify(pokemon)}</div>
    </div>
  );
}
