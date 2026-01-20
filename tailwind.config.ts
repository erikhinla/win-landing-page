import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // BizBuilders AI Design System
        background: {
          primary: "#0B0B0D",
          secondary: "#141417",
        },
        text: {
          primary: "#F5F5F7",
          secondary: "#A1A1AA",
        },
        accent: {
          gold: "#C9A24D",
          steel: "#8FAFC9",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
