import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, IndianRupee, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import ChallengeTimer from '../challenges/ChallengeTimer';
import ChallengeSubmission from '../challenges/ChallengeSubmission';
import ChallengeLeaderboard from '../challenges/ChallengeLeaderboard';
import Loader from '../ui/Loader';

const CandidateChallengeDetail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
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
        setChallenge(c);
        
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

  if (loading || !challenge) return <Loader />;

  const isClosed = challenge.status !== 'open';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Nav */}
      <div className="flex items-center gap-4">
        <Link to="/candidate/challenges" className="p-2 hover:bg-white/50 rounded-full transition-colors text-ink-soft">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-sm font-mono text-ink-faint">Back to Challenges</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border uppercase mb-4 inline-block ${
            isClosed ? 'bg-ink/5 text-ink-soft border-ink/10' : 'bg-gold/10 text-gold border-gold/20'
          }`}>
            {challenge.status}
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-ink leading-tight">{challenge.title}</h1>
          <p className="text-lg text-ink-soft mt-2 flex items-center gap-2">
            by {challenge.employerId || challenge.employer}
          </p>
        </div>
        <div className="flex flex-col gap-4 shrink-0 items-start md:items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-ink-soft uppercase tracking-wider">Prize Pool:</span>
            <span className="text-2xl font-mono font-bold text-gold flex items-center">
              <IndianRupee className="w-5 h-5" />{challenge.prize}
            </span>
          </div>
          {!isClosed && <ChallengeTimer deadline={challenge.deadline} />}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 md:p-8">
            <h3 className="font-display font-semibold text-xl text-ink mb-4">Task Description</h3>
            <p className="text-ink-soft leading-relaxed">{challenge.description}</p>
            
            <h4 className="font-medium text-ink mt-8 mb-3">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {challenge.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/40 border border-ink/5 text-sm text-ink font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Action Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {!isClosed ? (
              <ChallengeSubmission challenge={challenge} />
            ) : (
              <ChallengeLeaderboard submissions={submissions} winners={challenge.winners || []} />
            )}
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
            <h3 className="font-display font-semibold text-lg text-ink mb-4">Challenge Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-ink/5">
                <span className="text-sm text-ink-soft">Submissions</span>
                <span className="font-mono text-ink font-medium flex items-center gap-1.5"><Users className="w-4 h-4 text-ink-faint"/> {challenge.submissions}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-ink/5">
                <span className="text-sm text-ink-soft">Created Date</span>
                <span className="font-mono text-ink">{challenge.createdAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-soft">Time Allowed</span>
                <span className="font-mono text-ink">48 Hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CandidateChallengeDetail;
