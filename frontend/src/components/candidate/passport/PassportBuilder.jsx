import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PassportHeader from './PassportHeader';
import SkillManager from './SkillManager';
import EvidenceTabs from './EvidenceTabs';
import PrivacyControls from './PrivacyControls';
import PassportPreview from './PassportPreview';

const PassportBuilder = () => {
  // Central state for the entire passport
  const [passportData, setPassportData] = useState({
    name: 'Anika R.',
    headline: 'Backend Engineer',
    location: 'Bengaluru, IN',
    skills: [
      { name: 'Java', proficiency: 'Expert', verified: true },
      { name: 'React', proficiency: 'Advanced', verified: true },
      { name: 'System Design', proficiency: 'Advanced', verified: false },
      { name: 'Spring Boot', proficiency: 'Expert', verified: true },
      { name: 'MongoDB', proficiency: 'Advanced', verified: true },
    ],
    github: {
      connected: true,
      username: 'anikacodes',
      repos: ['ecommerce-api', 'auth-service', 'payment-gateway'],
      prsMerged: 34,
      stars: 127,
    },
    certifications: [
      { name: 'Oracle Java Certified', issuer: 'Oracle', verified: true },
      { name: 'AWS Developer Associate', issuer: 'AWS', verified: false },
    ],
    projects: [
      {
        title: 'E-commerce API',
        description: 'RESTful API with Spring Boot and MongoDB',
        link: 'https://github.com/...',
        evidence: 'GitHub',
      },
      {
        title: 'Real-time Dashboard',
        description: 'React + WebSocket dashboard',
        link: 'https://github.com/...',
        evidence: 'GitHub',
      },
    ],
    assessments: [
      { name: 'Java Core', score: 92, completed: true },
      { name: 'System Design', score: 78, completed: true },
    ],
    privacy: {
      public: true,
      showCompensation: false,
      allowDirectInvites: true,
      discoverable: true,
    },
    profileCompletion: 72,
  });

  const updateField = (field, value) => {
    setPassportData((prev) => ({ ...prev, [field]: value }));
  };

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
            github={passportData.github}
            certifications={passportData.certifications}
            projects={passportData.projects}
            assessments={passportData.assessments}
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
            privacy={passportData.privacy}
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
