import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const Testimonials = () => {
  const testimonials = [
    {
      initials: 'MK',
      name: 'Marcus Krause',
      role: 'VP of Engineering',
      company: 'Synthetix Cloud',
      outcome: 'Time-to-hire dropped from 44 days to 6 days',
      quote:
        'Instead of wading through 300 buzzword-heavy resumes, TALENTX matched us with two verified Rust engineers whose live benchmark scores matched our exact distributed queue stack. We completed our v2 migration 3 weeks ahead of schedule.',
    },
    {
      initials: 'SL',
      name: 'Sophia Lin',
      role: 'Founding CTO',
      company: 'Aetheria Protocol',
      outcome: '₹96L in milestone deliverables executed with 0 payment disputes',
      quote:
        'The milestone-based escrow protected our runway during our seed stage. Our contractor knew exactly what code artifacts were needed for each milestone release, and disbursements occurred automatically upon GitHub PR approvals.',
    },
    {
      initials: 'DJ',
      name: 'Devon James',
      role: 'Principal Distributed Systems Engineer',
      company: 'Independent Contractor',
      outcome: '3 consecutive enterprise contracts secured without technical interviews',
      quote:
        'My verified Talent Passport let my actual open-source contributions and benchmarked performance speak for themselves. I skipped 15+ hours of whiteboard trivia tests and closed two senior architect retainers in one week.',
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-surface-alt" aria-label="Client & Talent Testimonials">
      <div className="site-container">
        {/* Header */}
        <div className="section-header text-center">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="section-tag"
          >
            Verified Outcomes
          </motion.span>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            custom={1}
            className="section-title"
          >
            What Our Community Says
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            custom={2}
            className="section-subtitle"
          >
            Real technical teams and verified specialists sharing measurable results achieved with TALENTX.
          </motion.p>
        </div>

        {/* Testimonials Container (Grid on desktop, scroll snap on mobile) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="testimonials-scroll-wrapper"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={idx}
              className="testimonial-card"
            >
              {/* Top Row: Stars + Quote Icon */}
              <div className="testimonial-card-top">
                <div className="star-rating-row" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star-icon filled" aria-hidden="true" />
                  ))}
                </div>
                <Quote className="quote-icon-decor" aria-hidden="true" />
              </div>

              {/* Concrete Outcome Tag */}
              <div className="testimonial-outcome-badge">
                <span className="outcome-dot" />
                <span className="outcome-text">{t.outcome}</span>
              </div>

              {/* Body Quote */}
              <blockquote className="testimonial-quote-body">
                "{t.quote}"
              </blockquote>

              {/* Author Profile */}
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div className="testimonial-author-meta">
                  <div className="author-name">{t.name}</div>
                  <div className="author-role-company">
                    {t.role} • <span className="author-company">{t.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
