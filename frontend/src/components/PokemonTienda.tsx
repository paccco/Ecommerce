import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

interface PokemonTiendaProps {
  onAddToCart?: (item: { id: string; name: string; price: number; imageUrl: string }) => void;
}

export default function PokemonTienda({ onAddToCart }: PokemonTiendaProps) {
  // Conectar con nuestro backend en Express
  const { data, error, isLoading, mutate } = useSWR('http://localhost:3000/api/random-image', fetcher);

  const Recarga = () => { mutate(); }

  const handleAddToCart = () => {
    if (data?.success && data?.data && onAddToCart) {
      onAddToCart({
        id: `shop-${data.data.id}`,
        name: data.data.name,
        price: data.data.price || 99.99,
        imageUrl: data.data.imageUrl
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-xs border border-gray-100">
      <h3 className="text-xl font-bold mb-4 font-montserrat text-center">En Venta (Nuestra Tienda)</h3>
      {isLoading ? (
        <p className="text-gray-500 h-32 flex items-center">Consultando stock...</p>
      ) : error || !data?.success ? (
        <p className="text-red-500">Error al cargar de la tienda.</p>
      ) : (
        <div className="flex flex-col items-center">
          <img src={data.data.imageUrl} alt={data.data.name} className="w-32 h-32 object-contain" />
          <p className="capitalize font-semibold text-lg mt-2 text-indigo-600 font-montserrat">{data.data.name}</p>
          <p className="text-sm font-bold text-gray-500 font-montserrat">${(data.data.price || 99.99).toFixed(2)}</p>
        </div>
      )}
      
      <div className="flex flex-col gap-2 w-full mt-4">
        <button 
          onClick={Recarga} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl transition cursor-pointer text-sm uppercase tracking-wider"
        >
          Ver otro artículo 🔄
        </button>
        
        {!isLoading && data?.success && (
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
