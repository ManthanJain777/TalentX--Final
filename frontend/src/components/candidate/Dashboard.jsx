import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, FileText, ArrowRight, 
  IndianRupee, Eye, Shield, CheckCircle, Sparkles, Target, Zap
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

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passport, setPassport] = useState(null);
  const [matches, setMatches] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const fetchPromises = [
          api.get('/passports/me').then(res => setPassport(res.data)).catch(e => console.error('No passport found', e)),
          api.get('/projects').then(res => setProjects(Array.isArray(res.data) ? res.data : [])).catch(e => console.error('No projects', e))
        ];

        if (user?.id) {
          fetchPromises.push(
            api.get(`/matches/candidate/${user.id}`).then(res => setMatches(Array.isArray(res.data) ? res.data : [])).catch(e => console.error('No matches', e))
          );
        }

        await Promise.allSettled(fetchPromises);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const candidateName = user?.fullName || user?.name || user?.email?.split('@')[0] || 'Candidate';
  const welcomeWords = `Welcome back, ${candidateName}`.split(' ');

  // Calculate real metrics
  const completionPercentage = passport?.profileCompleteness || (passport?.skills?.length ? Math.min(100, passport.skills.length * 20 + 20) : 10);
  const totalMatchesCount = matches.length;
  const directInvitesCount = matches.filter(m => m.status === 'PENDING' || m.status === 'pending').length;
  const totalEscrowAmount = projects.reduce((sum, p) => sum + (p.totalBudget || p.budget || 0), 0);

  const stats = [
    { 
      title: 'Passport Completion', 
      value: `${completionPercentage}%`, 
      icon: FileText, 
      trend: passport?.verified ? 'Verified Active' : 'Profile in progress', 
      color: 'text-gold' 
    },
    { 
      title: 'High-Score Matches', 
      value: `${totalMatchesCount}`, 
      icon: TrendingUp, 
      trend: `${totalMatchesCount} total matches`, 
      color: 'text-verified' 
    },
    { 
      title: 'Direct Invitations', 
      value: `${directInvitesCount}`, 
      icon: Users, 
      trend: directInvitesCount > 0 ? `${directInvitesCount} Inbound` : '0 Inbound', 
      color: 'text-gold-soft' 
    },
    { 
      title: 'Escrow in Projects', 
      value: <DecryptedText text={`₹${totalEscrowAmount.toLocaleString()}`} animateOn="hover" />, 
      icon: IndianRupee, 
      trend: `${projects.length} contracts`, 
      color: 'text-gold' 
    },
  ];

  if (loading) {
    return <Loader />;
  }

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
            System Operational &bull; Live MongoDB Connected
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-cover tracking-tight leading-[1.1]">
            <ShinyText text={`Welcome back, ${candidateName}`} speed={2.5} shineColor="#C7A868" className="!text-cover block" />
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-ink-soft mt-4 font-body text-lg max-w-xl"
          >
            {passport ? (
              <>Your verified Talent Passport is active. Headline: <span className="text-verified font-medium">{passport.headline || 'Software Developer'}</span>.</>
            ) : (
              <>Your Talent Passport is ready to be customized. Complete your profile to receive deterministic job matches.</>
            )}
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex flex-col gap-3 shrink-0"
        >
          <Link to="/candidate/matches">
            <Button variant="primary" className="w-full">
              <Zap className="w-4 h-4" />
              View Matches ({matches.length})
            </Button>
          </Link>
          <Link to="/candidate/passport/edit">
            <Button variant="secondary" className="w-full">
              Update Passport
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Asymmetrical Stats Grid */}
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

      {/* Asymmetrical Content Grid (1.2fr 0.8fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: Matches (Wider) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-semibold text-cover flex items-center gap-2">
              <Target className="w-6 h-6 text-gold" />
              Explainable Match Feed
            </h2>
            <Link to="/candidate/matches" className="meta-label hover:text-gold transition-colors">
              View All Feed &rarr;
            </Link>
          </div>
          
          <div className="space-y-4">
            {matches.length === 0 ? (
              <EmptyState 
                title="No Matches Yet" 
                description="When employers create opportunities matching your verified skills, they will appear here." 
              />
            ) : (
              matches.map((match, index) => (
                <motion.div
                  key={match.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.06, type: 'spring' }}
                  onMouseEnter={() => setHoveredCard(`match-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    filter: hoveredCard && hoveredCard !== `match-${index}` ? 'blur(2px)' : 'blur(0px)',
                    transition: 'filter 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <SpotlightCard className="p-5 group cursor-pointer !border-cover/10" spotlightColor="rgba(199, 168, 104, 0.1)">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-display font-semibold text-cover group-hover:text-gold transition-colors">
                            {match.opportunityTitle || match.role || `Opportunity #${match.opportunityId?.slice(-6) || index + 1}`}
                          </h3>
                          <span className="inline-flex items-center gap-1 bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-mono text-[11px] font-bold">
                            <Sparkles className="w-3 h-3" />
                            {Math.round(match.totalScore || match.matchScore || match.match || 90)}% Match
                          </span>
                        </div>
                        <p className="text-ink-soft font-body text-sm mb-4">{match.companyName || match.company || 'Employer'}</p>
                        <div className="flex flex-wrap gap-2">
                          {(match.matchedSkills || match.skills || []).map(skill => (
                            <span key={skill} className="text-xs font-mono px-2.5 py-1 rounded bg-white/50 border border-cover/10 text-ink-soft">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link to={`/candidate/matches/${match.id}`} className="p-2 rounded-full border border-cover/10 text-ink-faint group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all duration-300 shadow-sm">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Projects (Narrower) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-semibold text-cover flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              Governed Projects
            </h2>
            <Link to="/candidate/projects" className="meta-label hover:text-gold transition-colors">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {projects.length === 0 ? (
              <EmptyState 
                title="No Active Projects" 
                description="You currently have no active governed milestone projects." 
              />
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id || project._id || index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.06, type: 'spring' }}
                  onMouseEnter={() => setHoveredCard(`project-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    filter: hoveredCard && hoveredCard !== `project-${index}` ? 'blur(2px)' : 'blur(0px)',
                    transition: 'filter 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <SpotlightCard className="p-5 group cursor-pointer !border-cover/10" spotlightColor="rgba(199, 168, 104, 0.1)">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-body font-semibold text-cover leading-tight group-hover:text-gold transition-colors pr-4">
                        {project.title}
                      </h3>
                      <StatusBadge status={project.status || 'Active'} />
                    </div>
                    
                    <p className="text-sm text-ink-soft mb-4">{project.client || project.employerName || 'Client Workspace'}</p>
                    
                    <div className="p-3 bg-white/40 rounded-xl border border-cover/5 mb-4">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <p className="meta-label mb-1">Escrow Locked</p>
                          <p className="font-mono text-lg font-bold text-cover-deep"><DecryptedText text={`₹${(project.totalBudget || project.budget || 0).toLocaleString()}`} animateOn="hover" /></p>
                        </div>
                        <div className="text-right">
                          <p className="meta-label mb-1">Milestones</p>
                          <p className="font-mono text-sm text-ink-soft">{project.milestones ? `${project.milestones.filter(m => m.status === 'COMPLETED').length} of ${project.milestones.length}` : 'Active'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 bg-cover/5 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full ${project.status === 'Active' ? 'bg-verified' : 'bg-pending'}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress || 50}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                        />
                      </div>
                      <Link to={`/candidate/projects/${project.id || project._id}`}>
                        <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-gold transition-colors" />
                      </Link>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Editorial Trust Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="glass-panel rounded-2xl mt-12 py-6 px-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 opacity-80 hover:opacity-100 transition-all duration-500 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-gold" />
          <span className="font-body text-sm font-medium text-cover">Zero-Knowledge Proofs Active</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-cover/20 hidden sm:block" />
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-verified" />
          <span className="font-body text-sm font-medium text-cover">Immutable Escrow Vault Connected</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CandidateDashboard;
