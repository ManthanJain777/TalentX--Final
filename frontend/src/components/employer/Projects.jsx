import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, User } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import HealthIndicator from '../project/HealthIndicator';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const EmployerProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        const mapped = response.data.map(p => ({
          id: p.id,
          title: p.title || 'Project',
          client: p.employerId,
          freelancer: p.freelancerId || 'Pending Assignment',
          budget: p.totalBudget || 0,
          status: p.status || 'Active',
          startDate: p.createdAt ? new Date(p.createdAt).toISOString().split('T')[0] : 'N/A',
          endDate: p.deadline ? new Date(p.deadline).toISOString().split('T')[0] : 'N/A',
          health: p.healthScore > 80 ? 'green' : p.healthScore > 50 ? 'yellow' : 'red',
        }));
        setProjects(mapped);
      } catch (err) {
        console.error('Error fetching projects:', err);
        toast.error('Failed to load governed projects.');
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

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">Governed Projects</h2>
          <p className="text-sm text-ink-soft mt-1 font-mono">Manage your active freelance teams</p>
        </div>
        <div className="flex gap-4 p-4 glass-panel rounded-xl border border-ink/5">
          <div className="text-center px-4 border-r border-ink/10">
            <p className="text-2xl font-mono text-ink font-bold">{projects.filter(p => p.status === 'OPEN').length}</p>
            <p className="text-[10px] uppercase tracking-wider text-ink-faint">Open</p>
          </div>
          <div className="text-center px-4 border-r border-ink/10">
            <p className="text-2xl font-mono text-ink font-bold">{projects.filter(p => p.status !== 'OPEN' && p.status !== 'COMPLETED').length}</p>
            <p className="text-[10px] uppercase tracking-wider text-ink-faint">In Progress</p>
          </div>
          <div className="text-center px-4">
            <p className="text-2xl font-mono text-gold font-bold">{projects.filter(p => p.status === 'COMPLETED').length}</p>
            <p className="text-[10px] uppercase tracking-wider text-ink-faint">Completed</p>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <EmptyState title="No Projects Found" description="You have not governed any projects yet." />
      ) : (
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={item}>
            <div className="glass-panel p-6 flex flex-col h-full transition-all duration-300 hover:border-gold-soft/30 hover:shadow-xl hover:shadow-gold/5">
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="min-w-0">
                  <span className="px-2.5 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-mono border border-gold/20 uppercase tracking-wider mb-2 inline-block">
                    {project.status}
                  </span>
                  <h4 className="font-display font-semibold text-lg text-ink truncate">{project.title}</h4>
                  <div className="flex items-center gap-1.5 text-sm text-ink-soft mt-1">
                    <User className="w-3.5 h-3.5 text-gold" />
                    <span className="truncate">{project.freelancer}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-ink-faint uppercase tracking-wider font-mono">Budget</p>
                  <p className="text-lg font-mono font-bold text-ink">₹{project.budget.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-6 pb-6 border-b border-ink/5">
                <div className="flex items-center gap-2 text-xs text-ink-soft">
                  <Calendar className="w-4 h-4 text-ink-faint" />
                  <span>Due: {project.endDate !== 'N/A' ? project.endDate : 'Not set'}</span>
                </div>
                <HealthIndicator status={project.health} />
              </div>

              <div className="mt-4 pt-2">
                <Link 
                  to={`/employer/projects/${project.id}`}
                  className="w-full py-2.5 rounded-xl border border-ink/10 text-ink hover:bg-gold hover:border-gold hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2 group/btn"
                >
                  Manage Project
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      )}
    </div>
  );
};

export default EmployerProjects;
