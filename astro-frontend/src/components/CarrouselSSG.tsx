import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Producto {
  título: string;
  texto_precio: string;
  imagen: string;
  descripcion: string;
}

interface Props {
  productos: Producto[];
}

const BG_CLASSES = [
  'from-amber-300 to-yellow-500',
  'from-orange-500 to-red-650',
  'from-teal-400 to-emerald-600',
  'from-blue-500 to-cyan-700',
  'from-rose-400 to-pink-655',
  'from-purple-500 to-indigo-700',
  'from-sky-400 to-indigo-600',
  'from-violet-500 to-purple-800',
  'from-yellow-500 to-amber-700',
  'from-fuchsia-400 to-purple-600',
  'from-amber-500 to-orange-700',
  'from-indigo-400 to-violet-700'
];

export default function CarrouselSSG({ productos }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide font-montserrat">Galería de Colección</h2>
        <p className="text-gray-500 mt-2 font-light">Explora las cartas estáticas inyectadas directamente mediante Astro SSG</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="rounded-2xl overflow-hidden h-[400px]"
        >
          {productos.map((prod, idx) => (
            <SwiperSlide key={prod.título}>
              <div className={`w-full h-full bg-gradient-to-br ${BG_CLASSES[idx % BG_CLASSES.length]} flex flex-col md:flex-row items-center justify-between p-8 md:p-12 text-white relative`}>
                <div className="flex-1 text-left z-10 space-y-4 pr-0 md:pr-8">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Destacado SSG ({prod.texto_precio})
                  </span>
                  <h3 className="text-4xl font-extrabold font-montserrat tracking-tight">{prod.título}</h3>
                  <p className="text-white/90 text-sm md:text-base font-light leading-relaxed">
                    {prod.descripcion}
                  </p>
                  <div className="pt-2">
                    <a
                      href={`/productos/${prod.título.toLowerCase()}`}
                      className="bg-white text-gray-900 font-bold py-2.5 px-6 rounded-full text-sm shadow-md hover:bg-gray-100 hover:shadow-lg transition inline-block"
                    >
                      Ver Detalles Ficha
                    </a>
                  </div>
                </div>
                <div className="flex-1 flex justify-center items-center z-10 mt-6 md:mt-0">
                  <img
                    src={`/images/${prod.imagen}`}
                    alt={prod.título}
                    className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)] transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Decorative backgrounds */}
                <div className="absolute right-10 top-10 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute left-10 bottom-10 w-36 h-36 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
