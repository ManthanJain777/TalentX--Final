import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Award, Code2, FileText, ExternalLink } from 'lucide-react';

const tabs = [
  { id: 'github', label: 'GitHub', icon: GitBranch },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'assessments', label: 'Assessments', icon: FileText },
];

const EvidenceTabs = ({
  github,
  certifications,
  projects,
  assessments,
}) => {
  const [activeTab, setActiveTab] = useState('github');

  return (
    <div className="glass-2 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-ink">Evidence</h3>
        <span className="text-xs font-mono text-gold">
          {github.repos.length + certifications.length + projects.length + assessments.filter(a => a.completed).length} sources
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-ink/5 border border-ink/5 mb-4 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'bg-white text-ink shadow-sm'
                  : 'text-ink-faint hover:text-ink hover:bg-white/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'github' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-ink/5 border border-ink/5 gap-3">
              <div>
                <p className="text-sm font-medium text-ink">
                  {github.connected ? `@${github.username}` : 'Connect GitHub'}
                </p>
                {github.connected && (
                  <p className="text-xs text-ink-faint">
                    {github.repos.length} repos · {github.prsMerged} PRs merged · {github.stars} stars
                  </p>
                )}
              </div>
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  github.connected
                    ? 'bg-verified/10 text-verified border border-verified/20'
                    : 'bg-gold text-white hover:bg-gold-soft'
                }`}
              >
                {github.connected ? 'Connected ✓' : 'Connect GitHub'}
              </button>
            </div>
            {github.connected && (
              <div className="flex flex-wrap gap-2">
                {github.repos.map((repo) => (
                  <span
                    key={repo}
                    className="px-3 py-1 rounded-full bg-white/50 border border-ink/5 text-xs font-mono text-ink-faint"
                  >
                    {repo}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-ink/5 border border-ink/5 gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{cert.name}</p>
                  <p className="text-xs text-ink-faint">{cert.issuer}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-mono whitespace-nowrap ${
                  cert.verified
                    ? 'bg-verified/10 text-verified border border-verified/20'
                    : 'bg-pending/10 text-pending border border-pending/20'
                }`}>
                  {cert.verified ? 'Verified ✓' : 'Pending'}
                </span>
              </div>
            ))}
            <button className="w-full py-2 rounded-xl border-2 border-dashed border-ink/10 text-ink-faint text-sm hover:border-gold-soft/30 hover:text-gold transition-colors">
              + Add Certification
            </button>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-3">
            {projects.map((project, i) => (
              <div key={i} className="p-3 rounded-xl bg-ink/5 border border-ink/5">
                <p className="text-sm font-medium text-ink">{project.title}</p>
                <p className="text-xs text-ink-faint">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gold hover:text-gold-soft flex items-center gap-1 mt-1 inline-flex"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Evidence
                </a>
              </div>
            ))}
            <button className="w-full py-2 rounded-xl border-2 border-dashed border-ink/10 text-ink-faint text-sm hover:border-gold-soft/30 hover:text-gold transition-colors">
              + Add Project
            </button>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="space-y-3">
            {assessments.map((assessment, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-ink/5 border border-ink/5">
                <div>
                  <p className="text-sm font-medium text-ink">{assessment.name}</p>
                  <p className="text-xs text-ink-faint">{assessment.completed ? 'Completed' : 'Not started'}</p>
                </div>
                {assessment.completed ? (
                  <span className="text-sm font-mono text-gold">{assessment.score}%</span>
                ) : (
                  <button className="px-4 py-1.5 rounded-lg bg-gold text-white text-xs font-medium hover:bg-gold-soft transition-colors">
                    Start
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EvidenceTabs;
