import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Loader from "../../blog/components/Loader";
import ErrorMsg from "../../blog/components/ErrorMsg";

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [contentLoaded, setContentLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleBackToBlog = () => {
    navigate('/blog/posts');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!loading && profile) {
      setTimeout(() => setContentLoaded(true), 300);
    }
  }, [loading, profile]);

  // Manejar selección de archivo
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validaciones
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setUploadError('Por favor selecciona una imagen válida (JPEG, PNG, GIF, WebP)');
      return;
    }

    if (file.size > maxSize) {
      setUploadError('La imagen es demasiado grande. Máximo 5MB permitido.');
      return;
    }

    setUploadError(null);
    
    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    // Subir imagen
    handleImageUpload(file);
  };

  // Subir imagen al servidor
  const handleImageUpload = async (file) => {
    setUploading(true);
    setUploadError(null);

    try {
      // Simulación de subida (reemplaza con tu API real)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría tu llamada a la API real:
      /*
      const formData = new FormData();
      formData.append('profileImage', file);
      formData.append('userId', profile.id);

      const response = await fetch('/api/upload-profile-image', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Error al subir la imagen');
      const result = await response.json();
      */

      // Simulación de éxito
      console.log('Imagen subida:', file.name);
      setUploading(false);
      alert('¡Foto de perfil actualizada exitosamente!');
      
    } catch (err) {
      setUploadError(err.message);
      setUploading(false);
    }
  };

  // Abrir selector de archivos
  const handleEditPhoto = () => {
    fileInputRef.current?.click();
  };

  // Calcular iniciales para fallback
  const getInitials = () => {
    if (!profile) return 'US';
    const firstInitial = profile.name ? profile.name.charAt(0).toUpperCase() : 'U';
    const lastInitial = profile.paternal_lastname ? profile.paternal_lastname.charAt(0).toUpperCase() : 'S';
    return `${firstInitial}${lastInitial}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Loader 
            fullScreen={false}
            variant="progress"
            text="Cargando tu perfil..."
            size="large"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ErrorMsg 
            message={error} 
            type="error"
            actionLabel="Reintentar"
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      
      {/* Input oculto para archivos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        className="hidden"
      />

      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="relative py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header con navegación - BOTONES PROFESIONALES */}
          <div className={`mb-8 transition-all duration-500 ${
            contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <button
                onClick={handleBackToBlog}
                className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border border-gray-300/80 hover:border-indigo-300 hover:text-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white"
              >
                <svg className="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al Blog
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={handleEditPhoto}
                  disabled={uploading}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Cambiar Foto
                    </>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>

          {/* Tarjeta principal del perfil */}
          <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200/60 backdrop-blur-sm overflow-hidden transition-all duration-700 ${
            contentLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            {/* Header con gradiente y avatar */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-8 py-8">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex flex-col lg:flex-row items-center lg:items-end gap-6">
                {/* Avatar con funcionalidad de upload */}
                <div className="relative group">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl border-4 border-white/30 backdrop-blur-sm flex items-center justify-center shadow-2xl overflow-hidden">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-white">
                        {getInitials()}
                      </span>
                    )}
                  </div>
                  
                  {/* Overlay de edición */}
                  <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={handleEditPhoto}
                      disabled={uploading}
                      className="text-white bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Indicador de carga */}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                
                {/* Información principal */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {profile?.name} {profile?.paternal_lastname}
                  </h1>
                  <p className="text-indigo-100 text-lg mb-4">@{profile?.user_name}</p>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
                      💼 {profile?.role?.name}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
                      🌍 {profile?.country?.name}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-white backdrop-blur-sm border border-emerald-500/30">
                      ✅ Activo
                    </span>
                  </div>
                </div>
              </div>

              {/* Mensaje de error de upload */}
              {uploadError && (
                <div className="relative mt-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{uploadError}</span>
                    </div>
                    <button
                      onClick={() => setUploadError(null)}
                      className="text-red-200 hover:text-white"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navegación por pestañas */}
            <div className="border-b border-gray-200 bg-gray-50/50">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'personal', label: 'Información Personal', icon: '👤' },
                  { id: 'account', label: 'Cuenta', icon: '🔐' },
                  { id: 'activity', label: 'Actividad', icon: '📊' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 font-medium text-sm border-b-2 transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-indigo-600 text-indigo-600 bg-white'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2 text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenido de las pestañas */}
            <div className="p-8">
              {activeTab === 'personal' && profile && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Información Personal */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Información Personal
                    </h3>
                    
                    <div className="space-y-4">
                      <InfoCard 
                        label="Nombre completo"
                        value={`${profile.name} ${profile.paternal_lastname} ${profile.maternal_lastname}`}
                        icon="👤"
                      />
                      <InfoCard 
                        label="Email"
                        value={profile.email}
                        icon="📧"
                      />
                      <InfoCard 
                        label="Teléfono"
                        value={profile.phone}
                        icon="📞"
                      />
                      <InfoCard 
                        label="Documento"
                        value={profile.document_number}
                        icon="🆔"
                      />
                    </div>
                  </div>

                  {/* Información de Cuenta */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Información de Cuenta
                    </h3>
                    
                    <div className="space-y-4">
                      <InfoCard 
                        label="Nombre de usuario"
                        value={profile.user_name}
                        icon="👨‍💻"
                      />
                      <InfoCard 
                        label="ID de usuario"
                        value={`#${profile.id}`}
                        icon="🔢"
                        isCode
                      />
                      <InfoCard 
                        label="Rol"
                        value={profile.role?.name}
                        icon="💼"
                        isBadge
                        badgeColor="green"
                      />
                      <InfoCard 
                        label="País"
                        value={profile.country?.name}
                        icon="🌍"
                        isBadge
                        badgeColor="blue"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔐</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Configuración de Cuenta</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Gestiona la configuración de seguridad, notificaciones y preferencias de tu cuenta.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Cambiar Contraseña
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Configurar Notificaciones
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Tu Actividad</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Próximamente podrás ver estadísticas de tu actividad, artículos leídos y más.
                  </p>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 max-w-md mx-auto">
                    <div className="text-4xl mb-2">🚀</div>
                    <p className="text-gray-700 font-medium">Funcionalidad en desarrollo</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para tarjetas de información
const InfoCard = ({ label, value, icon, isCode = false, isBadge = false, badgeColor = 'gray' }) => {
  const badgeColors = {
    green: 'bg-green-100 text-green-800 border-green-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-indigo-200 transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</dt>
            {isBadge ? (
              <dd className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badgeColors[badgeColor]}`}>
                {value}
              </dd>
            ) : isCode ? (
              <dd className="text-lg text-gray-900 font-semibold font-mono">{value}</dd>
            ) : (
              <dd className="text-lg text-gray-900 font-semibold">{value}</dd>
            )}
          </div>
        </div>
        <svg className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
};

export default Profile;