import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // scan all source files
  ],
  theme: {
    extend: {
      // You can extend colors, fonts, spacing, etc. here
    },
  },
  plugins: [],
};

export default config;
