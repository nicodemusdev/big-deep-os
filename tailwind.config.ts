import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm primaries + 40s/50s matchbook aesthetic
        primary: {
          50: "#fef3f0",
          100: "#fee7de",
          200: "#fdd4c6",
          300: "#fbab89",
          400: "#f8824d",
          500: "#e85d2a", // Main rust/burnt orange
          600: "#d44d1a",
          700: "#b23c15",
          800: "#8e3112",
          900: "#6d2410",
        },
        accent: {
          50: "#fffaf0",
          100: "#fff5e1",
          200: "#ffe8c2",
          300: "#ffd99e",
          400: "#ffc566",
          500: "#ffb300", // Mustard yellow accent
          600: "#e6a200",
          700: "#cc8700",
          800: "#996600",
          900: "#664400",
        },
        neutral: {
          50: "#faf9f7",
          100: "#f5f3f0",
          200: "#ede9e5",
          300: "#ddd8d1",
          400: "#c9bfb5",
          500: "#a89d96",
          600: "#8b8078",
          700: "#6d6359",
          800: "#504b45",
          900: "#3a3531",
        },
        cream: "#f5f1ed",
        warmGray: "#e8e3de",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Segoe UI", "Roboto", "Oxygen", "Ubuntu", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      boxShadow: {
        retro: "4px 4px 0 rgba(0, 0, 0, 0.15)",
        "retro-lg": "8px 8px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
