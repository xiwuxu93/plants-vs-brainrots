import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        brand: {
          50: "#f2f8f7",
          100: "#dcedeb",
          200: "#b8dcd6",
          300: "#8bbbba",
          400: "#5a9a9b",
          500: "#3b7d7f",
          600: "#2d6265",
          700: "#234d50",
          800: "#1c3c3f",
          900: "#112527",
        },
      },
    },
  },
  plugins: [],
};

export default config;
