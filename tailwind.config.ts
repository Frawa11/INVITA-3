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
        sans: ["var(--font-inter)"],
        script: ["var(--font-dancing)"],
        serif: ["var(--font-playfair)"],
      },
      colors: {
        "electric-blue": "#00C6FF",
        "deep-violet": "#6200EA",
        "lilac-light": "#E6E6FA",
        "lilac-dark": "#9370DB",
        "gold-accent": "#D4AF37",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
