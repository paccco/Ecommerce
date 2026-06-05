import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Portada() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
          E-Commerce Premium SPA
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-montserrat mb-4">
          Centro de Control y Portada SPA
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
          Bienvenido al centro interactivo de nuestra Single Page Application (SPA). Aquí puedes descubrir las entrañas técnicas de la plataforma e interactuar con nuestro ecosistema.
        </p>
      </div>

      {/* Tabs Section - DaisyUI Tabs */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
        <div role="tablist" className="tabs tabs-boxed mb-6 p-1.5 bg-gray-100/80 rounded-2xl flex">
          <button
            role="tab"
            className={`tab flex-1 py-3 text-sm md:text-base font-semibold transition-all duration-300 rounded-xl ${
              activeTab === 0 ? 'tab-active bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(0)}
          >
            🛡️ Proyecto
          </button>
          <button
            role="tab"
            className={`tab flex-1 py-3 text-sm md:text-base font-semibold transition-all duration-300 rounded-xl ${
              activeTab === 1 ? 'tab-active bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(1)}
          >
            ⚙️ Arquitectura
          </button>
          <button
            role="tab"
            className={`tab flex-1 py-3 text-sm md:text-base font-semibold transition-all duration-300 rounded-xl ${
              activeTab === 2 ? 'tab-active bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(2)}
          >
            📖 Guía de Uso
          </button>
        </div>

        {/* Tab Contents */}
        <div className="mt-8 transition-opacity duration-300">
          {activeTab === 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 font-montserrat">E-Commerce Monolítico & SPA Híbrida</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Nuestra plataforma combina la estabilidad de un patrón **MVC monolítico** robusto escrito con **Express y Nunjucks** para la visualización del catálogo tradicional y el carrito dinámico de compras con sesión httpOnly, junto a la potencia y agilidad de una **Single Page Application (SPA)** de React moderna.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-2 font-montserrat">Back-End Sólido</h4>
                  <p className="text-sm text-indigo-950">Express v5, Prisma ORM, persistencia en PostgreSQL nativa y scraping dinámico para poblar el catálogo de productos al instante.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-100">
                  <h4 className="font-bold text-purple-900 mb-2 font-montserrat">Front-End Interactivo</h4>
                  <p className="text-sm text-purple-950">React v19, TailwindCSS v4 con DaisyUI, rutas dinámicas e hidratación reactiva con Astro Islands para la máxima velocidad de carga.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 font-montserrat">Pila Tecnológica</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                El ecosistema está construido con un fuerte enfoque en micro-interacciones, animaciones fluidas y optimización de datos en tiempo real:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center hover:shadow-md transition">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="font-bold text-gray-700 text-sm">Vite & React 19</div>
                  <div className="text-xs text-gray-400">Compilación ultraveloz</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center hover:shadow-md transition">
                  <div className="text-2xl mb-1">🌀</div>
                  <div className="font-bold text-gray-700 text-sm">SWR Fetching</div>
                  <div className="text-xs text-gray-400">Caché y revalidación</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center hover:shadow-md transition">
                  <div className="text-2xl mb-1">🎭</div>
                  <div className="font-bold text-gray-700 text-sm">Swiper Carousel</div>
                  <div className="text-xs text-gray-400">Deslizamiento táctil</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center hover:shadow-md transition">
                  <div className="text-2xl mb-1">📁</div>
                  <div className="font-bold text-gray-700 text-sm">Prisma & Postgres</div>
                  <div className="text-xs text-gray-400">Persistencia limpia</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center hover:shadow-md transition">
                  <div className="text-2xl mb-1">🎨</div>
                  <div className="font-bold text-gray-700 text-sm">Tailwind v4</div>
                  <div className="text-xs text-gray-400">Diseño atómico premium</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center hover:shadow-md transition">
                  <div className="text-2xl mb-1">🛸</div>
                  <div className="font-bold text-gray-700 text-sm">Astro Islands</div>
                  <div className="text-xs text-gray-400">Carga diferida (Lazy)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 font-montserrat">¿Cómo navegar y probar la app?</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Puedes alternar de forma interactiva entre las diferentes secciones que hemos programado para ti:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 text-indigo-800 font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h5 className="font-bold text-gray-700 font-montserrat">Sección de Catálogo (Tienda)</h5>
                    <p className="text-sm text-gray-500">Muestra los productos reales alojados en nuestra base de datos sincronizada por Express, con filtros y ordenación por precio.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 text-indigo-800 font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h5 className="font-bold text-gray-700 font-montserrat">Comparador de Pokémon</h5>
                    <p className="text-sm text-gray-500">Muestra la combinación de datos dinámicos extraídos externamente desde la PokeAPI y productos en venta con imágenes aleatorias del backend.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 text-indigo-800 font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h5 className="font-bold text-gray-700 font-montserrat">Carrusel Pokémon de Swiper</h5>
                    <p className="text-sm text-gray-500">Un pase visual animado y premium con las fichas completas de Pokémon populares para probar la interactividad del carrusel.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Cards / CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => navigate('/tienda')}
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-3xl cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition duration-300 text-left relative overflow-hidden"
        >
          <div className="text-3xl mb-3">🛍️</div>
          <h4 className="text-xl font-bold font-montserrat">Tienda Oficial</h4>
          <p className="text-white/80 text-xs mt-1 font-light">Explora el catálogo dinámico con búsqueda, paginado y filtros.</p>
          <div className="mt-4 text-[10px] font-bold bg-white/20 inline-block px-3 py-1 rounded-full uppercase">Entrar →</div>
          <div className="absolute right-0 bottom-0 text-white/5 text-9xl translate-x-6 translate-y-6 font-extrabold pointer-events-none">9</div>
        </div>

        <div 
          onClick={() => navigate('/catalogo')}
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-3xl cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition duration-300 text-left relative overflow-hidden"
        >
          <div className="text-3xl mb-3">🔄</div>
          <h4 className="text-xl font-bold font-montserrat">Comparador</h4>
          <p className="text-white/80 text-xs mt-1 font-light">Contrasta especificaciones de Pokémon salvajes y productos en venta.</p>
          <div className="mt-4 text-[10px] font-bold bg-white/20 inline-block px-3 py-1 rounded-full uppercase">Comparar →</div>
          <div className="absolute right-0 bottom-0 text-white/5 text-9xl translate-x-6 translate-y-6 font-extrabold pointer-events-none">C</div>
        </div>

        <div 
          onClick={() => navigate('/carrusel')}
          className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-6 rounded-3xl cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition duration-300 text-left relative overflow-hidden"
        >
          <div className="text-3xl mb-3">🎠</div>
          <h4 className="text-xl font-bold font-montserrat">Carrusel</h4>
          <p className="text-white/80 text-xs mt-1 font-light">Explora las cartas coleccionables táctiles e interactivas con Swiper.</p>
          <div className="mt-4 text-[10px] font-bold bg-white/20 inline-block px-3 py-1 rounded-full uppercase">Deslizar →</div>
          <div className="absolute right-0 bottom-0 text-white/5 text-9xl translate-x-6 translate-y-6 font-extrabold pointer-events-none">10</div>
        </div>
      </div>
    </div>
  );
}
