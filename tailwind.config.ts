import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Refined warm palette - more cohesive and sophisticated
        primary: {
          50: "#faf5f2",
          100: "#f3e8e0",
          200: "#e8d5c6",
          300: "#dab8a0",
          400: "#c89575",
          500: "#b8765c", // Warm terracotta
          600: "#9e6349",
          700: "#845440",
          800: "#6b4537",
          900: "#57382f",
        },
        accent: {
          50: "#fffef9",
          100: "#fff9f0",
          200: "#ffe8d4",
          300: "#ffd9b8",
          400: "#ffca9b",
          500: "#f5b871", // Warm gold
          600: "#e0a456",
          700: "#cc903f",
          800: "#b8782d",
          900: "#8f5f22",
        },
        neutral: {
          50: "#fafaf9",
          100: "#f5f4f2",
          200: "#ebe8e3",
          300: "#ddd8d0",
          400: "#c5bdb2",
          500: "#a89e92",
          600: "#8b8278",
          700: "#6d665d",
          800: "#52504a",
          900: "#3d3a36",
        },
        bg: {
          light: "#fefdfb",
          DEFAULT: "#faf8f6",
          warm: "#f5f1ed",
        },
      },
      fontFamily: {
        serif: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.25rem", letterSpacing: "0.01em" }],
        sm: ["0.9375rem", { lineHeight: "1.5rem" }],
        base: ["1rem", { lineHeight: "1.6rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      spacing: {
        "4.5": "1.125rem",
      },
    },
  },
  plugins: [],
};

export default config;
