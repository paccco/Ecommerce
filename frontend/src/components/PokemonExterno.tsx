import { useState, useEffect } from 'react';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function PokemonExterno() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    try {
      const randomId = Math.floor(Math.random() * 151) + 1; // Gen 1
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await res.json();
      setPokemon(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-xs">
      <h3 className="text-xl font-bold mb-4 font-montserrat text-center">Pokémon Salvaje (PokeAPI)</h3>
      {loading ? (
        <p className="text-gray-500 h-32 flex items-center">Buscando en la hierba alta...</p>
      ) : pokemon ? (
        <div className="flex flex-col items-center">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32" style={{ imageRendering: 'pixelated' }} />
          <p className="capitalize font-medium text-lg mt-2 text-gray-700">{pokemon.name}</p>
        </div>
      ) : (
        <p>No se encontró nada</p>
      )}
      <button 
        onClick={fetchRandomPokemon} 
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition cursor-pointer"
      >
        Lanzar Pokéball 🔴
      </button>
    </div>
  );
}
