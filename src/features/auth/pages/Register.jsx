import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    document_number: "",
    name: "",
    paternal_lastname: "", 
    maternal_lastname: "",
    email: "",
    phone: "", 
    user_name: "",
    password: "",
    last_session: new Date().toISOString().split('T')[0],
    account_statement: true,
    document_type_id: 1,
    country_id: 179
  });

  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [elementsVisible, setElementsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Calcular progreso del formulario
  useEffect(() => {
    const filledFields = Object.values(userData).filter(value => 
      value !== "" && value !== false && value !== true
    ).length;
    const totalFields = 8; // Campos principales visibles
    setProgress(Math.min((filledFields / totalFields) * 100, 100));
  }, [userData]);

  useEffect(() => {
    // Transición de entrada de la página
    setPageLoaded(true);
    
    const timer = setTimeout(() => {
      setElementsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (error) {
      setShakeError(true);
      const timer = setTimeout(() => setShakeError(false), 500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value
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
      console.log('🔄 Intentando registrar usuario...');
      await register(userData);
      
      // Animación de éxito
      formRef.current.style.transform = 'scale(0.98)';
      setTimeout(() => {
        navigate('/login', { 
          replace: true,
          state: { registeredEmail: userData.email }
        });
      }, 500);
      
    } catch (error) {
      console.error('💥 Error completo:', error);
      
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        alert(`❌ Errores de validación:\n\n${errorMessages.join('\n')}`);
      } else {
        alert(`❌ Error: ${error.response?.data?.message || 'Error al registrar usuario'}`);
      }
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
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-white transition-all duration-1000 ${
                pageLoaded ? 'animate-pulse' : 'scale-0'
              }`}
              style={{
                width: Math.random() * 80 + 30,
                height: Math.random() * 80 + 30,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                transitionDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
        
        <div className={`absolute inset-0 transition-all duration-1500 ${
          pageLoaded ? 'opacity-5' : 'opacity-0'
        } bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]`}></div>
        
        <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-1000 ${
          pageLoaded ? 'opacity-0' : 'opacity-100'
        }`}></div>
      </div>

      <div className="max-w-2xl w-full space-y-8 relative z-10 px-4 py-8">
        {/* Header con animación */}
        <div className={`text-center transform transition-all duration-700 ${
          elementsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}>
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6 animate-float">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Crear Cuenta
          </h1>
          <p className="text-purple-200 text-lg">Completa tus datos para comenzar</p>
          
          {/* Barra de progreso */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-purple-300 mb-2">
              <span>Progreso del formulario</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card del formulario */}
        <div 
          ref={formRef}
          className={`bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-1000 ${
            elementsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna 1 */}
              <div className="space-y-5">
                {/* Nombre */}
                <div className={`transition-all duration-500 ${
                  elementsVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`} style={{ transitionDelay: '300ms' }}>
                  <label htmlFor="name" className="block text-sm font-medium text-purple-100 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Nombre *
                    </span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    value={userData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    placeholder="Ej: Juan"
                  />
                </div>

                {/* Apellido Paterno */}
                <div className={`transition-all duration-500 ${
                  elementsVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`} style={{ transitionDelay: '400ms' }}>
                  <label htmlFor="paternal_lastname" className="block text-sm font-medium text-purple-100 mb-2">
                    Apellido Paterno *
                  </label>
                  <input
                    id="paternal_lastname"
                    name="paternal_lastname"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    value={userData.paternal_lastname}
                    onChange={handleChange}
                    onFocus={() => handleFocus('paternal_lastname')}
                    onBlur={handleBlur}
                    placeholder="Ej: Perez"
                  />
                </div>

                {/* Documento */}
                <div className={`transition-all duration-500 ${
                  elementsVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`} style={{ transitionDelay: '500ms' }}>
                  <label htmlFor="document_number" className="block text-sm font-medium text-purple-100 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      N° Documento *
                    </span>
                  </label>
                  <input
                    id="document_number"
                    name="document_number"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    value={userData.document_number}
                    onChange={handleChange}
                    onFocus={() => handleFocus('document_number')}
                    onBlur={handleBlur}
                    placeholder="Ej: 87654321"
                  />
                </div>

                {/* Email */}
                <div className={`transition-all duration-500 ${
                  elementsVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`} style={{ transitionDelay: '600ms' }}>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email *
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    value={userData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    placeholder="usuario@ejemplo.com"
                  />
                </div>
              </div>

              {/* Columna 2 */}
              <div className="space-y-5">
                {/* Apellido Materno */}
                <div className={`transition-all duration-500 ${
                  elementsVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`} style={{ transitionDelay: '300ms' }}>
                  <label htmlFor="maternal_lastname" className="block text-sm font-medium text-purple-100 mb-2">
                    Apellido Materno *
                  </label>
                  <input
                    id="maternal_lastname"
                    name="maternal_lastname"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    value={userData.maternal_lastname}
                    onChange={handleChange}
                    onFocus={() => handleFocus('maternal_lastname')}
                    onBlur={handleBlur}
                    placeholder="Ej: Garcia"
                  />
                </div>

                {/* Username */}
                <div className={`transition-all duration-500 ${
                  elementsVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`} style={{ transitionDelay: '400ms' }}>
                  <label htmlFor="user_name" className="block text-sm font-medium text-purple-100 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Usuario *
                    </span>
                  </label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    value={userData.user_name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('user_name')}
                    onBlur={handleBlur}
                    placeholder="juanperez2024"
                  />
                </div>

                {/* Teléfono */}
                <div className={`transition-all duration-500 ${
                  elementsVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`} style={{ transitionDelay: '500ms' }}>
                  <label htmlFor="phone" className="block text-sm font-medium text-purple-100 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Teléfono *
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    value={userData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    placeholder="987654321"
                  />
                </div>

                {/* Contraseña */}
                <div className={`transition-all duration-500 ${
                  elementsVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`} style={{ transitionDelay: '600ms' }}>
                  <label htmlFor="password" className="block text-sm font-medium text-purple-100 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Contraseña *
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm pr-12"
                      value={userData.password}
                      onChange={handleChange}
                      onFocus={() => handleFocus('password')}
                      onBlur={handleBlur}
                      placeholder="Mínimo 8 caracteres"
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
                  </div>
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

            {/* Botón de registro PROFESIONAL */}
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
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Crear Cuenta
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Enlace a login */}
            <div className={`text-center pt-6 border-t border-white/20 transition-all duration-500 ${
              elementsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '1000ms' }}>
              <Link 
                to="/login" 
                className="text-purple-300 hover:text-white font-medium text-sm transition-all duration-300 inline-flex items-center group hover:transform hover:translate-x-1"
              >
                <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                ¿Ya tienes cuenta? Inicia sesión aquí
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className={`text-center transition-all duration-500 ${
          elementsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '1200ms' }}>
          <p className="text-purple-300/70 text-sm">
            Sistema Seguro de Registro • 
            <span className="text-green-400 ml-2 flex items-center justify-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Tus datos están protegidos
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;