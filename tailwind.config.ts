import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        dm: ["var(--font-dm)", "sans-serif"],
      },
      colors: {
        brand: {
          blue: "#3B82F6",
          "blue-dark": "#1D4ED8",
          "blue-light": "#EFF6FF",
          purple: "#8B5CF6",
          orange: "#F59E0B",
          green: "#10B981",
          navy: "#1E293B",
          slate: "#475569",
          muted: "#94A3B8",
          bg: "#F0F4FF",
          border: "#E2E8F0",
        },
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "fade-up-delay-1": "fadeUp 0.6s 0.1s ease both",
        "fade-up-delay-2": "fadeUp 0.6s 0.2s ease both",
        "fade-right": "fadeRight 0.7s 0.15s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
