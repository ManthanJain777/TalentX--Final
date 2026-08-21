import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminDashboard from '../components/admin/Dashboard';
import AdminUsers from '../components/admin/Users';
import UserDetails from '../components/admin/UserDetails';
import AdminVerifications from '../components/admin/Verifications';
import AdminOpportunities from '../components/admin/Opportunities';
import AdminDisputes from '../components/admin/Disputes';
import DisputeRoom from '../components/admin/DisputeRoom';
import AdminAudit from '../components/admin/Audit';
import AdminAnalytics from '../components/admin/Analytics';

const AdminRoutes = () => {
  return (
    <DashboardLayout title="Admin & Arbitration Portal">
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="verifications" element={<AdminVerifications />} />
        <Route path="opportunities" element={<AdminOpportunities />} />
        <Route path="disputes" element={<AdminDisputes />} />
        <Route path="disputes/:id" element={<DisputeRoom />} />
        <Route path="audit" element={<AdminAudit />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminRoutes;
export { AdminRoutes };
