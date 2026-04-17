import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* ─── Color Tokens ─── */
      colors: {
        /* Surface scale */
        obsidian:   "#0B0B0B",
        "slate-dark": "#1a1c1e",
        "card-bg":  "#141414",

        /* Primary accent: orange-red */
        accent: {
          DEFAULT: "#FF4D00",
          muted:   "rgba(255,77,0,0.15)",
          glow:    "rgba(255,77,0,0.30)",
        },

        /* Text */
        "on-surface": "#e5e2e1",
        "on-surface-dim": "#c6c6c6",

        /* Outlines */
        "outline-dim":  "rgba(255,255,255,0.05)",
        "outline-mid":  "rgba(255,255,255,0.10)",
        "outline-high": "rgba(255,255,255,0.20)",

        /* Legacy — kept so existing non-homepage components don't break */
        void:    "#0A0A0A",
        ink:     "#1A1A1A",
        paper:   "#F5F2F2",
        carbon:  "#2B2A2A",
        amber: {
          DEFAULT: "#FEB05D",
          muted:   "rgba(254,176,93,0.15)",
        },
      },

      /* ─── Font Families ─── */
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "sans-serif"],
        body:     ["var(--font-inter)", "sans-serif"],
        mono:     ["var(--font-jetbrains)", "monospace"],
      },

      /* ─── Border Radius ─── */
      borderRadius: {
        DEFAULT: "0px",
        tight:   "8px",
        full:    "9999px",
        /* Legacy */
        card:    "2rem",
        glass:   "12px",
      },

      /* ─── Fluid Type Scale (Golden Ratio) ─── */
      fontSize: {
        xs:   ["clamp(0.75rem,  0.5vw + 0.6rem,  0.875rem)", { lineHeight: "1.5" }],
        sm:   ["clamp(0.875rem, 0.75vw + 0.75rem, 1rem)",    { lineHeight: "1.5" }],
        base: ["clamp(1rem,     1vw + 0.8rem,     1.125rem)", { lineHeight: "1.6" }],
        lg:   ["clamp(1.25rem,  1.5vw + 1rem,     1.618rem)", { lineHeight: "1.4" }],
        xl:   ["clamp(1.618rem, 2vw + 1.2rem,     2rem)",    { lineHeight: "1.3" }],
        "2xl":["clamp(2rem,     3vw + 1.5rem,     2.618rem)", { lineHeight: "1.2" }],
        "3xl":["clamp(2.618rem, 4vw + 1.8rem,     3.5rem)",  { lineHeight: "1.15" }],
        "4xl":["clamp(3.236rem, 5vw + 2.2rem,     4.236rem)", { lineHeight: "1.1" }],
        "5xl":["clamp(4.236rem, 6vw + 3rem,       5.5rem)",  { lineHeight: "1.05" }],
      },

      /* ─── Spacing Scale ─── */
      spacing: {
        hairline:    "4px",
        base:        "8px",
        component:   "16px",
        sectional:   "24px",
        atmospheric: "40px",
        structural:  "96px",
        grandeur:    "128px",
        epic:        "160px",
      },

      /* ─── Shadows ─── */
      boxShadow: {
        "accent-glow":    "0 4px 20px rgba(255,77,0,0.15)",
        "accent-glow-lg": "0 25px 50px -12px rgba(255,77,0,0.2)",
        "card-hover":     "0 25px 50px -12px rgba(0,0,0,0.7)",
        glass:            "0 8px 32px 0 rgba(0,0,0,0.36)",
      },

      /* ─── Animations ─── */
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        pulse:     "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
