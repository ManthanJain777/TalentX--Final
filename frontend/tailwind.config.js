/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        page: '#FFFFF0', // Ivory
        paper: '#FFFFFF',
        ink: {
          DEFAULT: '#111827', // Obsidian Ink
          soft: '#4B5563',
          faint: '#9CA3AF',
        },
        cover: {
          DEFAULT: '#0F172A', // Slate/Obsidian
          deep: '#020617',
          light: '#1E293B',
        },
        gold: {
          DEFAULT: '#8B6B23',
          soft: '#C7A868',
          wash: '#EFE3C6',
          dark: '#6E5318',
        },
        verified: {
          DEFAULT: '#1D8A5F',
          light: 'rgba(29, 138, 95, 0.12)',
        },
        pending: {
          DEFAULT: '#B9821E',
          light: 'rgba(185, 130, 30, 0.12)',
        },
        risk: {
          DEFAULT: '#C0424D',
          light: 'rgba(192, 66, 77, 0.12)',
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(20, 37, 68, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        'glass-hover': '0 20px 60px rgba(20, 37, 68, 0.10)',
        'gold-glow': '0 0 20px rgba(199, 168, 104, 0.25)',
        'subtle': '0 4px 20px rgba(20, 37, 68, 0.04)',
      },
      backdropBlur: {
        'glass': '24px',
        'glass-xl': '32px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
