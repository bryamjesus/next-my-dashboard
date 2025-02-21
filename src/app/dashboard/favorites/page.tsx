import { PokemonGrid } from '@/pokemons/components/PokemonGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Favoritos',
};

// TODO: Async functional component -> Next lo manejara como si fuera sync para el cliente
export default async function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Pokemons Favoritos <small className="text-blue-700">Global State</small>
      </span>
      <PokemonGrid pokemons={[]} />
    </div>
  );
}
