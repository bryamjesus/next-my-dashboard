import { Pokemon } from '@/pokemons/interfaces/pokemon';
// import { Metadata, ResolvingMetadata } from 'next';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// TODO: Solo se ejecutara en Build Time
export async function generateStaticParams() {
  const statis152Pokemons = Array.from(
    { length: 152 },
    (valor, index) => index + 1
  );
  return statis152Pokemons.map((id) => ({ idPokemon: id.toString() }));
}

// interface Props {
//   params: { idPokemon: string };
// }

type Props = {
  params: Promise<{ idPokemon: string }>;
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getPokemon = async (idPokemon: string): Promise<Pokemon> => {
  try {
    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}`,
      {
        cache: 'force-cache', // TODO: Cannot find name 'await'.
        next: {
          revalidate: 86400, // TODO: Cada dia
        },
      }
    ).then((response) => response.json());
    console.log(`Se cargó: ${pokemon.name}`);
    return pokemon;
  } catch (error) {
    console.log(error);
    // TODO: aca se esta llamando al notFound de next
    notFound();
  }
};

// TODO: Metadata dinámica
// TODO: se actualizo los parametros de la funcion
// para que sean de tipo Readonly
// ✖️ LINK SOLUCION: https://github.com/vercel/next.js/issues/74406
// ✖️ LINK SOLUCION 2: https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change
// ✅ LINK SOLUCION 3: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({
  params,
}: Props): // { params, searchParams }: Props,
// parent: ResolvingMetadata
Promise<Metadata> {
  const { idPokemon } = await params; // Promise
  // const { idPokemon } = props.params;
  if (!idPokemon) {
    return {
      title: 'Error',
      description: 'ID de Pokémon no válido',
    };
  }
  try {
    const { id, name } = await getPokemon(idPokemon);
    return {
      title: `#${id} - ${name}`,
      description: `Información del Pokémon ${name}`,
    };
  } catch (error) {
    console.log(error);
    return {
      title: 'Error',
      description: 'No se pudo cargar la información del Pokémon',
    };
  }
}

export default async function PokemonPage({ params }: Props) {
  // TODO: Necesita el awit por que no llega el valor siempre
  const { idPokemon } = await params;
  const pokemon = await getPokemon(idPokemon);

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ''}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />

            <div className="flex flex-wrap">
              {pokemon.moves.map((move) => (
                <p key={move.move.name} className="mr-2 capitalize">
                  {move.move.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {pokemon.types.map((type) => (
                <p key={type.slot} className="mr-2 capitalize">
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {pokemon.weight}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
