import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await api.get('/auth/csrf');
      } catch (error) {
        console.error('CSRF bootstrap failed', error);
      }

      try {
        const res = await api.get('/auth/me');
        if (res.data?.data?.user) {
          setUser(res.data.data.user);
          setIsAuthenticated(true);
        }
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (email, password) => {
    try {
      // Refresh the CSRF token immediately before authentication.
      await api.get('/auth/csrf');
      const res = await api.post('/auth/login', { email, password });
      const { user: activeUser } = res.data.data;
      setUser(activeUser);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${activeUser.fullName} (${activeUser.role.toUpperCase()})`, {
        style: { background: '#142544', color: '#FFFFFF', border: '1px solid #C7A868' },
      });
      return activeUser;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData, role) => {
    try {
      await api.get('/auth/csrf');
      const endpoint = role === 'employer' ? '/auth/register/employer' : '/auth/register/candidate';
      await api.post(endpoint, userData);
      toast.success('Registration successful. Please login.', {
        style: { background: '#142544', color: '#FFFFFF', border: '1px solid #C7A868' },
      });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/csrf');
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed on server, clearing local state anyway', error);
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('talentx_user');
    toast.success('Logged out successfully', {
      style: { background: '#142544', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.1)' },
    });
    window.location.href = '/';
  };

  const updateUser = (updates) => setUser((prev) => (prev ? { ...prev, ...updates } : prev));

  if (isLoading) {
    return <div className="min-h-screen bg-[#111827] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
