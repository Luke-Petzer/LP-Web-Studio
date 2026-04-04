import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* ─── Ethereal/Light Palette ─── */
      colors: {
        void: "rgb(var(--bg-void) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        slate: "rgb(var(--slate) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          glow: "rgb(var(--accent) / 0.3)",
          high: "rgb(var(--accent) / 0.7)",
          muted: "rgb(var(--accent) / 0.15)",
        },
        brand: {
          black: "#050505",
          elevated: "#111111",
          dark: "#1a1a1a",
          surface: "#f4f4f5",
        },
        secondary: {
          DEFAULT: "#4b5563",
          light: "#6b7280",
          dark: "#374151",
        },
        glass: {
          bg: "rgb(var(--bg-white) / 0.05)",
          border: "rgb(var(--bg-white) / 0.1)",
          "border-dim": "rgb(var(--bg-white) / 0.05)",
        },
        ghost: "rgb(var(--text-ghost) / <alpha-value>)",
        paper: "rgb(var(--bg-paper) / <alpha-value>)",
        carbon: "rgb(var(--bg-carbon) / <alpha-value>)",
      },

      /* ─── Exponential Spacing Scale ─── */
      spacing: {
        hairline: "4px",
        base: "8px",
        component: "16px",
        sectional: "24px",
        atmospheric: "40px",
        structural: "96px",
        grandeur: "128px",
        epic: "160px",
      },

      /* ─── Golden Ratio Fluid Typography (φ = 1.618) ─── */
      fontSize: {
        xs: ["clamp(0.75rem, 0.5vw + 0.6rem, 0.875rem)", { lineHeight: "1.5" }],
        sm: ["clamp(0.875rem, 0.75vw + 0.75rem, 1rem)", { lineHeight: "1.5" }],
        base: ["clamp(1rem, 1vw + 0.8rem, 1.125rem)", { lineHeight: "1.6" }],
        lg: ["clamp(1.25rem, 1.5vw + 1rem, 1.618rem)", { lineHeight: "1.4" }],
        xl: ["clamp(1.618rem, 2vw + 1.2rem, 2rem)", { lineHeight: "1.3" }],
        "2xl": ["clamp(2rem, 3vw + 1.5rem, 2.618rem)", { lineHeight: "1.2" }],
        "3xl": ["clamp(2.618rem, 4vw + 1.8rem, 3.5rem)", { lineHeight: "1.15" }],
        "4xl": ["clamp(3.236rem, 5vw + 2.2rem, 4.236rem)", { lineHeight: "1.1" }],
        "5xl": ["clamp(4.236rem, 6vw + 3rem, 5.5rem)", { lineHeight: "1.05" }],
      },

      /* ─── Font Families ─── */
      fontFamily: {
        heading: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },

      /* ─── Shadows ─── */
      boxShadow: {
        "accent-glow": "0 4px 20px rgb(var(--accent) / 0.1)",
        "accent-glow-sm": "0 2px 10px rgb(var(--accent) / 0.05)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
        "glass-hover": "0 8px 32px 0 rgb(var(--accent) / 0.12)",
        soft: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
      },

      /* ─── Glassmorphism Blurs ─── */
      backdropBlur: {
        glass: "16px",
      },

      /* ─── Animations ─── */
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },

      /* ─── Border Radius ─── */
      borderRadius: {
        glass: "12px",
        card: "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
