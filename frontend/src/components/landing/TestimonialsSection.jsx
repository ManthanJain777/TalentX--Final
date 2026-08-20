import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Elena Rostova',
      role: 'Principal ML Infrastructure Engineer',
      company: 'Ex-DeepMind / Stealth AI',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      proof: 'ZK Verified L3 PyTorch',
      content: 'TalentX skipped 5 rounds of generic leetcode exams. My verified cryptographic repo proof let me interview directly with the CTO and start within 48 hours.',
      rating: 5
    },
    {
      name: 'David Sterling',
      role: 'Head of Engineering',
      company: 'AeroVance Autonomous',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      proof: 'Enterprise Client (₹3.36 Cr in Escrow)',
      content: 'We cut our engineering contract onboarding time from 7 weeks to 2 days. The automated milestone escrow and proof metrics are lightyears ahead of legacy portals.',
      rating: 5
    },
    {
      name: 'Priya Narang',
      role: 'Senior Distributed Systems Architect',
      company: 'Polygon / TalentX Verified',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      proof: 'ZK Verified Rust & EVM',
      content: 'No more unpaid take-home assessments. My Proof Passport represents my actual battle-tested code benchmarks. Escrow payments release cleanly every milestone.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge variant="primary" size="md" className="mb-4">
          Verified Testimonials
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Validated by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#BA8DFF]">builders</span>
        </h2>
        <p className="text-white/60 text-sm sm:text-base mt-3">
          Hear from engineers and engineering leaders operating on proof-based agreements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <GlassCard
            key={idx}
            className="p-8 flex flex-col justify-between hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(94,14,215,0.2)] transition-all duration-300 group"
          >
            <div>
              {/* Rating and Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-400 text-purple-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-purple-400/30 group-hover:text-purple-400/70 transition-colors" />
              </div>

              <p className="text-sm text-white/80 leading-relaxed italic mb-8">
                "{t.content}"
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-11 h-11 rounded-full object-cover border border-purple-500/40"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{t.name}</h4>
                <p className="text-xs text-white/50 truncate">{t.role} • {t.company}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-purple-300 font-semibold mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-purple-400" /> {t.proof}
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
export { TestimonialsSection };
