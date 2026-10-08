import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0B57A8",
          dark: "#094889",
          light: "#2F78C4",
          soft: "#E8F1FB",
        },
        navy: {
          DEFAULT: "#0B2A5B",
          deep: "#072250",
          ink: "#0B1F4B",
        },
        surface: "#F5F9FF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 42, 91, 0.04), 0 4px 14px rgba(11, 42, 91, 0.06)",
        "card-hover":
          "0 2px 4px rgba(11, 42, 91, 0.06), 0 12px 28px rgba(11, 42, 91, 0.12)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
