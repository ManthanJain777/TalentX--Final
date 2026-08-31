import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  // In production, this will use the relative path '/api', automatically appending to your Render URL.
  // In local development, the Vite proxy in vite.config.js will forward '/api' to 'http://localhost:8080'.
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withXSRFToken: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const isAuthMeCheck = url.includes('/auth/me');
    const isCsrfBootstrap = url.includes('/auth/csrf');

    if (isAuthMeCheck || isCsrfBootstrap) return Promise.reject(error);

    if (!error.response) {
      toast.error('Network Error: Cannot connect to the backend server.');
    } else if (error.response.status === 401) {
      localStorage.removeItem('talentx_user');
      const publicPaths = ['/', '/auth/login', '/auth/register', '/auth/forgot-password'];
      if (!publicPaths.some((p) => window.location.pathname.startsWith(p))) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/auth/login';
      }
    } else if (error.response.status === 403) {
      const message = error.response.data?.message || '';
      toast.error(/csrf/i.test(message) ? 'Security token expired. Please retry the action.' : 'You are not authorized to perform this action.');
    } else if (error.response.status === 500) {
      toast.error(error.response.data?.message || 'Server error. Please try again later.');
    } else if (error.response.status >= 400 && error.response.status < 500 && error.response.status !== 404) {
      toast.error(error.response.data?.message || error.response.data || 'An error occurred.');
    }
    return Promise.reject(error);
  }
);

export default api;
