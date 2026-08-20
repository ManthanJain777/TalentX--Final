import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  GitBranch,
  FileCheck,
  Send,
  Zap,
} from 'lucide-react';
import api from '../../api/api';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import StatusBadge from '../common/StatusBadge';
import Tabs from '../common/Tabs';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';
import toast from 'react-hot-toast';

const CandidateProfile = () => {
  const { id } = useParams();
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('skills');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await api.get(`/passports/${id}`);
          setPassport(res.data);
        }
      } catch (err) {
        console.error('Error loading candidate passport:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  const handleSendInvite = (e) => {
    e.preventDefault();
    setInviteModalOpen(false);
    toast.success('Direct invitation sent to candidate!');
  };

  const handleSendChallenge = (e) => {
    e.preventDefault();
    setChallengeModalOpen(false);
    toast.success('Paid Challenge dispatched to candidate!');
  };

  if (loading) return <Loader />;

  if (!passport) {
    return (
      <div className="space-y-6">
        <Link
          to="/employer/discovery"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Talent Discovery
        </Link>
        <EmptyState title="Candidate Not Found" description="Could not load candidate passport from database." />
      </div>
    );
  }

  const skills = passport.skills || [];
  const projects = passport.projects || [];
  const assessments = passport.assessments || [];
  const certifications = passport.certifications || [];

  const tabs = [
    { id: 'skills', label: `Skills (${skills.length})`, icon: GitBranch },
    { id: 'assessments', label: `Verified Labs (${assessments.length})`, icon: Award },
    { id: 'certifications', label: `Certifications (${certifications.length})`, icon: ShieldCheck },
    { id: 'projects', label: `Projects (${projects.length})`, icon: FileCheck },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/employer/discovery"
            className="p-2 rounded-xl bg-white hover:bg-cover/5 border border-cover/15 text-cover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink-soft font-bold">CANDIDATE #{passport.userId?.slice(-6) || id?.slice(-6)}</span>
              <StatusBadge status={passport.availability ? 'available' : 'engaged'} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
              {passport.headline || 'Candidate Dossier'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            onClick={() => setChallengeModalOpen(true)}
            variant="gold"
            size="sm"
            icon={Zap}
          >
            Commission Challenge
          </Button>
          <Button
            type="button"
            onClick={() => setInviteModalOpen(true)}
            variant="primary"
            size="sm"
            icon={Send}
          >
            Send Direct Invitation
          </Button>
        </div>
      </div>

      {/* Parchment Dossier Card */}
      <div className="parchment-sheet rounded-2xl p-6 sm:p-10 border-2 border-gold/40 shadow-xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Avatar & Vitals */}
          <div className="lg:col-span-4 bg-[#EAE1CB] border border-gold-dark/35 rounded-xl p-5 text-center">
            <Avatar name={passport.headline || 'Candidate'} size="xl" verified={passport.availability} className="mx-auto mb-3" />
            <h3 className="font-display text-2xl font-bold text-[#1A160F]">{passport.headline || 'Candidate'}</h3>
            <p className="text-xs font-mono font-bold text-[#5A4822] mt-0.5">
              Location: {passport.location || 'Remote'}
            </p>

            <div className="mt-4 pt-4 border-t border-gold-dark/25 text-left font-mono text-xs text-[#4A3D23] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#736243]">Completeness:</span>
                <span className="font-bold text-[#1A160F]">{passport.profileCompleteness || 70}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#736243]">Availability:</span>
                <span className="font-bold text-verified">{passport.availability ? 'Available' : 'Engaged'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Skills & Bio */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#5A4822] tracking-wider uppercase block mb-1">
                VERIFIED EXECUTIVE SUMMARY
              </span>
              <p className="text-sm text-[#3E3523] leading-relaxed font-sans">
                {passport.summary || 'No summary entered yet.'}
              </p>
            </div>

            {/* Stamped Skill Chips */}
            <div>
              <span className="font-mono text-xs font-bold text-[#5A4822] tracking-wider uppercase block mb-3">
                VERIFIED CAPABILITY STAMPS ({skills.length})
              </span>
              {skills.length === 0 ? (
                <p className="text-xs text-[#736243] italic">No skills recorded yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((s, index) => (
                    <div
                      key={s.name || index}
                      className="bg-white border-1.5 border-gold-dark/35 rounded-lg p-3 flex items-center justify-between shadow-xs"
                    >
                      <div>
                        <div className="font-bold text-xs text-[#1A160F] font-sans">{s.name}</div>
                        <div className="font-mono text-[10px] text-[#00876C] font-bold mt-0.5">{s.verified ? 'VERIFIED' : 'ATTESTED'}</div>
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

        {/* Evidence Verification Tabs */}
        <div className="mt-10 pt-8 border-t-2 border-gold-dark/30">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

          {activeTab === 'skills' && (
            <div>
              {skills.length === 0 ? (
                <EmptyState title="No Skills" description="No verified skills in this candidate dossier." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {skills.map((s, i) => (
                    <div key={s.name || i} className="bg-white border border-gold-dark/25 p-4 rounded-xl space-y-2">
                      <span className="font-mono font-bold text-xs text-[#1A160F] block">{s.name}</span>
                      <div className="font-mono text-[11px] font-bold text-[#00876C] pt-2 border-t border-black/5">{s.proficiency}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'assessments' && (
            <div>
              {assessments.length === 0 ? (
                <EmptyState title="No Labs" description="No verified lab assessments completed." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assessments.map((a, i) => (
                    <div key={a.name || i} className="bg-white border border-gold-dark/25 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-xs text-[#1A160F]">{a.name}</span>
                        <span className="badge-verified text-[10px] font-mono font-bold px-2 py-0.5 rounded">SCORE: {a.score}%</span>
                      </div>
                      <p className="text-xs text-[#5A4822]">{a.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'certifications' && (
            <div>
              {certifications.length === 0 ? (
                <EmptyState title="No Certifications" description="No certifications on record." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((c, i) => (
                    <div key={c.name || i} className="bg-white border border-gold-dark/25 p-4 rounded-xl flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cover text-gold">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-[#1A160F]">{c.name}</h5>
                        <div className="text-[10px] font-mono text-[#00876C] font-semibold">{c.issuer || 'Verified Credential'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              {projects.length === 0 ? (
                <EmptyState title="No Projects" description="No project deliverables on record." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((p, i) => (
                    <div key={p.title || i} className="bg-white border border-gold-dark/25 p-4 rounded-xl space-y-1.5">
                      <div className="flex justify-between">
                        <span className="font-bold text-xs text-[#1A160F]">{p.title}</span>
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

      {/* Direct Invitation Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Send Direct Opportunity Invitation"
        subtitle={`Candidate ID #${passport.userId?.slice(-6) || id?.slice(-6)}`}
      >
        <form onSubmit={handleSendInvite} className="space-y-4">
          <Input
            label="Opportunity / Role"
            id="role"
            placeholder="e.g. Senior Backend Engineer"
            required
          />
          <Input
            label="Proposed Compensation / Rate"
            id="rate"
            placeholder="e.g. ₹10.00K/hr or ₹1.20 Cr/yr"
            required
          />
          <Input
            label="Personalized Message"
            id="note"
            placeholder="Introduce the project and terms..."
            required
          />
          <div className="flex justify-end gap-2.5 pt-3 border-t border-cover/10">
            <Button type="button" onClick={() => setInviteModalOpen(false)} variant="outline" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={Send}>
              Dispatch Invitation
            </Button>
          </div>
        </form>
      </Modal>

      {/* Paid Challenge Modal */}
      <Modal
        isOpen={challengeModalOpen}
        onClose={() => setChallengeModalOpen(false)}
        title="Commission Paid Challenge"
        subtitle="Fund bounty in escrow for candidate verification"
      >
        <form onSubmit={handleSendChallenge} className="space-y-4">
          <Input
            label="Challenge Title"
            id="cTitle"
            placeholder="e.g. Distributed Concurrency Benchmark"
            required
          />
          <Input
            label="Bounty Amount (INR)"
            id="bounty"
            placeholder="e.g. ₹25,000"
            required
          />
          <div className="flex justify-end gap-2.5 pt-3 border-t border-cover/10">
            <Button type="button" onClick={() => setChallengeModalOpen(false)} variant="outline" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="sm" icon={Zap}>
              Deposit Escrow &amp; Send Challenge
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default CandidateProfile;
export { CandidateProfile };
