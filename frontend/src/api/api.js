import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('talentx_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            toast.error('Network Error: Cannot connect to the backend server.');
        } else if (error.response.status === 401) {
            // Unauthorized: clear token and redirect to login
            localStorage.removeItem('talentx_token');
            localStorage.removeItem('talentx_user');
            if (!window.location.pathname.startsWith('/auth/login')) {
                toast.error('Session expired. Please log in again.');
                window.location.href = '/auth/login';
            }
        } else if (error.response.status === 500) {
            toast.error('Server error. Please try again later.');
        } else if (error.response.status >= 400 && error.response.status < 500 && error.response.status !== 401 && error.response.status !== 404) {
            toast.error(error.response.data?.message || error.response.data || 'An error occurred.');
        }
        return Promise.reject(error);
    }
);

export default api;
