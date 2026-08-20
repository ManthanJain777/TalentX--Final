import React from 'react';

const ComparisonTable = () => {
  const comparisons = [
    {
      dimension: 'Core Action',
      traditional: 'Spam 200+ generic resume PDFs',
      freelance: 'Bid race to the bottom',
      vetting: 'Lengthy manual screening',
      talentx: 'Build 1 Passport · Get discovered',
    },
    {
      dimension: 'Proof Model',
      traditional: 'Self-reported claims on PDF',
      freelance: 'Subjective 5-star reviews',
      vetting: 'Internal quiz score',
      talentx: 'GitHub PRs, test benchmarks, certs',
    },
    {
      dimension: 'Match Transparency',
      traditional: '0% (Black-box ATS rejection)',
      freelance: 'Algorithmic feed ranking',
      vetting: 'Recruiter recommendation',
      talentx: '100% Explainable Score (e.g. 94%)',
    },
    {
      dimension: 'Candidate Control',
      traditional: 'Zero (Data harvested publicly)',
      freelance: 'Subject to algorithmic de-ranking',
      vetting: 'Limited to agency gigs',
      talentx: 'Private by default · Full offer veto',
    },
    {
      dimension: 'Delivery Governance',
      traditional: 'None (Ghosted after apply)',
      freelance: 'Basic time-tracker',
      vetting: 'Agency account manager',
      talentx: 'Escrow vault & G/Y/R Health Engine',
    },
    {
      dimension: 'Early Proof Option',
      traditional: 'Unpaid take-home assignments',
      freelance: 'Low-ball test projects',
      vetting: 'Unpaid technical panels',
      talentx: '₹8K–₹40K Paid Employer Challenges',
    },
  ];

  return (
    <section
      id="comparison"
      className="py-20 sm:py-28 relative overflow-hidden passport-bg"
      aria-label="Why TALENTX Comparison"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="font-mono text-gold text-xs font-bold tracking-widest uppercase mb-2">
            POSITIONING & ARCHITECTURE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            Why TALENTX.
          </h2>
          <p className="text-fog text-base sm:text-lg leading-relaxed">
            Positioned squarely between discovery, execution, and quality signal. Compare our structural differences with legacy models.
          </p>
        </div>

        {/* Ledger Comparison Table */}
        <div className="overflow-x-auto bg-ink-elevated rounded-xl border-1.5 border-gold/30 shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[800px] text-sm">
            <thead>
              <tr className="border-b-2 border-gold/30 bg-[#0E131B]">
                <th className="p-4 sm:p-5 text-fog font-mono text-xs font-bold uppercase">
                  Dimension
                </th>
                <th className="p-4 sm:p-5 text-fog font-semibold text-xs sm:text-sm">
                  Traditional Job Boards
                </th>
                <th className="p-4 sm:p-5 text-fog font-semibold text-xs sm:text-sm">
                  Freelance Platforms
                </th>
                <th className="p-4 sm:p-5 text-fog font-semibold text-xs sm:text-sm">
                  Vetting Agencies
                </th>
                <th className="p-4 sm:p-5 text-gold font-bold text-sm bg-gold/10 border-x border-gold/30">
                  TALENTX PASSPORT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisons.map((row) => (
                <tr key={row.dimension} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-mono font-bold text-white text-xs sm:text-sm">
                    {row.dimension}
                  </td>
                  <td className="p-4 sm:p-5 text-fog text-xs sm:text-sm">
                    {row.traditional}
                  </td>
                  <td className="p-4 sm:p-5 text-fog text-xs sm:text-sm">
                    {row.freelance}
                  </td>
                  <td className="p-4 sm:p-5 text-fog text-xs sm:text-sm">
                    {row.vetting}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-white bg-gold/5 border-x border-gold/20 text-xs sm:text-sm">
                    {row.talentx}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default ComparisonTable;
export { ComparisonTable };
