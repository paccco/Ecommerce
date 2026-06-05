import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SLIDES = [
  {
    name: 'Pikachu',
    type: 'Eléctrico ⚡',
    bg: 'from-amber-400 to-yellow-500',
    description: 'El Pokémon de tipo eléctrico más famoso y querido. Su cuerpo almacena electricidad estática que descarga en combates con potentes rayos.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
  },
  {
    name: 'Charizard',
    type: 'Fuego / Volador 🔥',
    bg: 'from-orange-500 to-red-600',
    description: 'Vuela por el cielo en busca de oponentes fuertes. Escupe un fuego tan caliente que puede derretir rocas sólidas.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png'
  },
  {
    name: 'Blastoise',
    type: 'Agua 💧',
    bg: 'from-blue-500 to-indigo-600',
    description: 'Un Pokémon brutal con dos cañones de agua presurizada instalados en su caparazón, capaces de perforar acero grueso.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png'
  },
  {
    name: 'Venusaur',
    type: 'Planta / Veneno 🌿',
    bg: 'from-emerald-500 to-teal-700',
    description: 'La flor de su lomo absorbe la luz solar para convertirla en energía pura. El aroma que desprende relaja las emociones de la gente.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png'
  },
  {
    name: 'Mewtwo',
    type: 'Psíquico 🔮',
    bg: 'from-purple-500 to-indigo-800',
    description: 'Creado por manipulación genética a partir de Mew. Se dice que posee el corazón más salvaje de entre todos los Pokémon.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'
  }
];

export default function CarouselSwiper() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-950 font-montserrat">Carrusel Interactivo Swiper</h2>
        <p className="text-gray-500 mt-2">Desliza con el dedo o haz clic en las flechas para explorar las fichas destacadas.</p>
      </div>

      <div className="shadow-2xl rounded-3xl overflow-hidden bg-slate-900">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="rounded-3xl overflow-hidden h-[420px]"
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.name}>
              <div className={`w-full h-full bg-gradient-to-br ${slide.bg} flex flex-col md:flex-row items-center justify-between p-8 md:p-12 text-white relative`}>
                <div className="flex-1 text-left z-10 space-y-4 pr-0 md:pr-8">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {slide.type}
                  </span>
                  <h3 className="text-4xl font-extrabold font-montserrat tracking-tight">{slide.name}</h3>
                  <p className="text-white/95 text-sm md:text-base font-light leading-relaxed">
                    {slide.description}
                  </p>
                </div>
                <div className="flex-1 flex justify-center items-center z-10 mt-6 md:mt-0">
                  <img
                    src={slide.image}
                    alt={slide.name}
                    className="w-48 h-48 md:w-60 md:h-60 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] transform hover:scale-105 transition-transform duration-300"
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
