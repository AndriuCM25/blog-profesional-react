import { useEffect, useState } from "react";
import { getPosts, simulateError } from "../api/blogApi";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";
import Navbar from "../../../components/Navbar";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      setContentLoaded(false);
      
      // Simular error aleatorio (20% de probabilidad)
      simulateError();
      
      const response = await getPosts();
      setPosts(response.data.slice(0, 12)); // Mostrar solo 12 posts
      
      // Pequeño delay para animaciones
      setTimeout(() => setContentLoaded(true), 300);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filtrar posts basado en búsqueda
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Loader 
          fullScreen={false}
          variant="progress"
          text="Cargando artículos..."
          size="large"
        />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ErrorMsg 
            message={error} 
            onRetry={fetchPosts}
            type="error"
            actionLabel="Reintentar carga"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      
      {/* Background decorativo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header con animación */}
          <div className={`text-center mb-16 transition-all duration-700 ${
            contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-8 shadow-xl animate-float">
              <span className="text-4xl text-white">📚</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Nuestro Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Descubre artículos fascinantes, comparte conocimiento y únete a nuestra comunidad de lectores apasionados.
            </p>
            
            {/* Barra de búsqueda */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-700"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Contador de resultados */}
          {searchTerm && (
            <div className={`text-center mb-8 transition-all duration-500 ${
              contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <p className="text-gray-600 bg-white/60 backdrop-blur-sm inline-flex px-4 py-2 rounded-full border border-gray-200">
                {filteredPosts.length} artículo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''} para "<span className="font-semibold text-indigo-600">{searchTerm}</span>"
              </p>
            </div>
          )}

          {/* Grid de posts con animación escalonada */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`transition-all duration-500 ${
                    contentLoaded 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-8 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))
            ) : (
              // Estado vacío
              <div className="col-span-full text-center py-16">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No se encontraron artículos</h3>
                  <p className="text-gray-600 mb-6">
                    No hay resultados para "<span className="font-semibold">{searchTerm}</span>". Intenta con otros términos.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Ver todos los artículos
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer estadísticas con animación */}
          <div className={`text-center transition-all duration-700 delay-500 ${
            contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="inline-flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-12 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">{posts.length}</div>
                <div className="text-sm text-gray-500 font-medium">Artículos Publicados</div>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
              <div className="sm:hidden w-12 h-px bg-gray-200"></div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
                <div className="text-sm text-gray-500 font-medium">Autores Activos</div>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
              <div className="sm:hidden w-12 h-px bg-gray-200"></div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">1.2K+</div>
                <div className="text-sm text-gray-500 font-medium">Lectores Mensuales</div>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
              <div className="sm:hidden w-12 h-px bg-gray-200"></div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">95%</div>
                <div className="text-sm text-gray-500 font-medium">Satisfacción</div>
              </div>
            </div>

            {/* CTA adicional */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                ¿Te gusta lo que ves? Suscríbete para recibir los últimos artículos directamente en tu correo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="px-6 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 w-full sm:w-auto"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;