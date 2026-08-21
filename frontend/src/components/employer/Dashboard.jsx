import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, Briefcase, Shield, IndianRupee, Eye, Search, Target, CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/api';
import GlassCard from '../common/GlassCard';
import StatsCard from '../common/StatsCard';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../ui/EmptyState';
import Loader from '../ui/Loader';
import { SpotlightCard } from '../react-bits/SpotlightCard';
import { ShinyText } from '../react-bits/ShinyText';
import { DecryptedText } from '../react-bits/DecryptedText';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        setLoading(true);
        
        const fetchPromises = [
          api.get('/projects').then(res => setProjects(Array.isArray(res.data) ? res.data : [])).catch(e => console.error('No projects', e)),
          api.get('/discovery/candidates').then(res => setCandidates(Array.isArray(res.data) ? res.data : [])).catch(e => console.error('No candidates in discovery', e))
        ];

        if (user?.id) {
          fetchPromises.push(
            api.get(`/challenges/employer/${user.id}`).then(res => setChallenges(Array.isArray(res.data) ? res.data : [])).catch(e => console.error('No challenges for employer yet', e))
          );
        }

        await Promise.allSettled(fetchPromises);

      } catch (err) {
        console.error('Error fetching employer dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, [user]);

  const companyName = user?.companyName || user?.fullName || 'Employer Workspace';
  const welcomeWords = `Welcome back, ${companyName}`.split(' ');

  const totalEscrow = projects.reduce((sum, p) => sum + (p.totalBudget || p.budget || 0), 0);

  const stats = [
    { title: 'Open Challenges', value: `${challenges.length}`, icon: Briefcase, trend: `${challenges.filter(c => c.status === 'OPEN').length} active`, color: 'text-gold' },
    { title: 'Talent Pool in DB', value: `${candidates.length}`, icon: Users, trend: `${candidates.filter(c => c.available).length} available`, color: 'text-verified' },
    { title: 'Governed Projects', value: `${projects.length}`, icon: Shield, trend: `${projects.filter(p => p.status === 'Active').length} active`, color: 'text-gold-soft' },
    { title: 'Escrow Vault', value: <DecryptedText text={`₹${totalEscrow.toLocaleString()}`} animateOn="hover" />, icon: IndianRupee, trend: 'Protected funds', color: 'text-gold' },
  ];

  if (loading) return <Loader />;

  return (
    <div className="space-y-10">
      {/* Editorial Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="glass-panel rounded-3xl p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
      >
        <div className="max-w-2xl">
          <p className="meta-label mb-3 flex items-center gap-2">
            <span className="dot-verified" />
            Employer Portal &bull; MongoDB Connected
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-cover tracking-tight leading-[1.1]">
            <ShinyText text={`Welcome, ${companyName}`} speed={2.5} shineColor="#C7A868" className="!text-cover block" />
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-ink-soft mt-4 font-body text-lg max-w-xl"
          >
            You have <span className="text-verified font-medium">{challenges.length}</span> active challenges and <span className="text-gold font-medium">{candidates.length}</span> verified candidates available in the talent network.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex flex-col gap-3 shrink-0"
        >
          <Link to="/employer/challenges/new">
            <Button variant="primary" className="w-full">
              <Briefcase className="w-4 h-4" />
              Post New Challenge
            </Button>
          </Link>
          <Link to="/employer/discovery">
            <Button variant="secondary" className="w-full">
              Search Talent
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.06, type: 'spring' }}
          >
            <StatsCard
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              colorClass={stat.color}
              icon={stat.icon}
            />
          </motion.div>
        ))}
      </div>

      {/* Asymmetrical Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: Top Matched Talent */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-semibold text-cover flex items-center gap-2">
              <Target className="w-6 h-6 text-gold" />
              Discovered Candidates
            </h2>
            <Link to="/employer/discovery" className="meta-label hover:text-gold transition-colors">
              Browse All Talent &rarr;
            </Link>
          </div>
          
          <div className="space-y-4">
            {candidates.length === 0 ? (
              <EmptyState 
                title="No Candidates Found" 
                description="No discoverable candidate passports registered in MongoDB yet." 
              />
            ) : (
              candidates.slice(0, 5).map((cand, index) => (
                <motion.div
                  key={cand.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.06, type: 'spring' }}
                  onMouseEnter={() => setHoveredCard(`cand-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    filter: hoveredCard && hoveredCard !== `cand-${index}` ? 'blur(2px)' : 'blur(0px)',
                    transition: 'filter 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <SpotlightCard className="p-5 group cursor-pointer !border-cover/10" spotlightColor="rgba(199, 168, 104, 0.1)">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-display font-semibold text-cover group-hover:text-gold transition-colors">
                            {cand.fullName || 'Verified Candidate'}
                          </h3>
                          <StatusBadge status={cand.available ? 'Available' : 'Engaged'} />
                        </div>
                        <p className="text-ink-soft font-body text-sm">{cand.headline || 'Software Engineer'}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-mono text-2xl font-bold text-cover-deep">{cand.profileCompleteness || 80}%</span>
                        <span className="meta-label">Completeness</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-cover/5 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {(cand.skills || []).map(skill => (
                          <span key={skill} className="text-xs font-mono px-2.5 py-1 rounded bg-white/50 border border-cover/10 text-ink-soft">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Link to={`/employer/talent/${cand.id}`}>
                        <Button variant="ghost" className="!px-3 !py-1.5 !text-xs">
                          <Eye className="w-4 h-4 mr-1" /> View Passport
                        </Button>
                      </Link>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Protocol Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-semibold text-cover flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-gold" />
              Quick Actions
            </h2>
          </div>

          <GlassCard className="p-6 space-y-3">
            <Link to="/employer/challenges/new" className="block">
              <Button variant="secondary" className="w-full justify-start">
                <Briefcase className="w-4 h-4 text-gold" />
                Post Bounty Challenge
              </Button>
            </Link>
            <Link to="/employer/discovery" className="block">
              <Button variant="secondary" className="w-full justify-start">
                <Search className="w-4 h-4 text-gold" />
                Query Candidate Passports
              </Button>
            </Link>
            <Link to="/employer/projects" className="block">
              <Button variant="secondary" className="w-full justify-start">
                <Shield className="w-4 h-4 text-gold" />
                Inspect Governed Projects ({projects.length})
              </Button>
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
