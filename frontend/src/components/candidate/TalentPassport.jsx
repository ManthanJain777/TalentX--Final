import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  GitBranch,
  FileCheck,
  Plus,
  ExternalLink,
  Edit,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/api';
import Avatar from '../common/Avatar';
import ProgressBar from '../common/ProgressBar';
import Tabs from '../common/Tabs';
import EmptyState from '../ui/EmptyState';
import Loader from '../ui/Loader';

const TalentPassport = () => {
  const { user } = useAuth();
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('github');
  const [availability, setAvailability] = useState(true);
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    const fetchPassport = async () => {
      try {
        setLoading(true);
        const res = await api.get('/passports/me');
        if (res.data) {
          setPassport(res.data);
          setAvailability(res.data.availability ?? true);
          setVisibility(res.data.visibility ?? true);
        }
      } catch (err) {
        console.error('Error fetching passport:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPassport();
  }, []);

  const handleToggleAvailability = async () => {
    const newAvail = !availability;
    setAvailability(newAvail);
    try {
      await api.put('/passports/me', { ...passport, availability: newAvail });
    } catch (e) {
      console.error('Failed to update availability', e);
    }
  };

  const handleToggleVisibility = async () => {
    const newVis = !visibility;
    setVisibility(newVis);
    try {
      await api.put('/passports/me', { ...passport, visibility: newVis });
    } catch (e) {
      console.error('Failed to update visibility', e);
    }
  };

  if (loading) return <Loader />;

  const candidateName = user?.fullName || user?.name || user?.email?.split('@')[0] || 'Candidate';
  const headline = passport?.headline || user?.headline || 'Software Engineer';
  const location = passport?.location || 'Remote';
  const skills = passport?.skills || [];
  const projects = passport?.projects || [];
  const certifications = passport?.certifications || [];
  const assessments = passport?.assessments || [];
  const completeness = passport?.profileCompleteness ?? 0;

  const tabs = [
    { id: 'github', label: `GitHub Evidence (${projects.filter(p => p.evidence === 'GitHub').length})`, icon: GitBranch },
    { id: 'assessments', label: `Verified Labs (${assessments.length})`, icon: Award },
    { id: 'certifications', label: `Certifications (${certifications.length})`, icon: ShieldCheck },
    { id: 'projects', label: `Governed Deliverables (${projects.length})`, icon: FileCheck },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Passport Dossier Card */}
      <div className="parchment-sheet rounded-2xl p-6 sm:p-10 border-2 border-gold/40 shadow-xl relative overflow-hidden">
        
        {/* Background Watermark Crest */}
        <div className="absolute right-6 bottom-6 opacity-5 pointer-events-none" aria-hidden="true">
          <ShieldCheck className="w-80 h-80 text-cover" />
        </div>

        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-gold-dark/30 pb-5 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cover border border-gold/40 flex items-center justify-center text-gold shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-[#5A4822] uppercase tracking-wider">
                TALENTX PROTOCOL IDENTITY DOSSIER
              </div>
              <div className="text-xs font-mono text-[#736243] font-semibold">
                USER ID: #{user?.id?.slice(-8) || 'TX-NEW'} &bull; DB VERIFIED
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/candidate/passport/edit"
              className="btn-primary text-xs py-2 px-3.5 font-bold inline-flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Passport</span>
            </Link>
          </div>
        </div>

        {/* Two-Column Dossier Top Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Biometric Avatar & Verification Key (4 cols) */}
          <div className="lg:col-span-4 bg-[#EAE1CB] border border-gold-dark/35 rounded-xl p-5 text-center">
            <div className="relative inline-block mb-3">
              <Avatar
                name={candidateName}
                size="xl"
                verified={user?.verified ?? false}
                className="mx-auto"
              />
            </div>

            <h3 className="font-display text-2xl font-bold text-[#1A160F]">
              {candidateName}
            </h3>
            <p className="text-xs font-mono font-bold text-[#5A4822] mt-0.5">
              {headline}
            </p>

            <div className="mt-4 pt-4 border-t border-gold-dark/25 text-left font-mono text-xs text-[#4A3D23] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#736243]">Email:</span>
                <span className="font-bold text-[#1A160F] truncate ml-2">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#736243]">Location:</span>
                <span className="font-bold text-[#1A160F]">{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#736243]">Status:</span>
                <span className="font-bold text-verified">{user?.status || 'ACTIVE'}</span>
              </div>
            </div>

            {/* Availability & Visibility Controls */}
            <div className="mt-5 pt-4 border-t border-gold-dark/25 grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={handleToggleAvailability}
                className={`py-1.5 px-2 rounded font-bold border transition-all ${
                  availability
                    ? 'bg-verified/15 text-verified border-verified/40'
                    : 'bg-black/5 text-ink-soft border-black/10'
                }`}
              >
                {availability ? '● AVAILABLE' : '○ PAUSED'}
              </button>

              <button
                type="button"
                onClick={handleToggleVisibility}
                className={`py-1.5 px-2 rounded font-bold border transition-all ${
                  visibility
                    ? 'bg-cover text-white border-cover'
                    : 'bg-black/5 text-ink-soft border-black/10'
                }`}
              >
                {visibility ? '● DISCOVERABLE' : '○ INCOGNITO'}
              </button>
            </div>
          </div>

          {/* Right Column: Verified Skills & Profile Completion (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Bio */}
            <div>
              <span className="font-mono text-xs font-bold text-[#5A4822] tracking-wider uppercase block mb-1">
                EXECUTIVE SUMMARY & PROOF RECORD
              </span>
              <p className="text-sm text-[#3E3523] leading-relaxed font-sans">
                {passport?.summary || passport?.headline || 'No summary provided yet. Click "Edit Passport" to customize your profile summary and skill validations.'}
              </p>
            </div>

            {/* Profile Completion Bar */}
            <div className="bg-[#EAE1CB] p-4 rounded-xl border border-gold-dark/30">
              <div className="flex justify-between items-center text-xs font-mono text-[#5A4822] mb-1.5">
                <span className="font-bold">PASSPORT COMPLETION</span>
                <span className="font-bold text-[#1A160F]">{completeness}% COMPLETE</span>
              </div>
              <ProgressBar value={completeness} max={100} showValue={false} variant="gold" size="md" />
            </div>

            {/* Stamped Skill Chips */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs font-bold text-[#5A4822] tracking-wider uppercase">
                  VERIFIED CAPABILITY STAMPS ({skills.length})
                </span>
                <Link to="/candidate/passport/edit" className="text-xs font-bold text-[#5A4822] hover:text-[#1A160F] inline-flex items-center gap-1 font-mono">
                  <Plus className="w-3 h-3" />
                  <span>Add Skill</span>
                </Link>
              </div>

              {skills.length === 0 ? (
                <div className="bg-white/60 p-4 rounded-lg border border-dashed border-gold-dark/40 text-center">
                  <p className="text-xs text-[#736243]">No skills added to this passport yet.</p>
                  <Link to="/candidate/passport/edit" className="text-xs text-gold-dark font-bold hover:underline mt-1 inline-block">
                    + Add Skills to your Passport
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((s, index) => (
                    <div
                      key={s.name || index}
                      className="bg-white border-1.5 border-gold-dark/35 rounded-lg p-3 flex items-center justify-between shadow-xs"
                    >
                      <div>
                        <div className="font-bold text-xs text-[#1A160F] font-sans">
                          {s.name}
                        </div>
                        <div className="font-mono text-[10px] text-[#00876C] font-bold mt-0.5">
                          {s.verified ? '✓ VERIFIED' : 'SELF ATTESTED'}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-xs text-[#1A160F] bg-black/5 px-2 py-0.5 rounded">
                        {s.proficiency || 'Advanced'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Evidence Verification Tabs & Panels */}
        <div className="mt-10 pt-8 border-t-2 border-gold-dark/30">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

          {/* GitHub Tab */}
          {activeTab === 'github' && (
            <div>
              {projects.length === 0 ? (
                <EmptyState title="No GitHub Repos" description="No GitHub repositories linked to this passport yet." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {projects.map((r, i) => (
                    <div key={r.title || i} className="bg-white border border-gold-dark/25 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-mono font-bold text-xs text-[#1A160F]">{r.title}</span>
                        {r.link && (
                          <a href={r.link} target="_blank" rel="noreferrer">
                            <ExternalLink className="w-3.5 h-3.5 text-[#5A4822]" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-[#5A4822] line-clamp-2 leading-relaxed">{r.description || 'No description provided'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div>
              {assessments.length === 0 ? (
                <EmptyState title="No Assessments" description="No verified lab assessments completed yet." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assessments.map((a, i) => (
                    <div key={a.name || i} className="bg-white border border-gold-dark/25 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-xs text-[#1A160F]">{a.name}</span>
                        <span className="badge-verified text-[10px] font-mono font-bold px-2 py-0.5 rounded">SCORE: {a.score}%</span>
                      </div>
                      <p className="text-xs text-[#5A4822]">{a.description || 'Verified via TALENTX test harness'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div>
              {certifications.length === 0 ? (
                <EmptyState title="No Certifications" description="No certifications added yet." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((c, i) => (
                    <div key={c.name || i} className="bg-white border border-gold-dark/25 p-4 rounded-xl flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cover text-gold shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-xs text-[#1A160F]">{c.name}</h5>
                        <div className="text-[11px] font-mono text-[#5A4822]">{c.issuer || 'Verified Credential'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Governed Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              {projects.length === 0 ? (
                <EmptyState title="No Deliverables" description="No governed project deliverables recorded yet." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((p, i) => (
                    <div key={p.title || i} className="bg-white border border-gold-dark/25 p-4 rounded-xl space-y-1.5">
                      <div className="flex justify-between">
                        <span className="font-bold text-xs text-[#1A160F]">{p.title}</span>
                        <span className="badge-verified text-[10px] font-mono font-bold px-2 py-0.5 rounded">VERIFIED</span>
                      </div>
                      <p className="text-xs text-[#5A4822]">{p.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default TalentPassport;
export { TalentPassport };
