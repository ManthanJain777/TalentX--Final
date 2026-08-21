import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import CandidateRoutes from '../pages/CandidateRoutes';
import EmployerRoutes from '../pages/EmployerRoutes';
import AdminRoutes from '../pages/AdminRoutes';
import NotFound from '../pages/NotFound';
import ComingSoon from '../pages/ComingSoon';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Cinematic 7-Section Homepage */}
      <Route path="/" element={<Home />} />

      {/* Public Authentication Pages */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />

      {/* Role-specific Dashboard Suites */}
      <Route path="/candidate/*" element={<ProtectedRoute allowedRoles={['CANDIDATE', 'candidate']}><CandidateRoutes /></ProtectedRoute>} />
      <Route path="/employer/*" element={<ProtectedRoute allowedRoles={['EMPLOYER', 'employer']}><EmployerRoutes /></ProtectedRoute>} />
      <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['ADMIN', 'admin']}><AdminRoutes /></ProtectedRoute>} />

      {/* Direct Nav Shortcuts */}
      <Route path="/discover" element={<Navigate to="/employer/discovery" replace />} />
      <Route path="/talent" element={<Navigate to="/candidate/dashboard" replace />} />
      <Route path="/passport" element={<Navigate to="/candidate/passport" replace />} />
      <Route path="/projects" element={<Navigate to="/candidate/projects" replace />} />

      {/* Static / Generic pages mapped to ComingSoon */}
      <Route path="/about" element={<ComingSoon />} />
      <Route path="/careers" element={<ComingSoon />} />
      <Route path="/contact" element={<ComingSoon />} />
      <Route path="/privacy" element={<ComingSoon />} />
      <Route path="/terms" element={<ComingSoon />} />

      {/* Catch-all fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
export { AppRoutes };
