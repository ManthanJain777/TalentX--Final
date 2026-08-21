import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token on load via API (relies on HttpOnly cookie being sent)
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await api.get('/auth/me').catch(() => null);
        if (res && res.data?.data?.user) {
          setUser(res.data.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user: activeUser } = res.data.data;
      
      setUser(activeUser);
      setIsAuthenticated(true);
      
      toast.success(`Welcome back, ${activeUser.fullName} (${activeUser.role.toUpperCase()})`, {
        style: {
          background: '#142544',
          color: '#FFFFFF',
          border: '1px solid #C7A868',
        },
      });
      return activeUser;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData, role) => {
    try {
      let endpoint = role === 'employer' ? '/auth/register/employer' : '/auth/register/candidate';
      await api.post(endpoint, userData);
      toast.success('Registration successful. Please login.', {
        style: { background: '#142544', color: '#FFFFFF', border: '1px solid #C7A868' }
      });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error("Logout failed on server, clearing local state anyway", e);
    }
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully', {
      style: {
        background: '#142544',
        color: '#FFFFFF',
        border: '1px solid rgba(255,255,255,0.1)',
      },
    });
    window.location.href = '/';
  };

  const updateUser = (updates) => {
    setUser((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#111827] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
