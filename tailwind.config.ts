
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E0E0E0", // Border Light
        input: "#CCCCCC", // Default input border
        ring: "#FF6900", // Talabat Orange for focus rings
        background: "#FFFFFF", // Background Light
        foreground: "#333333", // Text Dark
        primary: {
          DEFAULT: "#FF6900", // Talabat Orange
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E85C00", // Orange Hover
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#CC5000", // Active Orange
          foreground: "#FFFFFF",
        },
        highlight: {
          DEFAULT: "#FFF1E6", // Orange Tint
          foreground: "#333333",
        },
        success: "#28A745", // Green
        warning: "#FFC107", // Yellow
        danger: "#DC3545", // Red
        info: "#007AFF", // Blue
        destructive: {
          DEFAULT: "#DC3545", // Red
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#666666", // Text Medium
          foreground: "#999999", // Text Light
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#333333",
        },
        card: {
          DEFAULT: "#F9F9F9", // Card Light
          foreground: "#333333",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
