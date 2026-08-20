import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('talentx_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('talentx_token');
  });

  // Verify token on load
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('talentx_token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          logout();
        }
      }
    };
    verifyAuth();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('talentx_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('talentx_user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: activeUser } = res.data.data;
      
      localStorage.setItem('talentx_token', token);
      setUser(activeUser);
      setIsAuthenticated(true);
      
      toast.success(`Welcome back, ${activeUser.fullName} (${activeUser.role.toUpperCase()})`, {
        style: {
          background: '#142544',
          color: '#FFFFFF',
          border: '1px solid #C7A868',
        },
        icon: '🛡️',
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
      // Optionally login automatically here
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('talentx_user');
    localStorage.removeItem('talentx_token');
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
