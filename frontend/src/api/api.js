import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    // Axios will read the non-HttpOnly XSRF-TOKEN cookie in the browser.
    withXSRFToken: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthMeCheck = error.config?.url?.includes('/auth/me');
        const isCsrfBootstrap = error.config?.url?.includes('/auth/csrf');

        if (isAuthMeCheck || isCsrfBootstrap) {
            return Promise.reject(error);
        }

        if (!error.response) {
            toast.error('Network Error: Cannot connect to the backend server.');
        } else if (error.response.status === 401) {
            localStorage.removeItem('talentx_user');
            const isPublicPath = ['/', '/auth/login', '/auth/register', '/auth/forgot-password'].some(
                (p) => window.location.pathname.startsWith(p)
            );
            if (!isPublicPath) {
                toast.error('Session expired. Please log in again.');
                window.location.href = '/auth/login';
            }
        } else if (error.response.status === 403) {
            // A CSRF failure should not masquerade as an expired login session.
            const message = error.response.data?.message || '';
            if (/csrf/i.test(message)) {
                toast.error('Security token expired. Please retry the action.');
            } else {
                toast.error('You are not authorized to perform this action.');
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
