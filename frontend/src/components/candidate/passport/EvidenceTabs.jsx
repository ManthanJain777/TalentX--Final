import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Award, Code2, FileText, ExternalLink, Plus, Check, UploadCloud, Link as LinkIcon, Calendar, Image as ImageIcon, Clock } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const tabs = [
  { id: 'github', label: 'GitHub', icon: GitBranch },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'assessments', label: 'Assessments', icon: FileText },
];

const EvidenceTabs = ({
  github = { connected: false, repos: [] },
  certifications = [],
  projects = [],
  assessments = [],
  updateGithub,
  updateCertifications,
  updateProjects,
  updateAssessments
}) => {
  const [activeTab, setActiveTab] = useState('github');

  const [isConnectingGithub, setIsConnectingGithub] = useState(false);
  const [githubUsername, setGithubUsername] = useState('');

  const [isAddingCert, setIsAddingCert] = useState(false);
  const [certForm, setCertForm] = useState({ name: '', issuer: '' });

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', link: '' });
  const [techInput, setTechInput] = useState('');
  const [projectTechs, setProjectTechs] = useState([]);

  const handleConnectGithub = () => {
    if (githubUsername.trim()) {
      updateGithub({
        connected: true,
        username: githubUsername,
        repos: ['talent-match-api', 'frontend-dashboard', 'auth-service', 'design-system'],
        prsMerged: 42,
        stars: 128,
      });
      setIsConnectingGithub(false);
    }
  };

  const handleAddCert = () => {
    if (certForm.name.trim()) {
      updateCertifications([
        ...certifications,
        { ...certForm, verified: false, dateObtained: new Date().getFullYear().toString() }
      ]);
      setCertForm({ name: '', issuer: '' });
      setIsAddingCert(false);
    }
  };

  const handleAddProject = () => {
    if (projectForm.title.trim()) {
      updateProjects([
        ...projects,
        { ...projectForm, technologies: projectTechs.length > 0 ? projectTechs : ['React', 'Node.js'] }
      ]);
      setProjectForm({ title: '', description: '', link: '' });
      setProjectTechs([]);
      setIsAddingProject(false);
    }
  };

  const addTech = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      if (!projectTechs.includes(techInput.trim())) {
        setProjectTechs([...projectTechs, techInput.trim()]);
      }
      setTechInput('');
    }
  };

  const removeTech = (tech) => {
    setProjectTechs(projectTechs.filter(t => t !== tech));
  };

  const handleStartAssessment = (idx) => {
    const updated = [...assessments];
    updated[idx] = { ...updated[idx], completed: true, score: Math.floor(Math.random() * 20) + 80 };
    updateAssessments(updated);
  };

  // Ensure assessments has defaults if empty
  const displayAssessments = assessments.length > 0 ? assessments : [
    { name: 'Core JavaScript Concepts', completed: false, score: 0, duration: '45 mins', type: 'Coding' },
    { name: 'React Architecture', completed: false, score: 0, duration: '60 mins', type: 'System Design' },
    { name: 'Backend Data Modeling', completed: false, score: 0, duration: '90 mins', type: 'Architecture' }
  ];

  return (
    <div className="glass-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-display font-semibold text-ink">Verified Evidence</h3>
          <p className="text-xs font-mono text-ink-faint mt-1">Upload and link your real-world proof</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-display text-gold">
            {(github.repos?.length || 0) + certifications.length + projects.length + displayAssessments.filter(a => a.completed).length}
          </span>
          <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Total Sources</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-cover/5 border border-cover/10 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap relative ${
                isActive
                  ? 'text-ink shadow-sm'
                  : 'text-ink-faint hover:text-ink hover:bg-white/30'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm border border-cover/5"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : ''}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'github' && (
            <div className="space-y-4">
              {!github.connected && !isConnectingGithub && (
                <div className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-ink/10 hover:border-ink/20 transition-colors bg-cover/5 group cursor-pointer" onClick={() => setIsConnectingGithub(true)}>
                  <div className="w-16 h-16 rounded-full bg-[#24292F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl">
                    <GithubIcon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-display font-semibold text-ink mb-1">Link GitHub Account</h4>
                  <p className="text-sm text-ink-faint text-center max-w-sm">Automatically sync your public repositories, verify your commit history, and generate insights.</p>
                </div>
              )}

              {isConnectingGithub && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#0D1117] border border-[#30363D] shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2EA043] to-transparent opacity-50" />
                  <GithubIcon className="w-12 h-12 text-white mb-4" />
                  <h4 className="text-white font-semibold mb-2">Connect your GitHub</h4>
                  <p className="text-[#8B949E] text-sm mb-6 text-center max-w-sm">TalentX will analyze your public repositories, PRs, and commit history to verify your technical skills.</p>
                  
                  <div className="w-full max-w-sm flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E] font-mono text-sm">github.com/</span>
                      <input
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        placeholder="username"
                        className="w-full bg-[#010409] border border-[#30363D] text-white rounded-lg pl-[90px] pr-3 py-2.5 text-sm focus:outline-none focus:border-[#58A6FF] transition-colors"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleConnectGithub()}
                      />
                    </div>
                    <button onClick={handleConnectGithub} className="px-5 py-2.5 rounded-lg bg-[#238636] hover:bg-[#2EA043] text-white font-medium text-sm transition-colors border border-[rgba(240,246,252,0.1)]">
                      Authorize
                    </button>
                  </div>
                  <button onClick={() => setIsConnectingGithub(false)} className="mt-5 text-[#8B949E] text-xs hover:text-white transition-colors uppercase tracking-wider font-semibold">Cancel</button>
                </motion.div>
              )}

              {github.connected && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[#0D1117] border border-[#30363D] relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2EA043]/10 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none" />
                    <div className="flex items-center gap-4 relative">
                      <div className="w-12 h-12 rounded-full bg-[#24292F] flex items-center justify-center border border-[#30363D]">
                        <GithubIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">@{github.username}</p>
                        <p className="text-sm text-[#8B949E] flex items-center gap-2">
                          <Check className="w-3 h-3 text-[#2EA043]" /> Verified Identity
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 mt-4 sm:mt-0 relative">
                      <div className="text-center">
                        <p className="text-2xl font-display text-white">{github.repos?.length}</p>
                        <p className="text-[10px] text-[#8B949E] uppercase tracking-wider font-mono">Repos</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-display text-white">{github.prsMerged}</p>
                        <p className="text-[10px] text-[#8B949E] uppercase tracking-wider font-mono">PRs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-display text-white">{github.stars}</p>
                        <p className="text-[10px] text-[#8B949E] uppercase tracking-wider font-mono">Stars</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(github.repos || []).map((repo) => (
                      <span
                        key={repo}
                        className="px-4 py-1.5 rounded-full bg-cover/5 border border-cover/10 text-sm font-mono text-ink-soft flex items-center gap-2 hover:border-gold-soft/30 hover:bg-gold/5 transition-colors cursor-default"
                      >
                        <GitBranch className="w-3 h-3 text-gold" /> {repo}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="space-y-4">
              <AnimatePresence>
                {isAddingCert && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 rounded-2xl border border-gold-soft/30 bg-cover/5 backdrop-blur-md space-y-5 shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
                    
                    <h4 className="text-base font-display font-semibold text-gold flex items-center gap-2">
                      <Award className="w-4 h-4" /> Add New Certification
                    </h4>
                    
                    {/* Upload Dropzone */}
                    <div className="w-full border-2 border-dashed border-ink/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gold-soft/50 hover:bg-gold-soft/5 transition-colors group bg-white/30">
                      <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-gold/10 transition-all">
                        <UploadCloud className="w-6 h-6 text-gold" />
                      </div>
                      <p className="text-sm font-medium text-ink">Upload Certificate PDF or Image</p>
                      <p className="text-xs text-ink-faint mt-1">Required for verification (max. 5MB)</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Certification Name</label>
                        <input
                          value={certForm.name}
                          onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                          placeholder="e.g., AWS Certified Developer"
                          className="w-full bg-white/60 border border-ink/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Issuing Organization</label>
                        <input
                          value={certForm.issuer}
                          onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                          placeholder="e.g., Amazon Web Services"
                          className="w-full bg-white/60 border border-ink/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Credential ID (Optional)</label>
                        <div className="relative">
                          <Award className="w-4 h-4 text-ink-faint absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            placeholder="e.g., 9F8D7C6B"
                            className="w-full bg-white/60 border border-ink/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Issue Date</label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-ink-faint absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="month"
                            className="w-full bg-white/60 border border-ink/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all text-ink"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Credential URL (Optional)</label>
                      <div className="relative">
                        <LinkIcon className="w-4 h-4 text-ink-faint absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          placeholder="https://verify.example.com/..."
                          className="w-full bg-white/60 border border-ink/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 mt-2">
                      <button onClick={() => setIsAddingCert(false)} className="px-5 py-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors">Cancel</button>
                      <button onClick={handleAddCert} className="px-6 py-2 rounded-xl bg-gradient-to-r from-gold to-gold-soft text-white text-sm font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all flex items-center gap-2">
                        <Check className="w-4 h-4" /> Save Certificate
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isAddingCert && (
                <button onClick={() => setIsAddingCert(true)} className="w-full py-4 rounded-2xl border-2 border-dashed border-ink/15 text-ink-soft font-medium text-sm hover:border-gold-soft/50 hover:bg-gold-soft/5 hover:text-gold transition-all flex items-center justify-center gap-2 group">
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" /> Add Certification
                </button>
              )}

              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-cover/10 gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-cover/5 flex items-center justify-center shrink-0 border border-cover/10">
                    <Award className="w-6 h-6 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-ink truncate">{cert.name}</p>
                    <p className="text-sm text-ink-soft flex items-center gap-2">
                      {cert.issuer} <span className="w-1 h-1 rounded-full bg-ink/20" /> {cert.dateObtained || 'Recent'}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                    cert.verified
                      ? 'bg-verified/10 text-verified border border-verified/20'
                      : 'bg-pending/10 text-pending border border-pending/20'
                  }`}>
                    {cert.verified ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {cert.verified ? 'Verified' : 'Verifying...'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <AnimatePresence>
                {isAddingProject && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 rounded-2xl border border-gold-soft/30 bg-cover/5 backdrop-blur-md space-y-5 shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
                    
                    <h4 className="text-base font-display font-semibold text-gold flex items-center gap-2">
                      <Code2 className="w-4 h-4" /> Add Project Evidence
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="col-span-1">
                        <div className="w-full h-full min-h-[140px] border-2 border-dashed border-ink/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gold-soft/50 hover:bg-gold-soft/5 transition-colors group bg-white/30 p-4 text-center">
                          <ImageIcon className="w-8 h-8 text-ink-faint mb-2 group-hover:text-gold transition-colors" />
                          <p className="text-xs font-medium text-ink">Upload Cover</p>
                          <p className="text-[10px] text-ink-faint mt-1">High-res thumbnail</p>
                        </div>
                      </div>
                      
                      <div className="col-span-1 sm:col-span-2 space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Project Title</label>
                          <input
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="e.g., E-Commerce Microservices Architecture"
                            className="w-full bg-white/60 border border-ink/10 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all"
                            autoFocus
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Project URL</label>
                          <div className="relative">
                            <LinkIcon className="w-4 h-4 text-ink-faint absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              value={projectForm.link}
                              onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                              placeholder="https://github.com/... or Live Demo"
                              className="w-full bg-white/60 border border-ink/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Description (What you built & your impact)</label>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Describe the architecture, your role, and the outcomes..."
                        rows="3"
                        className="w-full bg-white/60 border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all resize-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">Technologies Used (Press Enter to add)</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <AnimatePresence>
                          {projectTechs.map((tech) => (
                            <motion.span
                              key={tech}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono font-medium flex items-center gap-1 border border-gold/20"
                            >
                              {tech} <button onClick={() => removeTech(tech)} className="hover:text-red-500 ml-1">×</button>
                            </motion.span>
                          ))}
                        </AnimatePresence>
                      </div>
                      <input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={addTech}
                        placeholder="e.g., React, PostgreSQL, Docker..."
                        className="w-full bg-white/60 border border-ink/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2 mt-2">
                      <button onClick={() => setIsAddingProject(false)} className="px-5 py-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors">Cancel</button>
                      <button onClick={handleAddProject} className="px-6 py-2 rounded-xl bg-gradient-to-r from-gold to-gold-soft text-white text-sm font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all flex items-center gap-2">
                        <Code2 className="w-4 h-4" /> Save Project
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isAddingProject && (
                <button onClick={() => setIsAddingProject(true)} className="w-full py-4 rounded-2xl border-2 border-dashed border-ink/15 text-ink-soft font-medium text-sm hover:border-gold-soft/50 hover:bg-gold-soft/5 hover:text-gold transition-all flex items-center justify-center gap-2 group">
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" /> Add Project Evidence
                </button>
              )}

              {projects.map((project, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-cover/10 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold text-ink">{project.title}</h4>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-cover/5 text-xs text-ink-soft font-medium hover:bg-gold-soft hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Live
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-ink-soft mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map(tech => (
                      <span key={tech} className="px-2.5 py-1 rounded-md bg-ink/5 text-ink-soft font-mono text-[10px] border border-ink/5 group-hover:border-ink/10 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 flex items-start gap-3 mb-6">
                <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-gold">TalentX Certified Assessments</h4>
                  <p className="text-xs text-gold/80 mt-1">Complete these rigorous, proctored assessments to instantly boost your Passport's matching algorithm score.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayAssessments.map((assessment, i) => (
                  <div key={i} className={`flex flex-col p-5 rounded-2xl border transition-all ${assessment.completed ? 'bg-verified/5 border-verified/20' : 'bg-white border-cover/10 hover:shadow-lg'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="px-2 py-1 rounded-md bg-cover/5 text-[10px] font-mono text-ink-soft uppercase tracking-wider mb-2 inline-block">
                          {assessment.type}
                        </span>
                        <h4 className="text-base font-semibold text-ink leading-tight">{assessment.name}</h4>
                      </div>
                      {assessment.completed ? (
                        <div className="w-12 h-12 rounded-full bg-verified/10 flex flex-col items-center justify-center border border-verified/20">
                          <span className="text-sm font-display font-bold text-verified">{assessment.score}</span>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-cover/5 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-ink-faint" />
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-ink/5 flex items-center justify-between">
                      <span className="text-xs text-ink-faint flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {assessment.duration}
                      </span>
                      {assessment.completed ? (
                        <span className="text-xs font-semibold text-verified flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleStartAssessment(i)}
                          className="px-4 py-1.5 rounded-lg bg-ink text-white text-xs font-medium hover:bg-gold-soft transition-colors shadow-sm"
                        >
                          Start Exam
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EvidenceTabs;
