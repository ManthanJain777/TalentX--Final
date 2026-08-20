import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import GlassCard from '../ui/GlassCard';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Top Banner Row: Service List & Intro */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-wider text-purple-300">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#A855F7]" />
          <span>/ TALENT DISCOVERY / AI MATCHING / PROJECT GOVERNANCE</span>
        </div>

        <div className="max-w-md text-xs sm:text-sm text-white/60 leading-relaxed">
          Where mathematically verified talent meets enterprise scale. Powered by cryptographic proof passports & automated escrow.
        </div>
      </div>

      {/* Centerpiece Hero Title */}
      <div className="my-auto py-12 lg:py-16">
        {/* Trusted Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-purple-500/30 text-purple-200 text-xs font-semibold shadow-[0_0_20px_rgba(94,14,215,0.2)] mb-6 animate-fade-down">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Trusted by 500+ Elite Talents & Tech Giants</span>
        </div>

        {/* H1 Animated Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] max-w-5xl">
          <span className="block overflow-hidden">
            <span className="block animate-slide-up">TALENT.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-[#BA8DFF] animate-slide-up" style={{ animationDelay: '100ms' }}>
              VERIFIED.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-white animate-slide-up" style={{ animationDelay: '200ms' }}>
              DELIVERED.
            </span>
          </span>
        </h1>

        {/* Subtitle & Main Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl">
          <Button
            size="lg"
            variant="glow"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/auth/register')}
            className="text-base"
          >
            Explore Proof Ecosystem
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/candidate/dashboard')}
            className="text-base"
          >
            Enter Demo Portal
          </Button>
        </div>
      </div>

      {/* Bottom Row: Stats & Contact Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-white/[0.08] items-center">
        {/* Stats Grid */}
        <div className="lg:col-span-8 grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            <div className="text-2xl sm:text-4xl font-black text-white flex items-center">
              <span className="text-purple-400 mr-1">+</span>500
            </div>
            <p className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1">Verified Engineers</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            <div className="text-2xl sm:text-4xl font-black text-white flex items-center">
              <span className="text-purple-400 mr-1">+</span>200
            </div>
            <p className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1">Enterprise Roles</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            <div className="text-2xl sm:text-4xl font-black text-white flex items-center">
              <span className="text-purple-400 mr-1">+</span>100
            </div>
            <p className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1">% Escrow Secured</p>
          </div>
        </div>

        {/* Glass Contact / AI Assistant Card */}
        <div className="lg:col-span-4">
          <GlassCard className="p-4 flex items-center justify-between gap-4 border-purple-500/30 shadow-[0_0_30px_rgba(94,14,215,0.15)]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Anika AI"
                  className="w-11 h-11 rounded-xl object-cover border border-purple-400"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#1A1A2E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  Talk with Anika
                  <Badge variant="primary" size="sm" className="text-[9px] px-1 py-0">AI Matcher</Badge>
                </p>
                <p className="text-[11px] text-white/50">Ready to audit requirements</p>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/auth/login')}
            >
              Book Demo
            </Button>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
export { HeroSection };
