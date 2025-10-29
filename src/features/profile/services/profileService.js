import api from '../../auth/services/authService';

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  }
};