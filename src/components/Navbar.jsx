import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // ← CAMBIO AQUÍ: Redirige al login
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y navegación izquierda */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              📚 MiBlog
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link 
                to="/blog/posts" 
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Inicio
              </Link>
            </div>
          </div>

          {/* Navegación derecha - Estado de autenticación */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm">
                    👋 Hola, <strong>{user?.name}</strong>
                  </span>
                  <Link 
                    to="/profile" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                  >
                    👤 Mi Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    🚪 Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-3">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300"
                >
                  🔑 Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  📝 Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;