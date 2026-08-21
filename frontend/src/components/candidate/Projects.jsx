import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import HealthIndicator from '../project/HealthIndicator';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';
import { SpotlightCard } from '../react-bits/SpotlightCard';
import { ShinyText } from '../react-bits/ShinyText';
import { DecryptedText } from '../react-bits/DecryptedText';

const CandidateProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        toast.error('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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

  const filteredProjects = projects.filter(p => filter === 'All' || p.status === filter);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">
            <ShinyText text="My Projects" speed={2.5} shineColor="#C7A868" className="!text-cover block" />
          </h2>
          <p className="text-sm text-ink-soft mt-1 font-mono">Manage your active engagements</p>
        </div>
        <div className="flex gap-4 p-4 glass-2 rounded-xl border border-ink/5">
          <div className="text-center px-4 border-r border-ink/10">
            <p className="text-2xl font-mono text-ink font-bold">{projects.filter(p => p.status === 'Active').length}</p>
            <p className="text-[10px] uppercase tracking-wider text-ink-faint">Active</p>
          </div>
          <div className="text-center px-4 border-r border-ink/10">
            <p className="text-2xl font-mono text-ink font-bold">{projects.filter(p => p.status === 'Completed').length}</p>
            <p className="text-[10px] uppercase tracking-wider text-ink-faint">Completed</p>
          </div>
          <div className="text-center px-4">
            <p className="text-2xl font-mono text-gold font-bold">{projects.length}</p>
            <p className="text-[10px] uppercase tracking-wider text-ink-faint">Total</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {['All', 'Active', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filter === tab
                ? 'bg-cover text-white shadow-sm'
                : 'bg-white/60 text-ink-soft hover:bg-white border border-cover/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState title="No Projects Found" description="You have no projects matching this filter." />
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id || project._id} variants={item}>
              <SpotlightCard className="p-6 flex flex-col h-full transition-all duration-300 hover:border-gold-soft/30 hover:shadow-xl hover:shadow-gold/5" spotlightColor="rgba(199, 168, 104, 0.1)">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div className="min-w-0">
                    <span className="px-2.5 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-mono border border-gold/20 uppercase tracking-wider mb-2 inline-block">
                      {project.status}
                    </span>
                    <h4 className="font-display font-semibold text-lg text-ink truncate group-hover:text-gold transition-colors">{project.title}</h4>
                    <div className="flex items-center gap-1.5 text-sm text-ink-soft mt-1">
                      <Building2 className="w-3.5 h-3.5 text-gold" />
                      <span className="truncate">{project.employerId || project.client}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-ink-faint uppercase tracking-wider font-mono">Budget</p>
                    <p className="text-lg font-mono font-bold text-ink"><DecryptedText text={`₹${(project.totalBudget || project.budget || 0).toLocaleString()}`} animateOn="hover" /></p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 pb-6 border-b border-ink/5">
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <Calendar className="w-4 h-4 text-ink-faint" />
                    <span>Due: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <HealthIndicator status={project.healthScore > 80 ? 'green' : project.healthScore > 50 ? 'yellow' : 'red'} />
                </div>

                <div className="mt-4 pt-2">
                  <Link 
                    to={`/candidate/projects/${project.id || project._id}`}
                    className="w-full py-2.5 rounded-xl border border-cover/10 text-cover hover:bg-gold hover:border-gold hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2 group/btn shadow-sm"
                  >
                    View Workspace
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

export default CandidateProjects;
