import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import EmployerDashboard from '../components/employer/Dashboard';
import EmployerOpportunities from '../components/employer/Opportunities';
import OpportunityNew from '../components/employer/OpportunityNew';
import OpportunityDetail from '../components/employer/OpportunityDetail';
import EmployerDiscovery from '../components/employer/Discovery';
import CandidateProfile from '../components/employer/CandidateProfile';
import EmployerProjects from '../components/employer/Projects';
import EmployerProjectDetail from '../components/employer/ProjectDetail';
import EmployerMessages from '../components/employer/Messages';
import EmployerSettings from '../components/employer/Settings';
import ManageChallenges from '../components/employer/ManageChallenges';
import PostChallenge from '../components/employer/PostChallenge';
import EmployerChallengeDetail from '../components/employer/ChallengeDetail';

const EmployerRoutes = () => {
  return (
    <DashboardLayout title="Employer Portal">
      <Routes>
        <Route path="/" element={<Navigate to="/employer/dashboard" replace />} />
        <Route path="dashboard" element={<EmployerDashboard />} />
        <Route path="opportunities" element={<EmployerOpportunities />} />
        <Route path="opportunities/new" element={<OpportunityNew />} />
        <Route path="opportunities/:id" element={<OpportunityDetail />} />
        <Route path="discovery" element={<EmployerDiscovery />} />
        <Route path="discovery/:id" element={<CandidateProfile />} />
        <Route path="projects" element={<EmployerProjects />} />
        <Route path="projects/:id" element={<EmployerProjectDetail />} />
        <Route path="challenges" element={<ManageChallenges />} />
        <Route path="challenges/new" element={<PostChallenge />} />
        <Route path="challenges/:id" element={<EmployerChallengeDetail />} />
        <Route path="messages" element={<EmployerMessages />} />
        <Route path="settings" element={<EmployerSettings />} />
        <Route path="*" element={<Navigate to="/employer/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default EmployerRoutes;
export { EmployerRoutes };
