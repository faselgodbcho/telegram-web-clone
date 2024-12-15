import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#fff",
          DEFAULT: "#f4f4f4",
          dark: "#212121",
        },
        secondary: {
          light: "#3390ec",
          DEFAULT: "#2678d2",
          dark: "#8774e1",
        },
        faded: {
          gray: "#AAA",
          light: "#CCCCCC",
          dark: "#888888",
        },
        success: "#28a745",
        warning: "#ffc107",
        danger: "#dc3545",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
