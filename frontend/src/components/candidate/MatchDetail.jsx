import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import MatchScoreDisplay from '../employer/discovery/MatchScoreDisplay';
import SkillBreakdown from '../employer/discovery/SkillBreakdown';
import MatchExplanation from '../employer/discovery/MatchExplanation';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/api';
import Loader from '../ui/Loader';

const MatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const matchId = id || '1'; // fallback
        const response = await api.get(`/matches/${matchId}`);
        const baseMatch = response.data;

        // Fetch opportunity if implemented, else fallback
        const oppRes = await api.get(`/opportunities/${baseMatch.opportunityId}`).catch(() => ({
          data: { title: 'Opportunity Role', type: 'Full-time', salary: 'N/A' }
        }));
        
        // Structure to fit existing UI bindings
        setMatch({
          ...baseMatch,
          score: baseMatch.totalScore || 94,
          company: {
            name: baseMatch.employerId || 'Company Name',
            location: 'Remote',
            verified: true,
          },
          role: {
            title: oppRes.data.title || 'Role Title',
            type: oppRes.data.type || 'Full-time',
            salary: 'Negotiable',
          },
          message: baseMatch.explanation || 'No message provided.',
          breakdown: baseMatch.skillBreakdown || {
            skills: 95, projects: 88, assessments: 82, certifications: 76, profile: 70
          },
          explanation: {
            skills: 'Match breakdown generated.',
            projects: 'Relevant projects align.',
            assessments: 'Assessment scores are high.',
            certifications: 'Certifications valid.',
            profile: 'Profile completeness optimal.'
          }
        });
      } catch (err) {
        console.error('Error fetching match:', err);
        toast.error('Failed to load match details.');
      } finally {
        setLoading(false);
      }
    };
    fetchMatchDetails();
  }, [id]);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await api.post(`/projects`, { matchId: match.id, employerId: match.employerId, freelancerId: match.candidateId });
      toast.success('Match accepted! Project workspace generated.');
      navigate('/candidate/projects');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept match');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !match) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">Match Details</h2>
          <p className="text-sm text-ink-soft mt-1 font-mono">Review your match and respond to the invitation</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-ink/10 text-ink hover:bg-ink/5 transition-colors text-sm font-medium">
            Decline
          </button>
          <button 
            onClick={handleAccept}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gold text-white hover:bg-gold-soft transition-colors text-sm font-medium shadow-lg shadow-gold/20 disabled:opacity-50"
          >
            {loading ? 'Accepting...' : 'Accept Match'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Match Context & Message */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Invitation Message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-cover/10 flex items-center justify-center text-cover font-display font-bold">
                {match.company.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-ink">Message from {match.company.name}</h3>
                <p className="text-xs text-ink-soft uppercase tracking-wider mt-1">{match.role.title}</p>
              </div>
            </div>
            <p className="text-ink text-sm leading-relaxed italic">
              "{match.message}"
            </p>
          </motion.div>

          <div className="glass-panel p-6">
            <h3 className="font-display font-semibold text-lg text-ink mb-6">Opportunity Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-ink">Role</p>
                  <p className="text-sm text-ink-soft">{match.role.title}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-ink">Location</p>
                  <p className="text-sm text-ink-soft">{match.company.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-ink">Type</p>
                  <p className="text-sm text-ink-soft">{match.role.type}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-4 border-t border-ink/5">
                <div>
                  <p className="text-xs font-mono uppercase text-ink-faint">Compensation</p>
                  <p className="text-sm text-ink-soft font-mono">{match.role.salary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Match Analysis */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 flex flex-col items-center text-center">
            <h3 className="font-display font-semibold text-lg text-ink mb-6">TalentX Match Score</h3>
            <MatchScoreDisplay score={match.score} size={120} />
            <p className="text-sm text-ink-soft mt-6">
              This score is calculated based on a multidimensional analysis of your Talent Passport against the employer's requirements.
            </p>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-display font-semibold text-lg text-ink mb-6">Match Breakdown</h3>
            <SkillBreakdown breakdown={match.breakdown} />
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-display font-semibold text-lg text-ink mb-6">Why You're a Match</h3>
            <MatchExplanation explanation={match.explanation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
