import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, Filter, FileSpreadsheet, EyeOff, ShieldCheck } from 'lucide-react';

const ProblemSection = () => {
  const painPoints = [
    {
      id: 'PAIN 01',
      title: 'The 250-Resume Void',
      desc: 'Candidates spend hundreds of hours tailoring applications, only to be swallowed by automated no-reply queues with zero human feedback.',
      icon: XCircle,
      status: 'risk',
    },
    {
      id: 'PAIN 02',
      title: 'Keyword Filter Traps',
      desc: 'Brilliant builders get rejected by crude ATS algorithms simply because their resume lacked an arbitrary keyword, rewarding SEO over real skill.',
      icon: Filter,
      status: 'risk',
    },
    {
      id: 'PAIN 03',
      title: 'Unverified Claims Burnout',
      desc: 'Recruiters burn weeks sifting through embellished claims and buzzwords because there is zero verifiable ground truth to trust.',
      icon: FileSpreadsheet,
      status: 'pending',
    },
    {
      id: 'PAIN 04',
      title: 'Zero Match Explanations',
      desc: 'Rankings and rejections are hidden in algorithmic black boxes. Candidates never know what gap prevented an offer, stalling career growth.',
      icon: EyeOff,
      status: 'pending',
    },
  ];

  return (
    <section
      id="problem"
      className="py-20 sm:py-28 bg-ink-elevated border-y border-white/5 relative overflow-hidden"
      aria-label="The Problem Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="font-mono text-risk text-xs font-bold tracking-widest uppercase mb-2">
            THE BROKEN RECRUITMENT REALITY
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            Application Black Holes.
          </h2>
          <p className="text-fog text-base sm:text-lg leading-relaxed">
            Candidates blast 200 generic PDFs into the void. Employers drown in keyword-stuffed resumes. Neither side gets signal, truth, or speed.
          </p>
        </div>

        {/* 4 Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {painPoints.map((pain, index) => {
            const Icon = pain.icon;
            const isRisk = pain.status === 'risk';

            return (
              <motion.div
                key={pain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card-elevated p-6 ${
                  isRisk ? 'border-l-4 border-l-risk' : 'border-l-4 border-l-pending'
                } relative`}
              >
                {/* Header with Icon and Tag */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      isRisk
                        ? 'bg-risk/15 text-risk border border-risk/40'
                        : 'bg-pending/15 text-pending border border-pending/40'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`font-mono text-xs font-bold ${
                      isRisk ? 'text-risk' : 'text-pending'
                    }`}
                  >
                    {pain.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {pain.title}
                </h3>
                <p className="text-fog text-sm leading-relaxed">
                  {pain.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Contrast Transition Banner: The Single Passport Solution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 rounded-xl bg-[#101622] border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-subtle"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                The TALENTX Paradigm Shift
              </div>
              <div className="text-xs text-fog">
                One cryptographically verified Passport replaces endless unread resume submissions.
              </div>
            </div>
          </div>

          <a
            href="#how-it-works"
            className="btn-outline-fog text-xs py-2 px-4 shrink-0 border-gold/30 text-gold"
          >
            See how it works →
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemSection;
export { ProblemSection };
