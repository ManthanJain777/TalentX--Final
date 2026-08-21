import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PassportHeader from './PassportHeader';
import SkillManager from './SkillManager';
import EvidenceTabs from './EvidenceTabs';
import PrivacyControls from './PrivacyControls';
import PassportPreview from './PassportPreview';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/api';

const PassportBuilder = () => {
  const { user } = useAuth();
  // Central state for the entire passport
  const [passportData, setPassportData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          skills: [],
          github: { connected: false, username: '', repos: [], prsMerged: 0, stars: 0 },
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
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Left Column: Editor */}
      <div className="xl:col-span-2 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PassportHeader
            name={passportData.name}
            headline={passportData.headline}
            location={passportData.location}
            setName={(val) => updateField('name', val)}
            setHeadline={(val) => updateField('headline', val)}
            setLocation={(val) => updateField('location', val)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SkillManager
            skills={passportData.skills}
            setSkills={(val) => updateField('skills', val)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EvidenceTabs
            github={passportData.github || { connected: false, repos: [] }}
            certifications={passportData.certifications || []}
            projects={passportData.projects || []}
            assessments={passportData.assessments || []}
            updateGithub={(val) => updateField('github', val)}
            updateCertifications={(val) => updateField('certifications', val)}
            updateProjects={(val) => updateField('projects', val)}
            updateAssessments={(val) => updateField('assessments', val)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PrivacyControls
            privacy={passportData.privacy || { public: false, discoverable: false, showCompensation: false, allowDirectInvites: false }}
            setPrivacy={(val) => updateField('privacy', val)}
          />
        </motion.div>
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
