import React, { useState } from 'react';
import { Building, Save, CreditCard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import GlassCard from '../common/GlassCard';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const EmployerSettings = () => {
  const { user } = useAuth();

  const [company, setCompany] = useState(user?.company || 'AeroVance AI Systems');
  const [industry, setIndustry] = useState('Distributed Systems & Autonomous Infrastructure');
  const [location, setLocation] = useState('Seattle, WA');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Company profile & billing preferences updated');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
          Company Settings &amp; Escrow Billing
        </h2>
        <p className="text-xs text-ink-soft">
          Manage company profile details, team permissions, and escrow deposit settings
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Company Profile */}
        <GlassCard className="p-6 bg-white/90 border-cover/15 space-y-4">
          <div className="flex items-center gap-2 border-b border-cover/10 pb-2">
            <Building className="w-4 h-4 text-gold-dark" />
            <h3 className="font-bold text-sm text-cover font-sans">
              1. Company Profile &amp; Verification
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Legal Name"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <Input
              label="Industry / Domain"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
          </div>

          <Input
            label="Headquarters Location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </GlassCard>

        {/* Escrow Billing Balance */}
        <GlassCard className="p-6 bg-white/90 border-cover/15 space-y-4">
          <div className="flex items-center gap-2 border-b border-cover/10 pb-2">
            <CreditCard className="w-4 h-4 text-gold-dark" />
            <h3 className="font-bold text-sm text-cover font-sans">
              2. Escrow Funding &amp; Billing
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-page border border-cover/10 flex justify-between items-center">
            <div>
              <span className="font-mono text-xs text-ink-soft uppercase">Current Available Vault Balance</span>
              <div className="text-2xl font-bold text-cover font-mono">{user?.escrowBalance || '₹75.60L'}</div>
            </div>
            <Button type="button" variant="primary" size="sm">
              Deposit Funds
            </Button>
          </div>
        </GlassCard>

        <div className="flex justify-end gap-3">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Settings
          </Button>
        </div>

      </form>

    </div>
  );
};

export default EmployerSettings;
export { EmployerSettings };
