import React from 'react';

const Loader = ({ 
  size = 'medium',
  variant = 'spinner',
  color = 'indigo',
  text = '',
  overlay = false,
  fullScreen = false,
  className = ''
}) => {
  // Configuración de tamaños
  const sizeConfig = {
    small: {
      spinner: 'h-6 w-6 border-2',
      dots: 'h-2 w-2',
      bars: 'h-3 w-1',
      pulse: 'h-4 w-4'
    },
    medium: {
      spinner: 'h-12 w-12 border-b-2',
      dots: 'h-3 w-3',
      bars: 'h-4 w-1.5',
      pulse: 'h-8 w-8'
    },
    large: {
      spinner: 'h-16 w-16 border-b-2',
      dots: 'h-4 w-4',
      bars: 'h-6 w-2',
      pulse: 'h-12 w-12'
    }
  };

  // Configuración de colores
  const colorConfig = {
    indigo: 'border-indigo-600 bg-indigo-600 text-indigo-600',
    blue: 'border-blue-600 bg-blue-600 text-blue-600',
    green: 'border-green-600 bg-green-600 text-green-600',
    red: 'border-red-600 bg-red-600 text-red-600',
    purple: 'border-purple-600 bg-purple-600 text-purple-600',
    gray: 'border-gray-600 bg-gray-600 text-gray-600',
    white: 'border-white bg-white text-white'
  };

  const currentSize = sizeConfig[size] || sizeConfig.medium;
  const currentColor = colorConfig[color] || colorConfig.indigo;

  // Renderizado de diferentes variantes
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`${currentSize.dots} ${currentColor.split(' ')[1]} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      case 'bars':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`${currentSize.bars} ${currentColor.split(' ')[1]} animate-pulse`}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`${currentSize.pulse} ${currentColor.split(' ')[1]} rounded-full animate-ping`} />
        );

      case 'progress':
        return (
          <div className="w-32 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-2 ${currentColor.split(' ')[1]} rounded-full animate-progress`}
            />
          </div>
        );

      case 'skeleton':
        return (
          <div className="animate-pulse space-y-3">
            <div className={`h-4 ${currentColor.split(' ')[1]} bg-opacity-20 rounded w-3/4`}></div>
            <div className={`h-4 ${currentColor.split(' ')[1]} bg-opacity-20 rounded w-1/2`}></div>
            <div className={`h-4 ${currentColor.split(' ')[1]} bg-opacity-20 rounded w-5/6`}></div>
          </div>
        );

      default: // spinner
        return (
          <div className={`${currentSize.spinner} ${currentColor.split(' ')[0]} rounded-full animate-spin`} />
        );
    }
  };

  const loaderContent = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {renderLoader()}
      {text && (
        <p className={`text-sm ${color === 'white' ? 'text-white' : 'text-gray-600'} font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-40 flex items-center justify-center rounded-lg">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

// Loader de página completa con contenido personalizado
export const PageLoader = ({ 
  title = "Cargando", 
  subtitle = "Por favor espere...",
  logo,
  children 
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo personalizado */}
        {logo && (
          <div className="mb-8 animate-float">
            {logo}
          </div>
        )}
        
        {/* Loader principal */}
        <Loader 
          size="large" 
          variant="spinner" 
          color="white"
          className="mb-6"
        />
        
        {/* Contenido de texto */}
        <div className="space-y-3 text-white">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-purple-200 text-lg">{subtitle}</p>
        </div>

        {/* Contenido adicional personalizado */}
        {children}
      </div>
    </div>
  );
};

// Loader para cards o secciones
export const CardLoader = ({ count = 1 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse"
        >
          <div className="flex space-x-4">
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;