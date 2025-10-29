import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [elementsVisible, setElementsVisible] = useState(false);
  
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    // Transición de entrada de la página
    setPageLoaded(true);
    
    // Animación escalonada de los elementos después de que la página cargue
    const timer = setTimeout(() => {
      setElementsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.registeredEmail) {
      setCredentials(prev => ({
        ...prev,
        email: location.state.registeredEmail
      }));
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      setShakeError(true);
      const timer = setTimeout(() => setShakeError(false), 500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      // Animación de éxito antes de navegar
      formRef.current.style.transform = 'scale(0.98)';
      setTimeout(() => {
        navigate('/blog/posts');
      }, 300);
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden transition-all duration-1000 ${
      pageLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -inset-10 opacity-20 transition-all duration-2000 ${
          pageLoaded ? 'opacity-20' : 'opacity-0'
        }`}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-white transition-all duration-1000 ${
                pageLoaded ? 'animate-pulse' : 'scale-0'
              }`}
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                transitionDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
        
        {/* Patrón de grid con transición */}
        <div className={`absolute inset-0 transition-all duration-1500 ${
          pageLoaded ? 'opacity-5' : 'opacity-0'
        } bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]`}></div>
        
        {/* Capa de overlay para transición */}
        <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-1000 ${
          pageLoaded ? 'opacity-0' : 'opacity-100'
        }`}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 px-4">
        {/* Header con animación escalonada */}
        <div className={`text-center transform transition-all duration-700 ${
          elementsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}>
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6 animate-float">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Bienvenido de Nuevo
          </h1>
          <p className="text-purple-200 text-lg transition-all duration-500 delay-300">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        {/* Card del formulario con transición */}
        <div 
          ref={formRef}
          className={`bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-1000 ${
            elementsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Campo Email */}
              <div className={`transition-all duration-500 ${
                elementsVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`} style={{ transitionDelay: '400ms' }}>
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium mb-3 transition-all duration-300 ${
                    focusedField === 'email' ? 'text-purple-300 transform translate-x-2' : 'text-purple-100'
                  }`}
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="tu@email.com"
                    value={credentials.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                  />
                  {focusedField === 'email' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transform scale-x-0 animate-input-focus"></div>
                  )}
                </div>
                <div className="text-purple-300 text-xs mt-2 flex items-center opacity-0 animate-fade-in delay-200">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ingresa el email con el que te registraste
                </div>
              </div>
              
              {/* Campo Contraseña */}
              <div className={`transition-all duration-500 ${
                elementsVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`} style={{ transitionDelay: '600ms' }}>
                <label 
                  htmlFor="password" 
                  className={`block text-sm font-medium mb-3 transition-all duration-300 ${
                    focusedField === 'password' ? 'text-purple-300 transform translate-x-2' : 'text-purple-100'
                  }`}
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Contraseña
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm pr-12"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors duration-200 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                  {focusedField === 'password' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transform scale-x-0 animate-input-focus"></div>
                  )}
                </div>
                <div className="text-purple-300 text-xs mt-2 flex items-center opacity-0 animate-fade-in delay-300">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Tu contraseña está encriptada y segura
                </div>
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className={`bg-red-400/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 transform transition-all duration-300 ${
                shakeError ? 'animate-shake' : ''
              }`}>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-100 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Botón de login PROFESIONAL */}
            <div className={`transition-all duration-500 ${
              elementsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '800ms' }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="flex items-center justify-center relative z-10">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Acceder a la Plataforma
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Enlace de registro */}
            <div className={`text-center pt-6 border-t border-white/20 transition-all duration-500 ${
              elementsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '1000ms' }}>
              <Link 
                to="/register" 
                className="text-purple-300 hover:text-white font-medium text-sm transition-all duration-300 inline-flex items-center group hover:transform hover:translate-x-1"
              >
                <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                ¿Primera vez? Crea una cuenta gratuita
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className={`text-center transition-all duration-500 ${
          elementsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '1200ms' }}>
          <p className="text-purple-300/70 text-sm">
            Sistema Seguro de Autenticación • 
            <span className="text-green-400 ml-2 flex items-center justify-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Conexión encriptada
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;