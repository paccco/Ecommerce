import { useState, useEffect } from 'react';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonExternoProps {
  onAddToCart?: (item: { id: string; name: string; price: number; imageUrl: string }) => void;
}

export default function PokemonExterno({ onAddToCart }: PokemonExternoProps) {
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

  const handleAddToCart = () => {
    if (pokemon && onAddToCart) {
      onAddToCart({
        id: `ext-${pokemon.name}`,
        name: pokemon.name.toUpperCase() + ' (Salvaje)',
        price: 49.99,
        imageUrl: pokemon.sprites.front_default
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-xs border border-gray-100">
      <h3 className="text-xl font-bold mb-4 font-montserrat text-center">Pokémon Salvaje (PokeAPI)</h3>
      {loading ? (
        <p className="text-gray-500 h-32 flex items-center">Buscando en la hierba alta...</p>
      ) : pokemon ? (
        <div className="flex flex-col items-center">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32" style={{ imageRendering: 'pixelated' }} />
          <p className="capitalize font-semibold text-lg mt-2 text-indigo-600 font-montserrat">{pokemon.name}</p>
          <p className="text-sm font-bold text-gray-500 font-montserrat">$49.99</p>
        </div>
      ) : (
        <p>No se encontró nada</p>
      )}
      
      <div className="flex flex-col gap-2 w-full mt-4">
        <button 
          onClick={fetchRandomPokemon} 
          className="bg-red-550 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-xl transition cursor-pointer text-sm uppercase tracking-wider"
        >
          Lanzar Pokéball 🔴
        </button>
        
        {pokemon && (
          <button 
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition cursor-pointer text-sm uppercase tracking-wider flex items-center justify-center gap-2"
          >
            Añadir 🛒
          </button>
        )}
      </div>
    </div>
  );
}
