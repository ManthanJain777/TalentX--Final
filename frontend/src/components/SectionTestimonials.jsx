import React from 'react';
import { Star } from 'lucide-react';

const SectionTestimonials = () => {
  const testimonials = [
    {
      author: 'Marcus K.',
      role: 'VP of Engineering, Synthetix Cloud',
      outcome: 'Time-to-hire reduced from 45 to 6 days',
      quote:
        'The verified GitHub code evaluation accurately predicted production-ready performance on day one. We shipped our core distributed queue v2 three weeks early.',
    },
    {
      author: 'Sophia L.',
      role: 'Founding CTO, Aetheria Labs',
      outcome: '₹1.12 Cr disbursed with 0 milestone disputes',
      quote:
        'Milestone-based escrow protected our runway during our seed stage. Acceptance criteria were unambiguous and payouts released upon merged PRs without friction.',
    },
    {
      author: 'Devon J.',
      role: 'Principal Rust Architect, Independent',
      outcome: '2 architecture retainers closed in 7 days',
      quote:
        'I skipped 20+ hours of repetitive whiteboarding. My verified Talent Passport let my actual open-source performance and benchmark scores speak for themselves.',
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative z-10 w-full min-h-screen supports-[height:100svh]:min-h-[100svh] flex justify-center items-center px-5 sm:px-8 md:px-12 py-20 max-w-7xl mx-auto"
      aria-label="Community Testimonials"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md mb-6 text-white shadow-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/95">
            What Our Community Says
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-lg">
          Real Stories. Real Impact.
        </h2>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-6 shadow-xl flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-[#FBBF24] text-[#FBBF24]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Outcome Badge */}
                <div className="inline-block bg-[#00D9B5]/10 border border-[#00D9B5]/30 px-2.5 py-1 rounded-md text-[11px] font-mono text-[#00D9B5] mb-4">
                  {t.outcome}
                </div>

                {/* Quote */}
                <p className="text-sm text-white/80 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-white/10 pt-4 mt-auto">
                <div className="text-sm font-medium text-white">{t.author}</div>
                <div className="text-xs text-white/50 mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonials;
