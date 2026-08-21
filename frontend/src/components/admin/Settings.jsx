import React, { useState } from 'react';
import {
  Sliders,
  Lock,
  Cpu,
  Save } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../ui/GlassCard';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { SpotlightCard } from '../react-bits/SpotlightCard';

const AdminSettings = () => {
  const [protocolFee, setProtocolFee] = useState('0.0'); // 0% for employers, platform sponsored
  const [disputeArbitrationFee, setDisputeArbitrationFee] = useState('2.5');
  const [aiMatchThreshold, setAiMatchThreshold] = useState('80');
  const [zkQuorum, setZkQuorum] = useState('3 of 5');
  const [autoDisputeGraceHours, setAutoDisputeGraceHours] = useState('168'); // 7 days

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Protocol governance parameters committed on-chain!', {
      style: { background: '#1A1A2E', color: '#FFF', border: '1px solid #5E0ED7' }
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-purple-400" /> Protocol Governance Settings
        </h2>
        <p className="text-xs text-white/50 mt-1">
          Adjust smart contract fees, zero-knowledge verification node quorums, and AI matching parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Protocol Fees */}
        <SpotlightCard spotlightColor="rgba(199, 168, 104, 0.1)" className="p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-white/[0.08] pb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" /> Economic & Smart Contract Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Standard Employer Protocol Take Rate (%)"
              value={protocolFee}
              onChange={(e) => setProtocolFee(e.target.value)}
              helperText="Zero-fee model for active hiring partners"
            />
            <Input
              label="Dispute Arbitration Escrow Holdback (%)"
              value={disputeArbitrationFee}
              onChange={(e) => setDisputeArbitrationFee(e.target.value)}
              helperText="Reserved only in contested arbitration cases"
            />
          </div>

          <Input
            label="Automated Milestone Escrow Auto-Release Window (Hours)"
            value={autoDisputeGraceHours}
            onChange={(e) => setAutoDisputeGraceHours(e.target.value)}
            helperText="168 hours = 7 calendar days before uncontested deliverable auto-releases."
          />
        </SpotlightCard>

        {/* AI & ZK Node Consensus */}
        <SpotlightCard spotlightColor="rgba(199, 168, 104, 0.1)" className="p-6 sm:p-8 space-y-4 border-purple-500/30">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" /> AI Match & Node Consensus Quorum
            </h3>
            <Badge variant="proof" size="sm">ZK Multi-Sig</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Minimum Explainable AI Match Threshold (%)"
              value={aiMatchThreshold}
              onChange={(e) => setAiMatchThreshold(e.target.value)}
              helperText="Opportunities below this vector similarity are excluded from candidate top matches."
            />
            <Input
              label="ZK Verifier Multi-sig Quorum"
              value={zkQuorum}
              onChange={(e) => setZkQuorum(e.target.value)}
              helperText="Signatures required to mint on-chain skill badges."
            />
          </div>
        </SpotlightCard>

        <div className="flex justify-end">
          <Button type="submit" variant="glow" size="lg" icon={Save}>
            Commit Governance Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
export { AdminSettings };
