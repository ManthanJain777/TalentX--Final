import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PassportHeader from './PassportHeader';
import SkillManager from './SkillManager';
import EvidenceTabs from './EvidenceTabs';
import PrivacyControls from './PrivacyControls';
import PassportPreview from './PassportPreview';
import SocialLinksManager from './SocialLinksManager';
import CareerHistoryManager from './CareerHistoryManager';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/api';

const PassportBuilder = () => {
  const { user } = useAuth();
  // Central state for the entire passport
  const [passportData, setPassportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: 'Identity & Socials', desc: 'Basic info and links' },
    { id: 2, title: 'Career History', desc: 'Experience & Education' },
    { id: 3, title: 'Skill Matrix', desc: 'Verified capabilities' },
    { id: 4, title: 'Evidence Vault', desc: 'Projects & Privacy' },
  ];

  React.useEffect(() => {
    const fetchPassport = async () => {
      try {
        const response = await api.get('/passports/me');
        if (response.data) {
          setPassportData({
            ...response.data,
            name: response.data.name || user?.fullName || 'Candidate'
          });
        }
      } catch (err) {
        console.error('Failed to fetch passport', err);
        // Fallback to empty state for new users
        setPassportData({
          name: '',
          headline: '',
          location: '',
          avatarUrl: '',
          socialLinks: { github: '', linkedin: '', portfolio: '' },
          experience: [],
          education: [],
          skills: [],
          certifications: [],
          projects: [],
          assessments: [],
          privacy: { public: true, showCompensation: false, allowDirectInvites: true, discoverable: true },
          profileCompletion: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPassport();
  }, []);

  const updateField = async (field, value) => {
    const updatedData = { ...passportData, [field]: value };
    setPassportData(updatedData);
    try {
      await api.put('/passports/me', updatedData);
    } catch (err) {
      console.error('Failed to update passport on backend', err);
    }
  };

  if (loading || !passportData) {
    return <div className="flex items-center justify-center p-20 text-cover font-medium animate-pulse">Connecting to backend...</div>;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      
      {/* Sidebar Navigation */}
      <div className="xl:col-span-1 space-y-2">
        <h3 className="font-display font-bold text-cover text-lg mb-4">Passport Builder</h3>
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
              activeStep === step.id 
                ? 'bg-cover text-white border-cover shadow-md' 
                : 'bg-white text-ink-soft border-cover/10 hover:border-cover/30 hover:bg-cover/5'
            }`}
          >
            <div className={`font-bold text-sm ${activeStep === step.id ? 'text-white' : 'text-cover'}`}>
              {step.title}
            </div>
            <div className={`text-xs mt-1 ${activeStep === step.id ? 'text-white/80' : 'text-ink-soft'}`}>
              {step.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Main Editor Area */}
      <div className="xl:col-span-2 space-y-6">
        {activeStep === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <PassportHeader
              name={passportData.name}
              headline={passportData.headline}
              location={passportData.location}
              avatarUrl={passportData.avatarUrl}
              setName={(val) => updateField('name', val)}
              setHeadline={(val) => updateField('headline', val)}
              setLocation={(val) => updateField('location', val)}
              setAvatarUrl={(val) => updateField('avatarUrl', val)}
            />
            <SocialLinksManager 
              socialLinks={passportData.socialLinks || { github: '', linkedin: '', portfolio: '' }}
              updateSocialLinks={(val) => updateField('socialLinks', val)}
            />
          </motion.div>
        )}

        {activeStep === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <CareerHistoryManager
              experience={passportData.experience || []}
              education={passportData.education || []}
              updateExperience={(val) => updateField('experience', val)}
              updateEducation={(val) => updateField('education', val)}
            />
          </motion.div>
        )}

        {activeStep === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <SkillManager
              skills={passportData.skills}
              setSkills={(val) => updateField('skills', val)}
            />
          </motion.div>
        )}

        {activeStep === 4 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <EvidenceTabs
              certifications={passportData.certifications || []}
              projects={passportData.projects || []}
              assessments={passportData.assessments || []}
              updateCertifications={(val) => updateField('certifications', val)}
              updateProjects={(val) => updateField('projects', val)}
              updateAssessments={(val) => updateField('assessments', val)}
            />
            <PrivacyControls
              privacy={passportData.privacy || { public: false, discoverable: false, showCompensation: false, allowDirectInvites: false }}
              setPrivacy={(val) => updateField('privacy', val)}
            />
          </motion.div>
        )}
      </div>

      {/* Right Column: Live Preview */}
      <div className="xl:col-span-1">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="sticky top-24"
        >
          <PassportPreview data={passportData} />
        </motion.div>
      </div>
    </div>
  );
};

export default PassportBuilder;
