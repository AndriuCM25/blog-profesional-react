import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, getUsers } from "../api/blogApi";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";
import Navbar from "../../../components/Navbar";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false);

  const fetchPostData = async () => {
    try {
      setLoading(true);
      setError(null);
      setContentLoaded(false);
      
      const [postResponse, usersResponse] = await Promise.all([
        getPostById(id),
        getUsers()
      ]);
      
      setPost(postResponse.data);
      
      // Encontrar el usuario del post
      const postUser = usersResponse.data.find(u => u.id === postResponse.data.userId);
      setUser(postUser);

      // Pequeño delay para la animación de entrada
      setTimeout(() => setContentLoaded(true), 100);
    } catch (err) {
      setError(err.message || "Error al cargar el post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  // Calcular tiempo de lectura
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const readingTime = post ? calculateReadingTime(post.body) : 0;

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Loader 
          fullScreen={false} 
          variant="progress" 
          text="Cargando artículo..." 
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
            onRetry={fetchPostData}
            type="error"
            actionLabel="Reintentar carga"
          />
        </div>
      </div>
    );
  }

  if (!post) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post no encontrado</h2>
          <p className="text-gray-600 mb-6">El artículo que buscas no existe o ha sido removido.</p>
          <Link 
            to="/blog/posts" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            ← Volver al Blog
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="relative py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb con animación - BOTÓN PROFESIONAL */}
          <div className={`mb-8 transition-all duration-500 delay-100 ${
            contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <Link 
              to="/blog/posts" 
              className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border border-gray-300/80 hover:border-indigo-300 hover:text-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white"
            >
              <svg className="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Blog
            </Link>
          </div>
          
          {/* Artículo principal */}
          <article className={`bg-white rounded-2xl shadow-xl border border-gray-200/60 backdrop-blur-sm overflow-hidden transition-all duration-700 ${
            contentLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
              <div className="max-w-3xl mx-auto">
                {/* Meta información */}
                <div className="flex flex-wrap items-center gap-4 text-indigo-100 text-sm mb-4">
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{readingTime} min de lectura</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Post #{post.id}</span>
                  </div>
                </div>

                {/* Título */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Información del autor */}
                {user && (
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                      <span className="text-white font-bold text-xl">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-lg">{user.name}</p>
                      <p className="text-indigo-100 text-sm">@{user.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-indigo-100 text-sm">Autor ID: {post.userId}</p>
                      <p className="text-indigo-200 text-xs">{user.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contenido del artículo */}
            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  {/* Cuerpo del artículo con animación de revelado */}
                  <div className={`text-gray-700 leading-relaxed text-lg space-y-6 transition-all duration-500 delay-300 ${
                    contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {post.body.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-8">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Separador decorativo */}
                  <div className="my-12 flex items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    <div className="mx-4 text-gray-400">✦</div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>

                  {/* Información adicional */}
                  <div className={`bg-gray-50 rounded-xl p-6 transition-all duration-500 delay-500 ${
                    contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Información del Artículo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">ID:</span>
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-mono">
                          #{post.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Autor ID:</span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">
                          {post.userId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Palabras:</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {post.body.split(' ').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer del artículo */}
            <div className="border-t border-gray-200 bg-gray-50/50 p-6">
              <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link 
                  to="/blog/posts" 
                  className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border border-gray-300/80 hover:border-indigo-300 hover:text-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white"
                >
                  <svg className="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Ver todos los posts
                </Link>
                
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Volver arriba
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;