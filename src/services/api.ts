import axios from 'axios';
import { auth } from './firebase'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser

    if (user) {
      const idToken = await user.getIdToken()
      config.headers.Authorization = `Bearer ${idToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
);

export default api;
