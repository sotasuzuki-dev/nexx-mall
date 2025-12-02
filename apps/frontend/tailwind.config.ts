import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bm: {
          ink: "var(--bm-ink)",
          muted: "var(--bm-muted)",
          shell: "var(--bm-shell)",
          card: "var(--bm-card)",
          accent: "var(--bm-accent)",
          "accent-soft": "var(--bm-accent-soft)",
          outline: "var(--bm-outline)"
        }
      }
    }
  },
  plugins: []
};

export default config;


