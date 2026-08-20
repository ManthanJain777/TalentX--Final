import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import DiscoveryFilters from './discovery/DiscoveryFilters';
import DiscoveryGrid from './discovery/DiscoveryGrid';
import InviteModal from './discovery/InviteModal';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const Discovery = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    keyword: '',
    skills: [],
    location: '',
    experience: 0,
    availableNow: false,
  });

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get('/discovery/candidates');
        const mapped = response.data.map(c => ({
          ...c,
          name: c.name || 'Candidate',
          headline: c.headline || 'Talent',
          skills: c.skills || [],
          matchScore: c.matchScore || 0,
          breakdown: c.breakdown || { skills: 0, projects: 0, assessments: 0, certifications: 0, profile: 0 },
          explanation: c.explanation || {}
        }));
        setCandidates(mapped);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        toast.error('Failed to load discovery data.');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const handleInvite = (candidate) => {
    setSelectedCandidate(candidate);
    setInviteModalOpen(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
      {/* Left Sidebar Filters */}
      <div className="lg:col-span-1">
        <DiscoveryFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {candidates.length === 0 ? (
          <EmptyState title="No Candidates Found" description="Try adjusting your filters to find matching talent." />
        ) : (
          <DiscoveryGrid candidates={candidates} onInvite={handleInvite} />
        )}
      </div>

      {/* Invite Modal */}
      <InviteModal 
        isOpen={inviteModalOpen} 
        onClose={() => setInviteModalOpen(false)} 
        candidate={selectedCandidate} 
      />
    </div>
  );
};

export default Discovery;
