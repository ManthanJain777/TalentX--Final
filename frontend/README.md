# 🚀 TALENTX HOMEPAGE — CINEMATIC SCROLL EDITION (ENHANCED)

A complete, production-ready React homepage for **TALENTX** — the proof-first talent ecosystem platform matching verified talent with employers through explainable AI and milestone-based escrow delivery.

---

## 🎨 Core Highlights

1. **Real-time WebGL Scroll Background Scene (`ScrollScene.jsx`)**:
   - Plain **Three.js** (no video file dependencies, zero broken asset URLs).
   - Starts at scroll `0` with unverified signal cables tipped in glowing `#7C3AED` emissive nodes.
   - Morphs into a faceted crystalline verified passport structure with an illuminated warm core point light at scroll `1`.
   - Ambient alpha-blended bokeh particles, depth fog (`THREE.FogExp2`), continuous subtle idle rotation, and camera position lerp.
   - Respects `prefers-reduced-motion` and pauses render loop on `document.visibilitychange`.
2. **Glassmorphism & Material Tokens**:
   - `bg-white/10` and `bg-white/15` with `backdrop-blur-md` panels.
   - Left-accent glass badges with mono uppercase labels (`border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md`).
   - Solid white pill buttons (`text-black hover:bg-white/85`) and glass secondary CTAs.
3. **Typography & Styling**:
   - Google Fonts **Inter** (weights 400, 500, 600, 700). Both `font-sans` and `font-mono` mapped to Inter.
   - Dark `#0A0A0A` canvas with text drop shadows (`drop-shadow-md`, `drop-shadow-lg`).
4. **Complete Multi-Section Layout**:
   - **Navbar**: Fixed glass header with Lucide `Hexagon` icon (`#5E0ED7`), links with superscript `6`, "Get Started" CTA, and responsive mobile drawer.
   - **Section One — Hero**: Service list (`/ TALENT DISCOVERY`, `/ AI MATCHING`, `/ PROJECT GOVERNANCE`), editorial intro, *"Talent. Verified. Delivered."* headline, and Anika glass contact card with generated initials avatar and "Book a Demo" CTA.
   - **`80vh` Spacer**: Allows scroll progress to morph the WebGL scene between sections.
   - **Section Two — Capability**: *"Discover brilliantly."* headline, dual CTAs, and the 3-item frosted capability panel (`01 Verified Passport`, `02 Explainable Matching`, `03 Governed Delivery`) with interactive hover chevrons.
   - **Section Three — Stats & Features**: `useCounter` rAF animated numbers (`500+ Verified Talents`, `200+ Active Employers`, `100+ Projects Delivered`, `98% Match Satisfaction`) + 3 feature cards (`Lock` AES-256, `Brain` Explainable AI, `Zap` Instant Discovery).
   - **Section Four — Testimonials**: 3 glass outcome cards with filled 5-star Lucide `Star` ratings (#FBBF24).
   - **Footer**: 4 semantic columns, accessible Lucide social links (`LinkedIn`, `X / Twitter`, `GitHub`, `YouTube`), and copyright bar.

---

## 📁 File Structure

```
frontend/
├── public/
│   └── index.html               # Inter font links, viewport & meta
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Fixed top glass navbar + Hexagon logo + mobile drawer
│   │   ├── ScrollScene.jsx      # Real-time Three.js WebGL morphing scene
│   │   ├── SectionHero.jsx      # Hero with services, H1, and Anika contact card
│   │   ├── SectionCapability.jsx# "Discover brilliantly." + frosted 3-row capability panel
│   │   ├── SectionStats.jsx     # rAF animated counters + 3 feature cards
│   │   ├── SectionTestimonials.jsx # 3 verified outcome cards with 5-star ratings
│   │   └── Footer.jsx           # 4-column footer + social icons + copyright
│   ├── hooks/
│   │   ├── useScrollProgress.js # Scroll progress calculation with rAF lerp smoothing
│   │   └── useCounter.js        # requestAnimationFrame count-up hook
│   ├── App.jsx                  # Root assembly with 80vh spacer between sections
│   ├── index.css                # Tailwind base, components, utilities & glass tokens
│   └── index.js                 # React 18 DOM root render
├── tailwind.config.js           # Inter font mappings and custom theme tokens
├── postcss.config.js            # PostCSS configuration with Tailwind and Autoprefixer
└── package.json
```

---

## 💻 Running the App

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build for Production

```bash
npm run build
```
Compiled bundle output is in `build/`.
