import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/api';
import GlassCard from '../common/GlassCard';
import Tabs from '../common/Tabs';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../ui/EmptyState';
import Loader from '../ui/Loader';

const EmployerOpportunities = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('OPEN');
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const res = await api.get(`/challenges/employer/${user.id}`);
          setChallenges(Array.isArray(res.data) ? res.data : []);
        } else {
          setChallenges([]);
        }
      } catch (err) {
        console.error('Error fetching employer challenges:', err);
        setChallenges([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, [user]);

  const openCount = challenges.filter((c) => (c.status || 'OPEN').toUpperCase() === 'OPEN').length;
  const completedCount = challenges.filter((c) => (c.status || '').toUpperCase() === 'COMPLETED').length;

  const tabs = [
    { id: 'OPEN', label: `Open (${openCount})`, count: openCount },
    { id: 'COMPLETED', label: `Completed (${completedCount})`, count: completedCount },
  ];

  const filtered = challenges.filter((c) => (c.status || 'OPEN').toUpperCase() === activeTab);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
            My Opportunities &amp; Challenges
          </h2>
          <p className="text-xs text-ink-soft">
            Manage your open positions, review candidate submissions, and commission paid micro-challenges
          </p>
        </div>

        <Link to="/employer/challenges/new" className="btn-primary text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5">
          <PlusCircle className="w-4 h-4" />
          <span>Post New Challenge</span>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <EmptyState 
            title="No Challenges in this tab" 
            description={`You currently have no ${activeTab.toLowerCase()} challenges in MongoDB.`} 
          />
        ) : (
          filtered.map((opp) => (
            <GlassCard key={opp.id || opp._id} className="p-6 bg-white/90 border-cover/15 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-cover/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-ink-soft">ID #{opp.id?.slice(-6) || 'CHAL'}</span>
                    <StatusBadge status={opp.status || 'OPEN'} />
                    <span className="font-mono text-[11px] text-gold-dark font-bold bg-gold/15 px-2 py-0.5 rounded border border-gold/30">
                      ₹{(opp.prize || opp.prizeAmount || 0).toLocaleString()} Bounty
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-cover">
                    {opp.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    to={`/employer/challenges/${opp.id || opp._id}`}
                    className="btn-primary text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5"
                  >
                    <span>Inspect Submissions ({opp.submissionCount || 0})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Skills & Stats */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="font-bold text-ink-soft mr-1">Required:</span>
                  {(opp.skills || []).map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] bg-cover/5 text-cover px-2.5 py-0.5 rounded border border-cover/10 font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 font-mono text-xs text-ink-soft">
                  <span>Prize: <strong className="text-cover">₹{(opp.prize || opp.prizeAmount || 0).toLocaleString()}</strong></span>
                  <span>Submissions: <strong className="text-gold-dark">{opp.submissionCount || 0}</strong></span>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>

    </div>
  );
};

export default EmployerOpportunities;
export { EmployerOpportunities };
