import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#5E0ED7] via-[#6D14EA] to-[#7C3AED] p-8 sm:p-14 lg:p-16 shadow-[0_0_80px_rgba(94,14,215,0.4)] border border-purple-300/30">
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-900/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            <span>Instant Access to Proof Network</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Ready to hire or get hired on proof?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
            Join thousands of senior engineers and tech teams replacing bias with cryptographic proof, AI matching, and instant escrow settlements.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              size="lg"
              className="bg-white text-[#5E0ED7] hover:bg-purple-50 shadow-xl font-bold border-none"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/auth/register')}
            >
              Get Started Free
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="bg-black/20 hover:bg-black/30 text-white border-white/30"
              onClick={() => navigate('/candidate/dashboard')}
            >
              Explore Live Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
export { CTASection };
