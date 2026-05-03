import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function PokemonTienda() {
  // Conectar con nuestro backend en Express
  const { data, error, isLoading, mutate } = useSWR('http://localhost:3000/api/random-image', fetcher);

  const Recarga = () => { mutate(); }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-xs">
      <h3 className="text-xl font-bold mb-4 font-montserrat text-center">En Venta (Nuestra Tienda)</h3>
      {isLoading ? (
        <p className="text-gray-500 h-32 flex items-center">Consultando stock...</p>
      ) : error || !data?.success ? (
        <p className="text-red-500">Error al cargar de la tienda.</p>
      ) : (
        <div className="flex flex-col items-center">
          <img src={data.data.imageUrl} alt={data.data.name} className="w-32 h-32 object-contain" />
          <p className="capitalize font-medium text-lg mt-2 text-gray-700">{data.data.name}</p>
        </div>
      )}
      <button 
        onClick={Recarga} 
        className="mt-4 font-bold cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition"
      >
        Ver otro artículo 🔄
      </button>
    </div>
  );
}
