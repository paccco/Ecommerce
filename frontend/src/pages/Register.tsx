import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const validateName = (val: string) => {
    if (!val.trim()) {
      setNameError('El nombre es requerido.');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (val: string) => {
    if (!val) {
      setEmailError('El correo electrónico es requerido.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError('Formato de correo incorrecto (usuario@dominio.com).');
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

  const validateConfirmPassword = (val: string) => {
    if (val !== password) {
      setConfirmError('Las contraseñas no coinciden.');
      return false;
    }
    setConfirmError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword);

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
      setSuccessMessage('¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...');
      setErrorMessage('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setErrorMessage('Por favor, corrige los errores del formulario.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center font-montserrat mb-2">Crear Cuenta</h2>
        <p className="text-gray-500 text-center text-sm mb-6">Regístrate para comprar en PokeSPA</p>

        {successMessage && (
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-xs font-semibold mb-4 border border-emerald-100 animate-pulse">
            🎉 {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 text-red-650 p-4 rounded-xl text-xs font-semibold mb-4 border border-red-100">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700">Nombre Completo</span>
            </label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className={`input input-bordered w-full rounded-xl bg-slate-50 text-gray-900 ${nameError ? 'input-error border-red-500' : 'border-gray-200'}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => validateName(name)}
              autoFocus
            />
            {nameError && (
              <span className="text-xs text-red-550 mt-1 font-semibold block">{nameError}</span>
            )}
          </div>

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
            />
            {emailError && (
              <span className="text-xs text-red-550 mt-1 font-semibold block">{emailError}</span>
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
              <span className="text-xs text-red-550 mt-1 font-semibold block">{passwordError}</span>
            )}
          </div>

          {/* Confirm Password input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700">Confirmar Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="••••••"
              className={`input input-bordered w-full rounded-xl bg-slate-50 text-gray-900 ${confirmError ? 'input-error border-red-500' : 'border-gray-200'}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => validateConfirmPassword(confirmPassword)}
            />
            {confirmError && (
              <span className="text-xs text-red-550 mt-1 font-semibold block">{confirmError}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-bold border-none transition mt-4 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Registrarse
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-bold text-indigo-600 hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
