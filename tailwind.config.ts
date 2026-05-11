import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: "#0a0705",
        gold: "#c8a05a",
        ivory: "#f0e8d8",
        sienna: "#8b3a1a",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        card: "var(--card)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
      },
      textColor: {
        primary: "var(--text)",
        secondary: "var(--text-muted)",
        faint: "var(--text-faint)",
        accent: "var(--accent)",
      },
      borderColor: {
        subtle: "var(--border)",
        "subtle-strong": "var(--border-strong)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
