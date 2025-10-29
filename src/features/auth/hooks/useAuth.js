import axios from 'axios';

// URL base mock - no hacemos peticiones reales
const BASE_URL = '/api'; // Ruta ficticia

// Simulamos un backend en localStorage
const mockBackend = {
  users: JSON.parse(localStorage.getItem('mockUsers') || '[]'),
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null')
};

const saveMockData = () => {
  localStorage.setItem('mockUsers', JSON.stringify(mockBackend.users));
  localStorage.setItem('currentUser', JSON.stringify(mockBackend.currentUser));
};

// Simulamos delay de red
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 500));

export const authService = {
  register: async (userData) => {
    await simulateNetworkDelay();
    
    // Verificar si el usuario ya existe
    const existingUser = mockBackend.users.find(user => 
      user.email === userData.email || user.user_name === userData.user_name
    );
    
    if (existingUser) {
      throw { 
        response: { 
          data: { 
            message: 'El usuario ya existe' 
          } 
        } 
      };
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: Date.now(),
      ...userData,
      created_at: new Date().toISOString()
    };
    
    mockBackend.users.push(newUser);
    saveMockData();
    
    return {
      message: 'Usuario registrado exitosamente',
      user: newUser
    };
  },

  login: async (credentials) => {
    await simulateNetworkDelay();
    
    const user = mockBackend.users.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw { 
        response: { 
          data: { 
            message: 'Credenciales incorrectas' 
          } 
        } 
      };
    }
    
    // Crear token simulado
    const token = `mock-token-${Date.now()}`;
    mockBackend.currentUser = user;
    saveMockData();
    
    // Guardar en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return {
      message: 'Login exitoso',
      token: token,
      role: 1,
      first_login: false
    };
  },

  logout: async () => {
    await simulateNetworkDelay();
    
    mockBackend.currentUser = null;
    saveMockData();
    
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    
    return { message: 'Sesión cerrada exitosamente' };
  },

  getProfile: async () => {
    await simulateNetworkDelay();
    
    const user = mockBackend.currentUser || JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!user) {
      throw { 
        response: { 
          data: { 
            message: 'No autenticado' 
          } 
        } 
      };
    }
    
    // Datos de perfil enriquecidos
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      user_name: user.user_name,
      phone: user.phone,
      paternal_lastname: user.paternal_lastname,
      maternal_lastname: user.maternal_lastname,
      document_number: user.document_number,
      role: { 
        id: 1, 
        name: "Admin" 
      },
      country: { 
        id: 179, 
        name: "Perú" 
      }
    };
  }
};

// Para compatibilidad con el código existente
export default {
  post: (url, data) => {
    if (url === '/register') return authService.register(data);
    if (url === '/login') return authService.login(data);
    return Promise.reject(new Error('Endpoint no mockeado'));
  },
  delete: (url) => {
    if (url === '/logout') return authService.logout();
    return Promise.reject(new Error('Endpoint no mockeado'));
  },
  get: (url) => {
    if (url === '/profile') return authService.getProfile();
    return Promise.reject(new Error('Endpoint no mockeado'));
  },
  interceptors: {
    request: {
      use: () => {}
    }
  }
};