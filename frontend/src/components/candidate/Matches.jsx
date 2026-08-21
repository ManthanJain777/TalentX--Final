import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';
import { SpotlightCard } from '../react-bits/SpotlightCard';
import { ShinyText } from '../react-bits/ShinyText';
import MatchScore from '../ui/MatchScore';

const Matches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (user?.id) {
          const response = await api.get(`/matches/candidate/${user.id}`);
          setMatches(Array.isArray(response.data) ? response.data : []);
        } else {
          setMatches([]);
        }
      } catch (err) {
        console.error('Error fetching matches:', err);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [user]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-ink">
          <ShinyText text="My Matches" speed={2.5} shineColor="#C7A868" className="!text-cover block" />
        </h2>
        <p className="text-sm text-ink-soft mt-1 font-mono">Opportunities matched to your Talent Passport in MongoDB</p>
      </div>

      {loading ? <Loader /> : matches.length === 0 ? (
        <EmptyState 
          title="No Matches Found" 
          description="You currently have no matched opportunities in the database." 
        />
      ) : (
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4"
      >
        {matches.map((match, idx) => (
          <motion.div key={match.id || idx} variants={item}>
            <SpotlightCard className="p-6 flex flex-col h-full relative group transition-all duration-300 hover:border-gold-soft/30 hover:shadow-xl hover:shadow-gold/5" spotlightColor="rgba(199, 168, 104, 0.1)">
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {match.status === 'PENDING' && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pending/10 text-pending text-[10px] font-mono border border-pending/20">
                    <Clock className="w-3 h-3" /> Pending Review
                  </span>
                )}
                {match.status === 'ACCEPTED' && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-verified/10 text-verified text-[10px] font-mono border border-verified/20">
                    <CheckCircle className="w-3 h-3" /> Accepted
                  </span>
                )}
                {match.status === 'REJECTED' && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink/5 text-ink-faint text-[10px] font-mono border border-ink/10">
                    Declined
                  </span>
                )}
              </div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-2">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-ink group-hover:text-gold transition-colors">
                        {match.opportunityTitle || `Opportunity #${match.opportunityId?.slice(-6) || idx + 1}`}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-ink-soft">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4 text-gold" />
                          {match.employerName || 'Employer'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Score */}
              <div className="mb-4">
                <MatchScore score={Math.round(match.totalScore || match.matchScore || 0)} size="sm" />
              </div>

              {/* Action */}
              <div className="mt-auto">
                <Link 
                  to={`/candidate/matches/${match.id}`}
                  className="w-full py-2.5 rounded-xl border border-cover/10 text-cover hover:bg-gold hover:border-gold hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2 group/btn shadow-sm"
                >
                  View Details
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
      )}
    </div>
  );
};

export default Matches;
