import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthMeCheck = error.config?.url?.includes('/auth/me');
        if (isAuthMeCheck) {
            // Silent auth check on initial load; do not trigger global error toasts
            return Promise.reject(error);
        }

        if (!error.response) {
            toast.error('Network Error: Cannot connect to the backend server.');
        } else if (error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('talentx_user'); // Leave user metadata cleanup
            const isPublicPath = ['/', '/auth/login', '/auth/register', '/auth/forgot-password'].some(p => window.location.pathname.startsWith(p));
            if (!isPublicPath) {
                toast.error('Session expired or access denied. Please log in again.');
                window.location.href = '/auth/login';
            }
        } else if (error.response.status === 500) {
            toast.error(error.response.data?.message || 'Server error. Please try again later.');
        } else if (error.response.status >= 400 && error.response.status < 500 && error.response.status !== 404) {
            toast.error(error.response.data?.message || error.response.data || 'An error occurred.');
        }
        return Promise.reject(error);
    }
);

export default api;
