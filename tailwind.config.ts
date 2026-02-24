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
        void: "#050505",
        ink: "#1a1a1a",
        slate: "#4b5563",
        accent: {
          DEFAULT: "#6366f1",
          glow: "rgba(99, 102, 241, 0.3)",
          high: "rgba(99, 102, 241, 0.7)",
          muted: "rgba(99, 102, 241, 0.15)",
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
          bg: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)",
          "border-dim": "rgba(255, 255, 255, 0.05)",
        },
        ghost: "var(--text-ghost)",
      },

      /* ─── 8px Soft Grid Spacing ─── */
      spacing: {
        hairline: "4px",
        base: "8px",
        component: "16px",
        sectional: "24px",
        atmospheric: "32px",
        structural: "48px",
        grandeur: "64px",
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
        "accent-glow": "0 0 15px rgba(99, 102, 241, 0.4), inset 0 0 10px rgba(99, 102, 241, 0.15)",
        "accent-glow-sm": "0 0 8px rgba(99, 102, 241, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
        "glass-hover": "0 8px 32px 0 rgba(99, 102, 241, 0.12)",
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
