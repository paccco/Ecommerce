import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  stock: number;
}

interface TiendaProps {
  onAddToCart: (item: { id: string; name: string; price: number; imageUrl: string }) => void;
}

export default function Tienda({ onAddToCart }: TiendaProps) {
  const [desde, setDesde] = useState(1);
  const [itemsPerPage] = useState(6);
  const [ordenacion, setOrdenacion] = useState<'ascendente' | 'descendente'>('ascendente');

  const hasta = desde + itemsPerPage - 1;
  const apiUrl = `http://localhost:3000/api/productos?desde=${desde}&hasta=${hasta}&ordenacion=${ordenacion}`;
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  const handlePrevPage = () => {
    if (desde > 1) {
      setDesde(Math.max(1, desde - itemsPerPage));
    }
  };

  const handleNextPage = () => {
    if (data?.success && data?.data && data.data.length === itemsPerPage) {
      setDesde(desde + itemsPerPage);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdenacion(e.target.value as 'ascendente' | 'descendente');
    setDesde(1);
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart({
      id: `shop-${product.id}`,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || 'https://via.placeholder.com/150'
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      {/* Title section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 font-montserrat">Tienda Oficial Pokémon</h2>
          <p className="text-gray-500 mt-1">Explora nuestra colección de figuras premium y cartas exclusivas</p>
        </div>

        {/* Sorting selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-600 font-montserrat uppercase tracking-wider">Ordenar por:</span>
          <select 
            className="select select-bordered rounded-xl bg-white text-gray-700 font-semibold border-gray-300"
            value={ordenacion}
            onChange={handleSortChange}
          >
            <option value="ascendente">Precio: Menor a Mayor 📈</option>
            <option value="descendente">Precio: Mayor a Menor 📉</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <span className="loading loading-spinner loading-lg text-indigo-600"></span>
          <p className="text-gray-500 font-semibold font-montserrat">Cargando catálogo oficial...</p>
        </div>
      ) : error || !data?.success ? (
        <div className="bg-red-550/10 border border-red-200 text-red-700 p-6 rounded-2xl text-center">
          <p className="font-bold text-lg">Error al conectar con la base de datos.</p>
          <p className="text-sm mt-1">Por favor, asegúrate de tener el contenedor de PostgreSQL levantado y el backend Express corriendo en el puerto 3000.</p>
        </div>
      ) : data.data.length === 0 ? (
        <div className="bg-slate-100 p-12 rounded-3xl text-center text-gray-500 space-y-3">
          <span className="text-5xl block">🛒</span>
          <p className="font-extrabold text-lg font-montserrat">No se encontraron productos</p>
          <p className="text-sm">Ejecuta el script de scraping para poblar el catálogo.</p>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((product: Product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-3xl shadow-md border border-gray-100 hover:shadow-xl hover:scale-[1.01] transition duration-300 overflow-hidden flex flex-col relative"
              >
                {/* Stock badge */}
                {product.stock === 0 ? (
                  <span className="absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                    Agotado
                  </span>
                ) : (
                  <span className="absolute top-3 left-3 bg-emerald-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                    Stock: {product.stock}
                  </span>
                )}

                {/* Product Image */}
                <div className="h-48 bg-zinc-50 flex items-center justify-center p-6 border-b border-gray-100 relative overflow-hidden">
                  <img 
                    src={product.imageUrl || 'https://via.placeholder.com/150'} 
                    alt={product.name} 
                    className="h-full object-contain hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-lg text-gray-800 font-montserrat capitalize">{product.name}</h4>
                    <p className="text-gray-500 text-xs line-clamp-2 font-light leading-relaxed">{product.description}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-gray-900 font-montserrat">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="btn bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 border-none text-white font-bold px-4 py-2 rounded-xl transition text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Añadir 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-4 border-t border-gray-200 pt-6">
            <button
              onClick={handlePrevPage}
              disabled={desde === 1}
              className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 font-bold rounded-xl text-sm transition cursor-pointer"
            >
              ⬅️ Anterior
            </button>
            <span className="font-bold text-gray-700 font-montserrat text-sm">
              Productos {desde} - {desde + data.data.length - 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={data.data.length < itemsPerPage}
              className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 font-bold rounded-xl text-sm transition cursor-pointer"
            >
              Siguiente ➡️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
