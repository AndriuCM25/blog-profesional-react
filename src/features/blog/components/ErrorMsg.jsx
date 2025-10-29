import React, { useState, useEffect } from 'react';

const ErrorMsg = ({ 
  message, 
  onRetry, 
  type = 'error',
  autoDismiss = false,
  dismissTime = 5000,
  onDismiss,
  showIcon = true,
  actionLabel = 'Reintentar',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Configuración por tipo de mensaje
  const config = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-500',
      title: 'text-red-800',
      text: 'text-red-700',
      button: 'bg-red-600 hover:bg-red-700 text-white',
      iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-500',
      title: 'text-yellow-800',
      text: 'text-yellow-700',
      button: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      text: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  };

  const currentConfig = config[type] || config.error;

  useEffect(() => {
    if (autoDismiss && isVisible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, dismissTime);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissTime, isVisible]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) onDismiss();
    }, 300);
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`
          ${currentConfig.bg} 
          ${currentConfig.border} 
          rounded-xl p-6 text-center 
          transform transition-all duration-300 ease-out
          ${isExiting ? 'scale-95 opacity-0 -translate-y-2' : 'scale-100 opacity-100 translate-y-0'}
          shadow-lg border-l-4 ${currentConfig.border.replace('200', '400')}
          backdrop-blur-sm bg-opacity-95
        `}
        role="alert"
        aria-live="polite"
      >
        {/* Botón de cerrar */}
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-50"
            aria-label="Cerrar mensaje"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Icono animado */}
        {showIcon && (
          <div className="mb-4">
            <div className={`${currentConfig.icon} transform transition-all duration-500`}>
              <svg 
                className="w-16 h-16 mx-auto animate-bounce-in" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d={currentConfig.iconPath}
                />
              </svg>
            </div>
          </div>
        )}

        {/* Contenido */}
        <div className="space-y-3">
          <h3 className={`text-xl font-semibold ${currentConfig.title} mb-2`}>
            {type === 'error' && 'Error'}
            {type === 'warning' && 'Advertencia'}
            {type === 'info' && 'Información'}
          </h3>
          
          <p className={`text-lg leading-relaxed ${currentConfig.text} max-w-md mx-auto`}>
            {message}
          </p>

          {/* Barra de progreso para auto-dismiss */}
          {autoDismiss && (
            <div className="w-full bg-gray-200 rounded-full h-1 mt-4 overflow-hidden">
              <div 
                className={`h-full ${currentConfig.bg.replace('50', '500')} transition-all duration-1000 ease-linear`}
                style={{ 
                  width: isExiting ? '0%' : '100%',
                  transition: isExiting ? 'width 0.3s ease-out' : `width ${dismissTime}ms linear`
                }}
              />
            </div>
          )}

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6 pt-4 border-t border-opacity-20 border-current">
            {onRetry && (
              <button
                onClick={handleRetry}
                className={`
                  ${currentConfig.button} 
                  px-6 py-3 rounded-lg text-base font-medium 
                  transition-all duration-200 transform hover:scale-105 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
                  shadow-md hover:shadow-lg
                  flex items-center space-x-2
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{actionLabel}</span>
              </button>
            )}
            
            {onDismiss && (
              <button
                onClick={handleDismiss}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-colors duration-200 border border-gray-300 hover:border-gray-400"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>

        {/* Efecto de brillo sutil */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-10 pointer-events-none`}></div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

// Componente adicional para mostrar múltiples errores
export const ErrorList = ({ errors, onRetry, type = 'error' }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="space-y-4">
      {errors.map((error, index) => (
        <ErrorMsg
          key={index}
          message={error}
          onRetry={onRetry}
          type={type}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
};

export default ErrorMsg;