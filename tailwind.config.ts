import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sanitary: {
          ink: "#17211b",
          green: "#2f6f4e",
          mint: "#dff4e8",
          amber: "#f4b942",
          coral: "#d95f4f"
        }
      }
    }
  },
  plugins: []
};

export default config;
