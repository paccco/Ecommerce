import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import Portada from './pages/Portada';
import Tienda from './pages/Tienda';
import Login from './pages/Login';
import Register from './pages/Register';
import PokemonExterno from './components/PokemonExterno';
import PokemonTienda from './components/PokemonTienda';
import CarouselSwiper from './components/CarouselSwiper';

// Custom Toast Alert interface
interface Alert {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

// Cart Item interface
interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CatalogoPageProps {
  onAddToCart: (item: { id: string; name: string; price: number; imageUrl: string }) => void;
}

// Subcomponent for Tarea 9 (Comparador)
function CatalogoPage({ onAddToCart }: CatalogoPageProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 font-montserrat">Catálogo de Pokémon (React SWR & PokeAPI)</h2>
        <p className="text-gray-500 mt-2">Doble integración: API externa en vivo e imágenes estáticas del backend de nuestra tienda</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
        <PokemonExterno onAddToCart={onAddToCart} />
        <PokemonTienda onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}

// AppInner contains all layout and routing logic with hook access
function AppInner() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const navigate = useNavigate();

  // Load cart and user session on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('poke_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart', e);
      }
    }
    const savedUser = sessionStorage.getItem('poke_user');
    if (savedUser) {
      setUserEmail(savedUser);
    }
  }, []);

  // Save cart to local storage whenever it changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('poke_cart', JSON.stringify(newCart));
  };

  // Toast alert trigger helper
  const triggerAlert = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 4000);
  };

  const handleAddToCart = (item: { id: string; name: string; price: number; imageUrl: string }) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      const updated = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
    triggerAlert(`¡Añadido ${item.name} al carrito! 🛒`, 'success');
  };

  const updateQuantity = (itemId: string, amount: number) => {
    const existing = cart.find((i) => i.id === itemId);
    if (!existing) return;
    
    const newQty = existing.quantity + amount;
    if (newQty <= 0) {
      saveCart(cart.filter((i) => i.id !== itemId));
    } else {
      saveCart(cart.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i)));
    }
  };

  const removeItem = (itemId: string) => {
    saveCart(cart.filter((i) => i.id !== itemId));
    triggerAlert('Artículo eliminado del carrito.', 'info');
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    sessionStorage.setItem('poke_user', email);
    triggerAlert(`¡Sesión iniciada como ${email}! 👋`, 'success');
  };

  const handleLogout = () => {
    setUserEmail(null);
    sessionStorage.removeItem('poke_user');
    triggerAlert('Sesión cerrada correctamente.', 'info');
    navigate('/');
  };

  const handleCheckout = () => {
    saveCart([]);
    setIsCartOpen(false);
    triggerAlert('¡Compra realizada con éxito! Recibirás tus Pokémon pronto 🚀', 'success');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-x-hidden">
      {/* Header / Navbar */}
      <header className="bg-white border-b border-gray-150 sticky top-0 z-40 px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tight font-montserrat flex items-center gap-2">
            <span>PokeSPA</span>
            <span className="text-xs bg-indigo-150 text-indigo-800 px-2 py-0.5 rounded-full font-bold uppercase">React</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1 font-semibold text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition ${
                isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-650 hover:bg-gray-100'
              }`
            }
          >
            Portada
          </NavLink>
          <NavLink
            to="/tienda"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition ${
                isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-650 hover:bg-gray-100'
              }`
            }
          >
            Tienda
          </NavLink>
          <NavLink
            to="/catalogo"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition ${
                isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-650 hover:bg-gray-100'
              }`
            }
          >
            Comparador
          </NavLink>
          <NavLink
            to="/carrusel"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition ${
                isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-650 hover:bg-gray-100'
              }`
            }
          >
            Carrusel
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart toggle trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-slate-100 hover:bg-slate-200 transition rounded-xl text-gray-700 cursor-pointer flex items-center justify-center"
          >
            <span className="text-xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white font-bold text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* Auth controls */}
          {userEmail ? (
            <div className="flex items-center gap-3">
              <span className="hidden lg:inline text-xs font-bold text-gray-500 font-montserrat">
                {userEmail}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline border-gray-300 rounded-xl font-bold cursor-pointer"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-sm btn-ghost rounded-xl font-bold text-gray-600">
                Entrar
              </Link>
              <Link to="/register" className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 border-none text-white rounded-xl font-bold">
                Registro
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pb-16">
        <Routes>
          <Route path="/" element={<Portada />} />
          <Route path="/tienda" element={<Tienda onAddToCart={handleAddToCart} />} />
          <Route path="/catalogo" element={<CatalogoPage onAddToCart={handleAddToCart} />} />
          <Route path="/carrusel" element={<CarouselSwiper />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-150 py-8 text-center text-gray-400 text-xs">
        <p>© 2026 PokeSPA E-commerce Inc. Desarrollado con React 19, Vite y TailwindCSS v4.</p>
      </footer>

      {/* Offcanvas Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="relative w-[400px] max-w-full h-full bg-white shadow-2xl flex flex-col animate-slide-in border-l border-gray-150">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-xl font-black text-gray-800 font-montserrat flex items-center gap-2">
                <span>🛒 Mi Carrito</span>
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-2xl text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Cart body list */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400 space-y-3">
                  <span className="text-5xl block">🛍️</span>
                  <p className="font-extrabold text-sm font-montserrat">El carrito está vacío</p>
                  <p className="text-xs text-gray-350">Añade productos de la tienda o el comparador.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-slate-50/50 hover:bg-slate-50 transition">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain bg-white rounded-xl border border-gray-100 p-1 shrink-0" />
                    <div className="flex-grow text-left">
                      <h4 className="font-bold text-gray-800 text-sm capitalize font-montserrat line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-bold text-indigo-600 mt-1">${item.price.toFixed(2)}</p>
                      
                      {/* Quantity editors */}
                      <div className="flex items-center gap-2.5 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-white border border-gray-250 hover:bg-slate-100 text-gray-650 flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-extrabold text-gray-700 w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-white border border-gray-250 hover:bg-slate-100 text-gray-650 flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm shrink-0 cursor-pointer self-start p-1"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer footer details */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-slate-50 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold text-sm">Total a Pagar:</span>
                  <span className="text-2xl font-black text-gray-900 font-montserrat">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition shadow-lg hover:shadow-xl cursor-pointer text-sm uppercase tracking-wider font-montserrat"
                >
                  Proceder al Pago Seguro 🔒
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Alerts Container */}
      <div className="fixed top-6 right-6 z-55 flex flex-col gap-3 max-w-sm pointer-events-none">
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`p-4 rounded-2xl shadow-xl flex items-center gap-3 text-white border text-sm pointer-events-auto animate-fade-in ${
              a.type === 'success'
                ? 'bg-emerald-500 border-emerald-400'
                : a.type === 'error'
                ? 'bg-red-500 border-red-400'
                : 'bg-indigo-600 border-indigo-500'
            }`}
          >
            <span>{a.type === 'success' ? '🎉' : a.type === 'error' ? '⚠️' : 'ℹ️'}</span>
            <span className="font-semibold">{a.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
