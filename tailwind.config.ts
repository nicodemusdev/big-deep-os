import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern, clean design colors - Planning Center inspired
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Modern blue
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c3d66",
        },
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6", // Vibrant purple accent
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#3f0f8f",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        bg: {
          light: "#ffffff",
          DEFAULT: "#f9fafb",
          warm: "#f3f4f6",
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
