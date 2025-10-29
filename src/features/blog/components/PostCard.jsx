import { Link } from 'react-router-dom';
import { useState } from 'react';

const PostCard = ({ post, variant = 'default' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generar imagen placeholder basada en el ID del post
  const generatePlaceholder = (id) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-blue-500'
    ];
    return colors[id % colors.length];
  };

  // Calcular tiempo de lectura estimado
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const readingTime = calculateReadingTime(post.body);

  // Variante minimalista
  if (variant === 'minimal') {
    return (
      <Link to={`/blog/posts/${post.id}`} className="block group">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-200 p-4 group-hover:scale-[1.02]">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {post.body}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>ID: #{post.id}</span>
            <span className="text-indigo-600 font-medium">Leer →</span>
          </div>
        </div>
      </Link>
    );
  }

  // Variante horizontal
  if (variant === 'horizontal') {
    return (
      <Link to={`/blog/posts/${post.id}`} className="block group">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-200 overflow-hidden group-hover:scale-[1.01] h-full flex">
          {/* Imagen */}
          <div className="w-24 flex-shrink-0">
            <div className={`w-full h-full bg-gradient-to-br ${generatePlaceholder(post.id)}`} />
          </div>
          
          {/* Contenido */}
          <div className="p-4 flex-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <span>{readingTime} min</span>
              <span>•</span>
              <span>ID: #{post.id}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {post.body}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // Variante por defecto (mejorada)
  return (
    <Link 
      to={`/blog/posts/${post.id}`} 
      className="block group"
    >
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-200 overflow-hidden group-hover:scale-[1.02] h-full flex flex-col">
        
        {/* Imagen/Thumbnail */}
        <div className="relative w-full h-40 overflow-hidden">
          {post.image && !imageError ? (
            <>
              <img
                src={post.image}
                alt={post.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded 
                    ? 'opacity-100' 
                    : 'opacity-0'
                } group-hover:scale-105`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {/* Placeholder de carga */}
              {!imageLoaded && (
                <div className={`absolute inset-0 bg-gradient-to-br ${generatePlaceholder(post.id)} animate-pulse`} />
              )}
            </>
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${generatePlaceholder(post.id)} flex items-center justify-center`}>
              <div className="text-white text-2xl font-bold opacity-30">
                #{post.id}
              </div>
            </div>
          )}
          
          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/95 text-gray-700 shadow-sm">
              📖 Artículo
            </span>
          </div>

          {/* Tiempo de lectura */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
              ⏱️ {readingTime} min
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Título */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors duration-200">
            {post.title}
          </h2>

          {/* Descripción */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.body}
          </p>

          {/* Tags (si existen) */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">
                ID: #{post.id}
              </span>
              {post.author && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500">
                    Por {post.author}
                  </span>
                </>
              )}
            </div>
            
            {/* CTA */}
            <div className="flex items-center text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200">
              <span className="text-sm font-medium mr-1">Leer</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Variante con énfasis en imagen
export const PostCardFeatured = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const generatePlaceholder = (id) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500'
    ];
    return colors[id % colors.length];
  };

  return (
    <Link to={`/blog/posts/${post.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-200 overflow-hidden group-hover:scale-[1.02] h-full flex flex-col">
        {/* Imagen más prominente */}
        <div className="relative w-full h-48 overflow-hidden">
          {post.image && !imageError ? (
            <>
              <img
                src={post.image}
                alt={post.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-110`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className={`absolute inset-0 bg-gradient-to-br ${generatePlaceholder(post.id)} animate-pulse`} />
              )}
            </>
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${generatePlaceholder(post.id)} flex items-center justify-center`}>
              <div className="text-white text-3xl font-bold opacity-20">
                #{post.id}
              </div>
            </div>
          )}
          
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-700 shadow-sm">
              🌟 Destacado
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors duration-200">
            {post.title}
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.body}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>ID: #{post.id}</span>
              <span>•</span>
              <span>⏱️ {calculateReadingTime(post.body)} min</span>
            </div>
            
            <div className="flex items-center text-indigo-600 group-hover:text-indigo-700 font-medium transition-colors duration-200">
              Leer artículo
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const PostCardMinimal = ({ post }) => (
  <PostCard post={post} variant="minimal" />
);

export const PostCardHorizontal = ({ post }) => (
  <PostCard post={post} variant="horizontal" />
);

export default PostCard;