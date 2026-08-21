import React, { useState } from 'react';
import { Link2, Briefcase, Globe } from 'lucide-react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import GlassCard from '../../common/GlassCard';

const SocialLinksManager = ({ socialLinks, updateSocialLinks }) => {
  const [links, setLinks] = useState(socialLinks || { github: '', linkedin: '', portfolio: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks({ ...links, [name]: value });
  };

  const handleSave = () => {
    updateSocialLinks(links);
  };

  return (
    <GlassCard className="p-6 border-cover/15 shadow-sm space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="w-5 h-5 text-gold" />
        <h3 className="font-bold font-display text-cover text-lg tracking-tight">Social Profiles</h3>
      </div>
      
      <div className="space-y-4">
        <Input
          label="GitHub Profile URL"
          name="github"
          id="github"
          value={links.github}
          onChange={handleChange}
          placeholder="https://github.com/username"
          icon={Globe}
        />
        <Input
          label="LinkedIn Profile URL"
          name="linkedin"
          id="linkedin"
          value={links.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          icon={Briefcase}
        />
        <Input
          label="Personal Portfolio"
          name="portfolio"
          id="portfolio"
          value={links.portfolio}
          onChange={handleChange}
          placeholder="https://myportfolio.com"
          icon={Globe}
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button onClick={handleSave} size="sm" variant="gold">
          Save Links
        </Button>
      </div>
    </GlassCard>
  );
};

export default SocialLinksManager;
