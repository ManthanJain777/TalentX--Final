import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowLeft,
  Send,
  MessageSquare,
  Sparkles,
  Cpu,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const EmployerTalentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState('₹10.00L');
  const [offerRole, setOfferRole] = useState('Software Engineer');
  const [sendingOffer, setSendingOffer] = useState(false);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/passports/${id}`);
        setPassport(res.data);
      } catch (err) {
        console.error('Error fetching talent passport:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCandidate();
    }
  }, [id]);

  const handleSendOffer = async (e) => {
    e.preventDefault();
    setSendingOffer(true);
    try {
      toast.success(`Direct Milestone Offer (${offerAmount}) transmitted to candidate!`);
      setShowOfferModal(false);
    } catch (err) {
      toast.error('Failed to transmit offer');
    } finally {
      setSendingOffer(false);
    }
  };

  if (loading) return <Loader />;

  if (!passport) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/employer/discovery')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Talent Discovery
        </button>
        <EmptyState title="Candidate Not Found" description="Could not locate candidate passport in database." />
      </div>
    );
  }

  const skills = passport.skills || [];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/employer/discovery')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-ink-soft hover:text-ink transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Talent Discovery
      </button>

      {/* Candidate Profile Header */}
      <GlassCard className="p-6 sm:p-10 border-cover/20 shadow-xl bg-white/90">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-cover">
                  {passport.headline || 'Verified Candidate'}
                </h1>
                <Badge variant="proof" size="md">
                  Completion: {passport.profileCompleteness || 80}%
                </Badge>
                {passport.availability && (
                  <Badge variant="success" size="sm" dot>
                    Available Now
                  </Badge>
                )}
              </div>

              <p className="text-sm text-ink-soft mt-1">{passport.summary || 'Verified Candidate Dossier in MongoDB'}</p>
              <div className="flex items-center gap-4 mt-3 text-xs font-mono text-ink-soft">
                <span>Location: {passport.location || 'Remote'}</span>
                <span>•</span>
                <span>User ID: #{passport.userId?.slice(-6) || id?.slice(-6)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              icon={MessageSquare}
              onClick={() => navigate('/employer/messages')}
            >
              Message
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={Send}
              onClick={() => setShowOfferModal(true)}
            >
              Extend Direct Offer
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Skills */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-cover flex items-center gap-2">
          <Cpu className="w-5 h-5 text-gold" /> Verified Skills ({skills.length})
        </h2>

        {skills.length === 0 ? (
          <EmptyState title="No Skills Recorded" description="Candidate has not added verified skill stamps yet." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, idx) => (
              <GlassCard key={idx} className="p-5 flex flex-col justify-between hover:border-gold/40">
                <div>
                  <h3 className="text-sm font-bold text-cover">{skill.name}</h3>
                  <span className="text-xs text-gold-dark font-mono mt-0.5 block">{skill.proficiency || 'Proficient'}</span>
                </div>
                <div className="pt-2 border-t border-cover/10 mt-3 flex justify-between items-center text-[10px] font-mono text-ink-soft">
                  <span>Status: {skill.verified ? '✓ Verified' : 'Self-declared'}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Direct Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <GlassCard className="max-w-lg w-full p-6 sm:p-8 border-cover/30 shadow-2xl space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-cover">Extend Direct Escrow Offer</h3>
                <p className="text-xs text-ink-soft">To Candidate ID: #{passport.userId?.slice(-6)}</p>
              </div>
              <button
                onClick={() => setShowOfferModal(false)}
                className="text-ink-soft hover:text-ink"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-cover block mb-1">Role Requisition</label>
                <input
                  type="text"
                  value={offerRole}
                  onChange={(e) => setOfferRole(e.target.value)}
                  className="w-full bg-cover/5 border border-cover/15 rounded-xl p-2.5 text-xs text-cover focus:outline-none focus:border-gold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cover block mb-1">Total Escrow Commitment (INR)</label>
                <input
                  type="text"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="w-full bg-cover/5 border border-cover/15 rounded-xl p-2.5 text-xs text-cover focus:outline-none focus:border-gold"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowOfferModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" loading={sendingOffer}>
                  Send Offer &amp; Vault
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default EmployerTalentProfile;
export { EmployerTalentProfile };
