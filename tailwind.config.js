const { nextui } = require("@nextui-org/react");
const colors = require("tailwindcss/colors");
const { lime, red, stone } = colors;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      flex: {
        2: "0 0 100%",
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        back: {
          DEFAULT: stone[100],
          dark: lime[950],
        },
        fore: {
          DEFAULT: lime[950],
          dark: stone[100],
        },
        border: {
          DEFAULT: stone[300],
          dark: lime[900],
        },
        input: {
          DEFAULT: stone[300],
          dark: lime[900],
        },
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: lime[900],
          foreground: stone[100],
          fore: stone[100],
        },
        secondary: {
          DEFAULT: stone[200],
          foreground: lime[950],
          dark: lime[900],
        },
        destructive: {
          DEFAULT: red[500],
          foreground: "hsl(var(--destructive-foreground))",
          dark: red[500],
        },
        muted: {
          DEFAULT: stone[200],
          dark: "#28400c",
          fore: {
            DEFAULT: stone[500],
            dark: stone[300],
          },
        },
        accent: {
          DEFAULT: "#b6caaf",
          dark: stone[700],
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: stone[100],
          foreground: "hsl(var(--popover-foreground))",
          fore: { DEFAULT: lime[950], dark: stone[100] },
          dark: lime[950],
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
};
