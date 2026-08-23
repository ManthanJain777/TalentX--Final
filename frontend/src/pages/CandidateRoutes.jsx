import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import CandidateDashboard from '../components/candidate/Dashboard';
import PassportBuilder from '../components/candidate/passport/PassportBuilder';
import PassportEdit from '../components/candidate/PassportEdit';
import CandidateMatches from '../components/candidate/Matches';
import MatchDetail from '../components/candidate/MatchDetail';
import CandidateInvitations from '../components/candidate/Invitations';
import CandidateProjects from '../components/candidate/Projects';
import CandidateProjectDetail from '../components/candidate/ProjectDetail';
import CandidateMessages from '../components/candidate/Messages';
import CandidateSettings from '../components/candidate/Settings';
import BrowseChallenges from '../components/candidate/BrowseChallenges';
import ChallengeDetail from '../components/candidate/ChallengeDetail';
import OnboardingGuard from '../routes/OnboardingGuard';

const CandidateRoutes = () => {
  return (
    <OnboardingGuard>
      <DashboardLayout title="Candidate Passport Portal">
      <Routes>
        <Route path="/" element={<Navigate to="/candidate/dashboard" replace />} />
        <Route path="dashboard" element={<CandidateDashboard />} />
        <Route path="passport" element={<PassportBuilder />} />
        <Route path="passport/edit" element={<PassportEdit />} />
        <Route path="matches" element={<CandidateMatches />} />
        <Route path="matches/:matchId" element={<MatchDetail />} />
        <Route path="invitations" element={<CandidateInvitations />} />
        <Route path="projects" element={<CandidateProjects />} />
        <Route path="projects/:projectId" element={<CandidateProjectDetail />} />
        <Route path="challenges" element={<BrowseChallenges />} />
        <Route path="challenges/:id" element={<ChallengeDetail />} />
        <Route path="messages" element={<CandidateMessages />} />
        <Route path="settings" element={<CandidateSettings />} />
        <Route path="*" element={<Navigate to="/candidate/dashboard" replace />} />
      </Routes>
      </DashboardLayout>
    </OnboardingGuard>
  );
};

export default CandidateRoutes;
export { CandidateRoutes };
