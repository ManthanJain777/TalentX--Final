import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollVideo from './ScrollVideo';
import { AuroraBackground } from '../ui/AuroraBackground';
import { Meteors } from '../ui/Meteors';
import { SpotlightCard } from '../react-bits/SpotlightCard';
import { ShinyText } from '../react-bits/ShinyText';
import { DecryptedText } from '../react-bits/DecryptedText';
import { TrueFocus } from '../react-bits/TrueFocus';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const heroCopyRef = useRef(null);
  const passportStageRef = useRef(null);
  const mrzLineRef = useRef(null);
  const subheadRef = useRef(null);
  const progressBarRef = useRef(null);
  const navRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const counterRef = useRef(null);
  const railContainerRef = useRef(null);

  // Problem items
  const problems = [
    { num: '01', title: 'Applications into silence', desc: 'Candidates send application after application and hear nothing back — no feedback, no reason, no next step.' },
    { num: '02', title: 'Screening overload', desc: 'Employers drown in applicant pools with no reliable way to sort who\'s actually capable.' },
    { num: '03', title: 'Keyword filtering misses talent', desc: 'Automated filters reject capable candidates over one missing buzzword on a resume.' },
    { num: '04', title: 'Unverified claims', desc: 'Self-reported skills carry no evidence, so trust has to be rebuilt from zero, every single time.' },
  ];

  // Stamp data
  const stamps = [
    { num: '01', title: 'Register', desc: 'Create your account in minutes — candidate or employer.' },
    { num: '02', title: 'Build your Passport', desc: 'Add skills, projects, and experience in one structured profile.' },
    { num: '03', title: 'Add evidence', desc: 'Link GitHub, certifications, assessments, and internship records.' },
    { num: '04', title: 'Set your visibility', desc: 'Choose exactly who can discover you, and when — private by default.' },
    { num: '05', title: 'Get discovered', desc: 'Employers search and send invitations with full match context.' },
    { num: '06', title: 'Respond on your terms', desc: 'Accept, decline, or negotiate. You\'re always the one deciding.' },
  ];

  // Rail nodes
  const railNodes = [
    'Accepted Match',
    'Project Contract',
    'Milestones',
    'Escrow',
    'Deliverables',
    'Payment',
    'Health: Green',
  ];

  // Stats data
  const stats = [
    { label: 'Pilot Talents', value: '50+' },
    { label: 'Pilot Employers', value: '15+' },
    { label: 'Completed Matches', value: '12' },
    { label: 'Match Accuracy', value: '92%' },
  ];

  useEffect(() => {
    // 1. Scroll Progress Bar
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBarRef.current && docHeight > 0) {
        progressBarRef.current.style.width = `${(scrollTop / docHeight) * 100}%`;
      }
      if (navRef.current) {
        if (scrollTop > 30) {
          navRef.current.classList.add('is-scrolled');
        } else {
          navRef.current.classList.remove('is-scrolled');
        }
      }
      // Parallax on hero copy
      if (heroCopyRef.current) {
        heroCopyRef.current.style.transform = `translateY(${scrollTop * 0.08}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Cursor Glow
    let glowTimeout;
    const handleMouseMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
        cursorGlowRef.current.classList.add('is-active');
        clearTimeout(glowTimeout);
        glowTimeout = setTimeout(() => {
          if (cursorGlowRef.current) {
            cursorGlowRef.current.classList.remove('is-active');
          }
        }, 3000);
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    // 3. Passport Opening Sequence
    const passportTimer = setTimeout(() => {
      if (passportStageRef.current) {
        passportStageRef.current.classList.add('is-open');
      }
    }, 500);

    // 4. MRZ Typewriter
    let typewriterInterval;
    const mrzTimer = setTimeout(() => {
      const mrz = mrzLineRef.current;
      if (!mrz) return;
      const mrzText = 'TALENTX<<ANIKA<R<<<BACKEND<ENGINEER<<<MATCH<94<<<<<<<<<';
      let i = 0;
      mrz.textContent = '';
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      cursor.textContent = '\u00A0';
      typewriterInterval = setInterval(() => {
        mrz.textContent = mrzText.slice(0, i);
        i++;
        if (i > mrzText.length) {
          clearInterval(typewriterInterval);
          mrz.appendChild(cursor);
        }
      }, 32);
    }, 1650);

    // 5. Passport 3D Tilt
    const handlePassportTilt = (e) => {
      const stage = passportStageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      stage.style.transition = 'transform 0.08s linear';
      stage.style.transform = `perspective(1200px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
    };
    const handlePassportReset = () => {
      const stage = passportStageRef.current;
      if (!stage) return;
      stage.style.transition = 'transform 0.8s cubic-bezier(0.22,1,0.36,1)';
      stage.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    };
    document.addEventListener('mousemove', handlePassportTilt);
    document.addEventListener('mouseleave', handlePassportReset);

    // Removed GSAP text split on subhead to use TrueFocus instead

    // 7. General Reveal Observers
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

    const glassObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            glassObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('[data-reveal="glass"]').forEach((el) => glassObserver.observe(el));

    const scaleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            scaleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('[data-reveal="scale"]').forEach((el) => scaleObserver.observe(el));

    // 8. Stamp Badges Observer
    const stampObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            stampObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('[data-reveal="stamp"]').forEach((el) => stampObserver.observe(el));

    // 9. Progress Bar Fill Observer
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('[data-reveal-bar]').forEach((el) => barObserver.observe(el));

    // 10. Match Score Counter Animation
    const counterEl = counterRef.current;
    if (counterEl) {
      const animateCounter = (el, target, duration) => {
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          let eased = 1 - Math.pow(1 - progress, 3);
          if (progress > 0.85) {
            const bp = (progress - 0.85) / 0.15;
            const bounce = Math.sin(bp * Math.PI * 2) * 1.2 * (1 - bp);
            eased = Math.min(eased + bounce * 0.02, 1.02);
          }
          const current = Math.min(Math.round(eased * target), target);
          el.textContent = `${current}%`;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = `${target}%`;
            el.style.transition = 'transform .2s cubic-bezier(0.34,1.56,0.64,1)';
            el.style.transform = 'scale(1.06)';
            setTimeout(() => {
              el.style.transform = 'scale(1)';
            }, 200);
          }
        };
        requestAnimationFrame(tick);
      };

      const cObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(counterEl, 94, 1600);
              cObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      cObs.observe(counterEl);
    }

    // 11. Rail Nodes Observer
    const railNodes = document.querySelectorAll('[data-reveal-rail]');
    const railObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            railObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    railNodes.forEach((el) => railObserver.observe(el));

    if (railContainerRef.current) {
      const railLineObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              railContainerRef.current?.classList.add('is-visible');
              railLineObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      railLineObs.observe(railContainerRef.current);
    }

    // 12. Stats Observer
    if (statsRef.current) {
      const sObs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            sObs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      sObs.observe(statsRef.current);
    }

    // 13. Nav Spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (sections.length && navLinks.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navLinks.forEach((link) => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                  link.style.color = 'var(--cover)';
                }
              });
            }
          });
        },
        { threshold: 0.35 }
      );
      sections.forEach((s) => spy.observe(s));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handlePassportTilt);
      document.removeEventListener('mouseleave', handlePassportReset);
      clearTimeout(passportTimer);
      clearTimeout(mrzTimer);
      if (typewriterInterval) clearInterval(typewriterInterval);
    };
  }, []);

  // Button Ripple Handler
  const handleButtonClick = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* Scroll Progress Bar */}
      <div className="progress-bar" ref={progressBarRef} id="progressBar" />

      {/* Film Grain */}
      <div className="film-grain" aria-hidden="true" />

      {/* Cursor Glow */}
      <div className="cursor-glow" ref={cursorGlowRef} id="cursorGlow" aria-hidden="true" />

      {/* Animated Grid Background */}
      <div className="grid-bg" aria-hidden="true" />

      {/* 5 Animated Morphing Orbs */}
      <div className="orbs" aria-hidden="true">
        <div className="orb" />
        <div className="orb" />
        <div className="orb" />
        <div className="orb" />
        <div className="orb" />
      </div>

      {/* 5 Floating Particles */}
      <div className="particles" aria-hidden="true">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>

      {/* ===================== NAV ===================== */}
      <nav className="nav" ref={navRef} id="nav">
        <div className="container">
          <Link to="/" className="logo">
            <span className="dot" />
            TALENTX
          </Link>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#passport">Talent Passport</a>
            <a href="#matching">Matching</a>
            <a href="#why">Why TALENTX</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              to="/auth/login"
              onClick={handleButtonClick}
              className="btn btn-ghost btn-sm"
            >
              Sign In
            </Link>
            <Link
              to="/candidate/dashboard"
              onClick={handleButtonClick}
              className="btn btn-primary btn-sm"
            >
              Launch Portal &rarr;
            </Link>
          </div>
        </div>
      </nav>

      {/* ===================== SCROLL VIDEO BG ===================== */}
      <ScrollVideo />

      {/* ===================== HERO ===================== */}
      <AuroraBackground className="hero" id="hero" showRadialGradient={true}>
        <div className="ambient-light" aria-hidden="true" />

        <div className="hero-copy" ref={heroCopyRef} id="heroCopy">
          <h1>
            <span className="hero-line"><ShinyText text="Stop applying" speed={3} className="!text-cover-deep" /></span>
            <span className="hero-line"><ShinyText text="into the void." speed={4} shineColor="#F3ECD8" className="!text-gold" /></span>
          </h1>
          <div className="sub" id="subheadText" style={{ marginTop: '1rem', marginBottom: '2.5rem', color: '#A1A1AA', fontSize: '1.25rem', lineHeight: '1.6' }}>
            Build one verified Passport — real evidence — and let employers come to you.
          </div>
          <div className="hero-actions">
            <Link
              to="/auth/register?role=candidate"
              onClick={handleButtonClick}
              className="btn btn-primary"
              id="btnPrimary"
            >
              Build your Passport
            </Link>
            <Link
              to="/auth/register?role=employer"
              onClick={handleButtonClick}
              className="btn btn-ghost"
              id="btnGhost"
            >
              Discover talent
            </Link>
          </div>
          <div className="hero-meta">
            <div>
              <strong>40/25/20/10/5</strong>
              weighted, explainable score
            </div>
            <div>
              <strong>Private</strong>
              by default, always your call
            </div>
          </div>
        </div>

        {/* 3D Passport */}
        <div className="passport-wrap">
          <div className="passport-stage" ref={passportStageRef} id="passportStage">
            <div className="passport-page">
              <div className="foil-stamp" />
              <div className="float-stamp">✦ STAMP</div>
              <div className="shine" />
              <div className="page-top">
                <div className="page-avatar" />
                <div>
                  <div className="page-id"><strong>PASSPORT NO.</strong> <DecryptedText text="TX-64471" animateOn="hover" /></div>
                  <div className="page-name"><ShinyText text="Anika R." speed={2.5} color="#0D1930" shineColor="#C7A868" /></div>
                  <div className="page-role">Backend Engineer</div>
                </div>
              </div>
              <div className="page-label">Verified skills</div>
              <div className="chip-row">
                <span className="chip">Java</span>
                <span className="chip">React</span>
                <span className="chip">System Design</span>
                <span className="chip">Spring Boot</span>
                <span className="chip">MongoDB</span>
              </div>
              <div className="mrz">
                <div className="mrz-line" ref={mrzLineRef} id="mrzLine" />
              </div>
            </div>
            <div className="passport-cover">
              <div className="foil" />
              <div className="cover-emblem">✦</div>
              <div className="cover-title">TALENTX</div>
              <div className="cover-sub">TALENT PASSPORT</div>
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* ===================== PROBLEM ===================== */}
      <section className="problem section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">The problem</div>
            <h2>Application black holes</h2>
            <p>The current system asks candidates to apply into silence, and employers to sort through it blind.</p>
          </div>
          <div className="problem-grid">
            {problems.map((problem) => (
              <SpotlightCard key={problem.num} className="problem-item border-none !p-8" data-reveal spotlightColor="rgba(199, 168, 104, 0.1)">
                <span className="num">{problem.num}</span>
                <h3>{problem.title}</h3>
                <p>{problem.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head center" data-reveal>
            <div className="eyebrow">How it works</div>
            <h2>Six stamps to get discovered</h2>
            <p>One path, start to finish — build proof once, and let it work for you.</p>
          </div>
          <div className="stamp-grid">
            {stamps.map((stamp) => (
              <SpotlightCard key={stamp.num} className="stamp border-none !p-6" spotlightColor="rgba(199, 168, 104, 0.1)">
                <div className="stamp-badge" data-reveal="stamp">{stamp.num}</div>
                <h3>{stamp.title}</h3>
                <p>{stamp.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PASSPORT SHOWCASE ===================== */}
      <section className="section" id="passport">
        <div className="container showcase">
          <div className="showcase-copy">
            <div className="section-head" data-reveal>
              <div className="eyebrow">The Talent Passport</div>
              <h2>Everything an employer needs to trust you, in one place</h2>
              <p>Not a resume — a verified record, built from the things you've actually done.</p>
            </div>
            <ul className="evidence-list" data-reveal>
              <li><span className="tick">✓</span>Skills backed by GitHub activity, not just a claim on a page.</li>
              <li><span className="tick">✓</span>Certifications and assessments, verified at the source.</li>
              <li><span className="tick">✓</span>Real projects and internships, with evidence links attached.</li>
              <li><span className="tick">✓</span>One profile, reused across every opportunity that finds you.</li>
            </ul>
          </div>
          <div data-reveal="glass" className="flex justify-center">
            <div className="card-passport glass-card" style={{ maxWidth: '800px', width: '100%', background: 'rgba(255,255,255,0.6)', borderColor: 'rgba(199,168,104,0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <div className="shimmer" />
              <div className="skill-grid">
                <div className="skill-tile"><div className="name">Java</div><div className="src">CERTIFIED</div></div>
                <div className="skill-tile"><div className="name">React</div><div className="src">GITHUB</div></div>
                <div className="skill-tile"><div className="name">System Design</div><div className="src">ASSESSMENT</div></div>
                <div className="skill-tile"><div className="name">Backend Systems</div><div className="src">PROJECT</div></div>
                <div className="skill-tile"><div className="name">Spring Boot</div><div className="src">PROJECT</div></div>
                <div className="skill-tile"><div className="name">MongoDB</div><div className="src">ASSESSMENT</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MATCHING ===================== */}
      <section className="matching section" id="matching">
        <div className="container">
          <div className="section-head center" data-reveal>
            <div className="eyebrow">Explainable matching</div>
            <h2>Nothing is a black box</h2>
            <p>Every match comes with a full, per-component breakdown — shown to both sides, every time.</p>
          </div>
          <SpotlightCard className="match-panel !p-0" style={{ maxWidth: '900px', margin: '0 auto' }} data-reveal="glass" spotlightColor="rgba(199, 168, 104, 0.12)">
            <div className="match-left">
              <div className="id">PASSPORT NO. <DecryptedText text="TX-64471" animateOn="hover" /></div>
              <h3><ShinyText text="Anika R." speed={2.5} color="#0D1930" shineColor="#C7A868" /></h3>
              <div className="role">Backend Engineer</div>
              <div className="match-score" ref={counterRef} data-counter="94" data-suffix="%">0%</div>
              <div className="match-score-label">MATCH SCORE</div>
            </div>
            <div className="match-right">
              <div className="bar-row"><div className="bar-top"><span>Verified Skills</span><span>40%</span></div><div className="bar-track"><div className="bar-fill" data-reveal-bar style={{ width: '40%' }} /></div></div>
              <div className="bar-row"><div className="bar-top"><span>Project Relevance</span><span>25%</span></div><div className="bar-track"><div className="bar-fill" data-reveal-bar style={{ width: '25%' }} /></div></div>
              <div className="bar-row"><div className="bar-top"><span>Assessment Scores</span><span>20%</span></div><div className="bar-track"><div className="bar-fill" data-reveal-bar style={{ width: '20%' }} /></div></div>
              <div className="bar-row"><div className="bar-top"><span>Certifications &amp; Internships</span><span>10%</span></div><div className="bar-track"><div className="bar-fill" data-reveal-bar style={{ width: '10%' }} /></div></div>
              <div className="bar-row"><div className="bar-top"><span>Profile Completeness</span><span>5%</span></div><div className="bar-track"><div className="bar-fill" data-reveal-bar style={{ width: '5%' }} /></div></div>
              <div className="match-caption">Same breakdown, shown to the candidate and the employer.</div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* ===================== BEYOND THE MATCH ===================== */}
      <section className="section beyond-section">
        <div className="container">
          <div className="section-head center" data-reveal>
            <div className="eyebrow">Beyond the match</div>
            <h2>What happens after the intro</h2>
            <p>TALENTX governs the actual work — milestones, escrow, and versioned deliverables — not just the introduction.</p>
          </div>
          <div className="rail" ref={railContainerRef} id="railContainer">
            {railNodes.map((node, i) => (
              <div key={node} className={`rail-node ${i === 6 ? 'health' : ''}`} data-reveal-rail>
                <div className="rail-dot" />
                <div className="label">{node}</div>
              </div>
            ))}
          </div>
          <SpotlightCard className="challenge-card !p-8" data-reveal="glass" spotlightColor="rgba(199, 168, 104, 0.15)">
            <div>
              <h4>Employer Challenges</h4>
              <p>Paid micro-tasks that let new candidates prove themselves fast — post a challenge, review submissions, pick a winner.</p>
            </div>
            <div className="amount">₹8K–₹40K</div>
          </SpotlightCard>
        </div>
      </section>

      {/* ===================== WHY TALENTX ===================== */}
      <section className="section" id="why">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Why TALENTX</div>
            <h2>The honest comparison</h2>
            <p>No spin — just what changes when discovery replaces applying.</p>
          </div>
          <SpotlightCard data-reveal="glass" className="table-wrap !p-0" spotlightColor="rgba(199, 168, 104, 0.08)">
            <table className="compare">
              <thead>
                <tr>
                  <th></th>
                  <th>Traditional application</th>
                  <th>TALENTX</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Candidate cost</th>
                  <td>Free to apply; agencies may charge</td>
                  <td>Free for candidates</td>
                </tr>
                <tr>
                  <th>Core action</th>
                  <td>You apply, and wait</td>
                  <td>Employers discover you</td>
                </tr>
                <tr>
                  <th>Profile</th>
                  <td>Resume / self-report</td>
                  <td>Verified Talent Passport</td>
                </tr>
                <tr>
                  <th>Proof</th>
                  <td>Limited</td>
                  <td>GitHub, certifications, assessments, projects</td>
                </tr>
                <tr>
                  <th>Match explanation</th>
                  <td>Usually none</td>
                  <td>Per-skill breakdown</td>
                </tr>
                <tr>
                  <th>Candidate control</th>
                  <td>Low</td>
                  <td>Visibility + accept / decline / negotiate</td>
                </tr>
              </tbody>
            </table>
          </SpotlightCard>
        </div>
      </section>

      {/* ===================== TRUST ===================== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="trust" data-reveal="scale">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="10" width="16" height="10" rx="2" stroke="#C7A868" strokeWidth="1.5" />
              <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="#C7A868" strokeWidth="1.5" />
            </svg>
            <p>
              <strong>Talent Passports are private by default.</strong> You decide who can discover you — and you can accept, decline, or negotiate every single invitation.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="section final-cta relative overflow-hidden" id="final">
        <div className="container relative z-10">
          <div data-reveal>
            <h2>Ready to be found?</h2>
            <p>Build your Passport once. Let the right opportunities come to you.</p>
            <div className="final-actions">
              <Link
                to="/auth/register?role=candidate"
                onClick={handleButtonClick}
                className="btn btn-primary"
              >
                Build your Passport
              </Link>
              <Link
                to="/auth/register?role=employer"
                onClick={handleButtonClick}
                className="btn btn-ghost"
              >
                Discover talent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section ref={statsRef} className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-icon">{stat.icon}</span>
                <div className="stat-value">{statsVisible ? stat.value : '0'}</div>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer>
        <div className="mrz-strip">
          <span>
            TALENTX&lt;&lt;VERIFIED&lt;PROFILE&lt;&lt;&lt;DISCOVERY&lt;OVER&lt;APPLICATION&lt;&lt;&lt;EXPLAINABLE&lt;MATCH&lt;&lt;&lt;GOVERNED&lt;DELIVERY&lt;&lt;&lt;&nbsp;&nbsp;&nbsp;&nbsp;TALENTX&lt;&lt;VERIFIED&lt;PROFILE&lt;&lt;&lt;DISCOVERY&lt;OVER&lt;APPLICATION&lt;&lt;&lt;EXPLAINABLE&lt;MATCH&lt;&lt;&lt;GOVERNED&lt;DELIVERY&lt;&lt;&lt;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo"><span className="dot" />TALENTX</div>
              <p>A talent-first recruitment platform. Evidence, not guesswork. Discovery, not applications.</p>
            </div>
            <div className="footer-col">
              <h5>Product</h5>
              <ul>
                <li><a href="#how">How it works</a></li>
                <li><a href="#passport">Talent Passport</a></li>
                <li><a href="#matching">Matching</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Legal</h5>
              <ul>
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 TALENTX. All rights reserved.</span>
            <span>PASSPORT NO. TX-00001 &bull; ISSUED FOR TALENT</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
export { LandingPage };
