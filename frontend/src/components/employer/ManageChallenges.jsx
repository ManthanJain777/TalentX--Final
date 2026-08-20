import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/api';

import { IndianRupee, Plus, Layers, Target, CheckCircle } from 'lucide-react';
import ChallengeCard from '../challenges/ChallengeCard';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const ManageChallenges = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [employerChallenges, setEmployerChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get('/challenges');
        setEmployerChallenges(response.data || []);
      } catch (err) {
        console.error('Error fetching challenges:', err);
        toast.error('Failed to load challenges.');
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const filtered = employerChallenges.filter(c => {
    if (activeTab === 'All') return true;
    return c.status === activeTab.toLowerCase();
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink">My Challenges</h1>
          <p className="text-ink-soft mt-2">Manage your paid micro-tasks and review submissions.</p>
        </div>
        <Link 
          to="/employer/challenges/new"
          className="px-6 py-2.5 rounded-xl bg-gold text-white font-medium hover:bg-gold-soft transition-colors shadow-lg shadow-gold/20 flex items-center gap-2 w-fit"
        >
          <Plus className="w-5 h-5" /> Post New Challenge
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-2 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-ink/5 text-ink"><Layers className="w-5 h-5" /></div>
          <div><p className="text-2xl font-display font-bold text-ink">{employerChallenges.length}</p><p className="text-xs text-ink-soft font-mono uppercase">Total</p></div>
        </div>
        <div className="glass-2 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gold/10 text-gold"><Target className="w-5 h-5" /></div>
          <div><p className="text-2xl font-display font-bold text-ink">{employerChallenges.filter(c => c.status === 'open').length}</p><p className="text-xs text-ink-soft font-mono uppercase">Open</p></div>
        </div>
        <div className="glass-2 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-verified/10 text-verified"><CheckCircle className="w-5 h-5" /></div>
          <div><p className="text-2xl font-display font-bold text-ink">{employerChallenges.filter(c => c.status === 'completed').length}</p><p className="text-xs text-ink-soft font-mono uppercase">Completed</p></div>
        </div>
        <div className="glass-2 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gold/5 text-gold"><IndianRupee className="w-5 h-5" /></div>
          <div><p className="text-2xl font-display font-bold text-ink">{employerChallenges.reduce((acc, c) => acc + (c.prize || c.prizeAmount || 0), 0)}</p><p className="text-xs text-ink-soft font-mono uppercase">Prize Pool</p></div>
        </div>
      </div>

      {loading ? <Loader /> : (
        <>
          <div className="flex gap-2 border-b border-ink/5 pb-4">
            {['All', 'Open', 'Closed', 'Completed', 'Drafts'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab ? 'bg-ink text-white' : 'bg-white/30 text-ink-soft hover:bg-white border border-cover/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filtered.map(challenge => (
              <ChallengeCard key={challenge.id || challenge._id} challenge={challenge} isEmployer={true} />
            ))}
          </div>

          {filtered.length === 0 && (
            <EmptyState 
              title="No Challenges in this tab" 
              description={`You don't have any ${activeTab.toLowerCase()} challenges recorded in MongoDB.`} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ManageChallenges;
