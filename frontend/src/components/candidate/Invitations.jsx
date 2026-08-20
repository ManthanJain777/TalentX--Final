import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/api';
import GlassCard from '../common/GlassCard';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import Tabs from '../common/Tabs';
import MatchScore from '../common/MatchScore';
import EmptyState from '../ui/EmptyState';
import Loader from '../ui/Loader';
import toast from 'react-hot-toast';

const CandidateInvitations = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('PENDING');
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvitations = useCallback(async () => {
    try {
      setLoading(true);
      if (user?.id) {
        const res = await api.get(`/matches/candidate/${user.id}`);
        setInvitations(Array.isArray(res.data) ? res.data : []);
      } else {
        setInvitations([]);
      }
    } catch (err) {
      console.error('Error fetching invitations:', err);
      setInvitations([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  const pendingCount = invitations.filter((inv) => (inv.status || 'PENDING').toUpperCase() === 'PENDING').length;
  const acceptedCount = invitations.filter((inv) => (inv.status || '').toUpperCase() === 'ACCEPTED').length;
  const rejectedCount = invitations.filter((inv) => (inv.status || '').toUpperCase() === 'REJECTED').length;

  const tabs = [
    { id: 'PENDING', label: `Pending (${pendingCount})`, count: pendingCount },
    { id: 'ACCEPTED', label: `Accepted (${acceptedCount})`, count: acceptedCount },
    { id: 'REJECTED', label: `Declined (${rejectedCount})`, count: rejectedCount },
  ];

  const handleAccept = async (matchId) => {
    try {
      await api.patch(`/matches/${matchId}/accept`);
      toast.success('Invitation accepted! Project created in escrow.');
      fetchInvitations();
    } catch (e) {
      toast.error('Failed to accept invitation');
    }
  };

  const handleDecline = async (matchId) => {
    try {
      await api.patch(`/matches/${matchId}/reject`);
      toast('Invitation declined.');
      fetchInvitations();
    } catch (e) {
      toast.error('Failed to decline invitation');
    }
  };

  const filtered = invitations.filter((inv) => (inv.status || 'PENDING').toUpperCase() === activeTab);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
            Inbound Invitations
          </h2>
          <p className="text-xs text-ink-soft">
            Direct offers and invitations received from employers in MongoDB
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <EmptyState 
            title="No Invitations" 
            description={`You currently have no ${activeTab.toLowerCase()} invitations in the database.`} 
          />
        ) : (
          filtered.map((inv) => (
            <GlassCard key={inv.id} className="p-6 bg-white/90 border-cover/15 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cover/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-cover font-sans">{inv.employerName || 'Employer'}</span>
                    <StatusBadge status={inv.status || 'PENDING'} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-cover">
                    {inv.opportunityTitle || `Opportunity #${inv.opportunityId?.slice(-6)}`}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <MatchScore score={Math.round(inv.totalScore || 90)} size={64} />
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-4 pt-2 text-xs font-mono">
                {activeTab === 'PENDING' && (
                  <div className="flex items-center gap-2 ml-auto">
                    <Button
                      type="button"
                      onClick={() => handleDecline(inv.id)}
                      variant="outline"
                      size="sm"
                    >
                      Decline
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleAccept(inv.id)}
                      variant="primary"
                      size="sm"
                      icon={CheckCircle2}
                    >
                      Accept &amp; Open Escrow
                    </Button>
                  </div>
                )}
              </div>
            </GlassCard>
          ))
        )}
      </div>

    </div>
  );
};

export default CandidateInvitations;
export { CandidateInvitations };
