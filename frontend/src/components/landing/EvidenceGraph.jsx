import React from 'react';
import { GitBranch, Award, Terminal, ShieldCheck, CheckCircle2 } from 'lucide-react';

const EvidenceGraph = () => {
  const evidenceNodes = [
    { name: 'GitHub Repositories', count: '4 Merged PRs', type: 'Code', icon: GitBranch, color: '#5E0ED7' },
    { name: 'Standardized Assessments', count: 'Top 5% Score', type: 'Algorithm', icon: Award, color: '#00D4AA' },
    { name: 'Production Projects', count: '2 Live Artifacts', type: 'System', icon: Terminal, color: '#F5B042' },
    { name: 'Verified Certifications', count: 'L3 Cryptographic', type: 'Credential', icon: ShieldCheck, color: '#3B82F6' },
  ];

  const targetSkills = [
    { name: 'Java Backend', score: '95%', connectedTo: ['GitHub Repositories', 'Standardized Assessments'] },
    { name: 'Spring Boot APIs', score: '88%', connectedTo: ['GitHub Repositories', 'Production Projects'] },
    { name: 'MongoDB Architecture', score: '82%', connectedTo: ['Production Projects', 'Verified Certifications'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase text-[#6B7280] font-bold">
          EVIDENCE-TO-SKILL PROOF GRAPH
        </span>
        <span className="text-xs text-[#00876C] bg-[#00D4AA]/10 px-2.5 py-0.5 rounded-full font-semibold">
          All Nodes Verified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Evidence Sources */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#4B4B56] block">Verified Evidence Sources</span>
          {evidenceNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.name}
                className="p-3.5 rounded-xl bg-[#F8F8FA] border border-black/[0.06] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs"
                    style={{ backgroundColor: node.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1A2E]">{node.name}</h4>
                    <span className="text-[11px] text-[#6B7280]">{node.count}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#00876C] bg-[#00D4AA]/15 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column: Verified Skill Mappings */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#4B4B56] block">Mapped Verified Skills</span>
          {targetSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-4 rounded-xl bg-[#F8F8FA] border border-[#5E0ED7]/20 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1A2E]">{skill.name}</span>
                <span className="text-xs font-mono font-bold text-[#5E0ED7]">{skill.score}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skill.connectedTo.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 bg-white border border-black/[0.06] rounded text-[10px] text-[#4B4B56] font-mono"
                  >
                    ← {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvidenceGraph;
export { EvidenceGraph };
