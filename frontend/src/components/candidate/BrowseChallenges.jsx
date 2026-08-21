import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import ChallengeFilters from '../challenges/ChallengeFilters';
import ChallengeCard from '../challenges/ChallengeCard';
import Loader from '../ui/Loader';

const BrowseChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', status: 'all', skills: [] });

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get('/challenges');
        const mapped = response.data.map(c => ({
          ...c,
          id: c.id || c._id,
          employer: c.employerId || 'Employer',
          skills: c.skills || [],
          prize: c.prizeAmount || c.prize || 0,
        }));
        setChallenges(mapped);
      } catch (err) {
        console.error('Error fetching challenges:', err);
        toast.error('Failed to load challenges.');
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter(c => {
    if (filters.status !== 'all' && c.status !== filters.status) return false;
    if (filters.search && !c.title?.toLowerCase().includes(filters.search.toLowerCase()) && !c.employer?.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.skills.length > 0 && !filters.skills.some(skill => c.skills.includes(skill))) return false;
    return true;
  });

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-ink">Employer Challenges</h1>
        <p className="text-ink-soft mt-2 text-lg">Prove your skills fast and earn day-1 revenue.</p>
      </div>

      <ChallengeFilters filters={filters} setFilters={setFilters} />

      <div className="flex justify-between items-end mb-4 px-2">
        <span className="text-sm font-mono text-ink-soft">{filteredChallenges.length} Challenges Found</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-ink/10 rounded-lg text-xs hover:bg-white transition-colors">Prev</button>
          <button className="px-3 py-1 border border-ink/10 rounded-lg text-xs hover:bg-white transition-colors">Next</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} role="candidate" />
        ))}
      </div>
      
      {filteredChallenges.length === 0 && (
        <div className="glass-panel p-12 text-center text-ink-soft">
          No challenges match your filters. Try adjusting your search criteria.
        </div>
      )}
    </div>
  );
};

export default BrowseChallenges;
