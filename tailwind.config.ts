import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B6CA8",
        secondary: "#2E8B57",
        accent: "#D4A017",
        danger: "#C0392B",
        surface: "#FDF6EC",
        "text-primary": "#2C3E50",
        "text-muted": "#7F8C8D",
      },
      fontFamily: {
        arabic: ["Amiri", "Scheherazade New", "serif"],
        sans: ["Inter", "Noto Sans", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      minHeight: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
}
export default config
