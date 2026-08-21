import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, IndianRupee, Trophy, ExternalLink, Users, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import ChallengeTimer from '../challenges/ChallengeTimer';
import ChallengeLeaderboard from '../challenges/ChallengeLeaderboard';
import Loader from '../ui/Loader';

const EmployerChallengeDetail = () => {
  const { id } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [challengeState, setChallengeState] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const [chalRes, subRes] = await Promise.all([
          api.get(`/challenges/${id}`),
          api.get(`/challenges/${id}/submissions`).catch(() => ({ data: [] }))
        ]);
        
        const c = chalRes.data;
        setChallengeState({
          ...c,
          id: c.id || c._id,
          prize: c.prizeAmount || c.prize || 0,
          status: c.status || 'open',
          winners: c.winners || [],
        });
        
        setSubmissions(subRes.data.map(s => ({
          ...s,
          candidate: s.candidateId || 'Candidate',
          submittedAt: s.createdAt || new Date().toISOString()
        })));
      } catch (err) {
        console.error('Error fetching challenge:', err);
        toast.error('Failed to load challenge details.');
      } finally {
        setLoading(false);
      }
    };
    fetchChallengeData();
  }, [id]);

  const handleSelectWinner = (sub) => {
    setSelectedWinner(sub);
    setShowConfirm(true);
  };

  const confirmWinner = () => {
    setChallengeState({
      ...challengeState,
      status: 'closed',
      winners: [{ candidate: selectedWinner.candidate, submittedAt: selectedWinner.submittedAt }]
    });
    setShowConfirm(false);
    toast.success('Winner selected successfully!');
  };

  if (loading || !challengeState) return <Loader />;

  const isClosed = challengeState.status !== 'open';

  return (
    <div className="max-w-5xl mx-auto space-y-8 relative">
      <div className="flex items-center gap-4">
        <Link to="/employer/challenges" className="p-2 hover:bg-white/50 rounded-full transition-colors text-ink-soft">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-sm font-mono text-ink-faint">Back to Challenges</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border uppercase mb-4 inline-block ${
            isClosed ? 'bg-verified/10 text-verified border-verified/20' : 'bg-gold/10 text-gold border-gold/20'
          }`}>
            {challengeState.status}
          </span>
          <h1 className="text-3xl font-display font-bold text-ink leading-tight">{challengeState.title}</h1>
        </div>
        <div className="flex flex-col gap-4 shrink-0 items-start md:items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-ink-soft uppercase tracking-wider">Escrow Locked:</span>
            <span className="text-2xl font-mono font-bold text-gold flex items-center">
              <IndianRupee className="w-5 h-5" />{challengeState.prize}
            </span>
          </div>
          {!isClosed && <ChallengeTimer deadline={challengeState.deadline} />}
        </div>
      </div>

      {!isClosed ? (
        <div className="space-y-6">
          <h2 className="text-xl font-display font-semibold text-ink flex items-center gap-2">
            <Users className="w-5 h-5 text-gold" /> Pending Submissions ({submissions.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submissions.map((sub, i) => (
              <motion.div key={sub.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-panel p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cover to-cover-deep flex items-center justify-center text-white text-sm font-display shrink-0">
                      {sub.candidate.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink">{sub.candidate}</h4>
                      <p className="text-[10px] font-mono text-ink-faint">{new Date(sub.submittedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/40 p-4 rounded-xl border border-ink/5 mb-6 text-sm text-ink-soft italic">
                  "{sub.comments}"
                </div>
                
                <div className="flex gap-3 mt-auto">
                  <a href={sub.solutionUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-lg border border-ink/10 text-ink text-sm font-medium hover:bg-white transition-colors flex justify-center items-center gap-1.5">
                    View <ExternalLink className="w-4 h-4" />
                  </a>
                  <button onClick={() => handleSelectWinner(sub)} className="flex-1 py-2 rounded-lg bg-gold text-white text-sm font-medium hover:bg-gold-soft transition-colors shadow-lg shadow-gold/20 flex justify-center items-center gap-1.5">
                    <Trophy className="w-4 h-4" /> Select Winner
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-panel p-6 bg-verified/5 border-verified/30 text-center">
            <Trophy className="w-12 h-12 text-verified mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-ink mb-2">Challenge Completed</h2>
            <p className="text-ink-soft">
              The prize of ₹{challengeState.prize} has been released to {challengeState.winners[0].candidate}.
            </p>
          </div>
          <ChallengeLeaderboard submissions={submissions} winners={challengeState.winners} />
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && selectedWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-panel w-full max-w-md p-8 relative z-10 text-center">
              <AlertCircle className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-ink mb-2">Confirm Winner</h3>
              <p className="text-sm text-ink-soft mb-6">
                Are you sure you want to select <strong>{selectedWinner.candidate}</strong>? This will release the ₹{challengeState.prize} from escrow and close the challenge.
              </p>
              <div className="flex gap-4">
                <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-ink/10 text-ink font-medium hover:bg-white/50 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmWinner} className="flex-1 py-2.5 rounded-xl bg-gold text-white font-medium hover:bg-gold-soft transition-colors shadow-lg shadow-gold/20">
                  Confirm & Pay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployerChallengeDetail;
