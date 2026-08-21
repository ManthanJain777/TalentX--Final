/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        page: "var(--page)",
        paper: "var(--paper)",
        "paper-soft": "var(--paper-soft)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        cover: "var(--cover)",
        "cover-deep": "var(--cover-deep)",
        gold: {
          DEFAULT: "var(--gold)",
          soft: "var(--gold-soft)",
          wash: "var(--gold-wash)",
          dark: "#6A5016",
        },
        verified: "var(--verified)",
        pending: "var(--pending)",
        risk: "var(--risk)",

        // Shadcn Tokens
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
