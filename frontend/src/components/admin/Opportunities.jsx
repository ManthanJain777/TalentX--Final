import React from 'react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import { SpotlightCard } from '../react-bits/SpotlightCard';

const AdminOpportunities = () => {
  const listings = [
    {
      id: 'opp-01',
      title: 'High-Throughput Payment Core Architect',
      employer: 'NeoBank Systems Inc.',
      budget: '₹1.12 Cr - ₹1.36 Cr',
      bounty: '₹28K Paid Challenge',
      status: 'approved',
    },
    {
      id: 'opp-02',
      title: 'Distributed Kafka Event Stream Lead',
      employer: 'AeroVance AI Systems',
      budget: '₹1.04 Cr - ₹1.28 Cr',
      bounty: '₹40K Paid Challenge',
      status: 'approved',
    },
    {
      id: 'opp-03',
      title: 'Unverified Scope Listing',
      employer: 'Unknown Startup',
      budget: '₹40L',
      bounty: '₹0',
      status: 'review',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
          Opportunity Moderation
        </h2>
        <p className="text-xs text-ink-soft">
          Review posted roles, verified employer challenge bounties, and escrow coverage
        </p>
      </div>

      <div className="space-y-4">
        {listings.map((opp) => (
          <SpotlightCard spotlightColor="rgba(199, 168, 104, 0.1)" key={opp.id} className="p-6 bg-white/90 border-cover/15 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs text-cover font-sans">{opp.employer}</span>
                  <StatusBadge status={opp.status} />
                </div>
                <h3 className="font-display text-xl font-bold text-cover">{opp.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm">
                  Flag / Unpublish
                </Button>
                <Button type="button" variant="primary" size="sm">
                  Approve Listing
                </Button>
              </div>
            </div>

            <div className="flex gap-4 text-xs font-mono text-ink-soft pt-2 border-t border-cover/8">
              <span>Budget: <strong className="text-cover">{opp.budget}</strong></span>
              <span>Bounty: <strong className="text-gold-dark">{opp.bounty}</strong></span>
            </div>
          </SpotlightCard>
        ))}
      </div>

    </div>
  );
};

export default AdminOpportunities;
export { AdminOpportunities };
