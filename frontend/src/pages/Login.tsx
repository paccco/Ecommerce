import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface LoginProps {
  onLoginSuccess: (email: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const validateEmail = (val: string) => {
    if (!val) {
      setEmailError('El correo electrónico es requerido.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError('Formato de correo incorrecto (ejemplo: usuario@dominio.com).');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (val: string) => {
    if (!val) {
      setPasswordError('La contraseña es requerida.');
      return false;
    }
    if (val.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      onLoginSuccess(email);
      navigate('/tienda');
    } else {
      setErrorMessage('Por favor, corrige los errores en el formulario.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center font-montserrat mb-2">Iniciar Sesión</h2>
        <p className="text-gray-500 text-center text-sm mb-6">Accede a tu cuenta de PokeSPA</p>

        {errorMessage && (
          <div className="bg-red-50 text-red-650 p-4 rounded-xl text-xs font-semibold mb-4 border border-red-100">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700">Correo Electrónico</span>
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className={`input input-bordered w-full rounded-xl bg-slate-50 text-gray-900 ${emailError ? 'input-error border-red-500' : 'border-gray-200'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              autoFocus
            />
            {emailError && (
              <span className="text-xs text-red-500 mt-1 font-semibold block">{emailError}</span>
            )}
          </div>

          {/* Password input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700">Contraseña</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••"
                className={`input input-bordered w-full pr-12 rounded-xl bg-slate-50 text-gray-900 ${passwordError ? 'input-error border-red-500' : 'border-gray-200'}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
            </div>
            {passwordError && (
              <span className="text-xs text-red-500 mt-1 font-semibold block">{passwordError}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-bold border-none transition mt-2 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Acceder
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="font-bold text-indigo-600 hover:underline">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
