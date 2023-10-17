import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8fef94",
          secondary: "#efea62",
          accent: "#c214ce",
          neutral: "#2c303a",
          "base-100": "#2e2753",
          info: "#b1dee7",
          success: "#2bca80",
          warning: "#e8b730",
          error: "#fa3d43",
        },
      },
    ],
  },
};
export default config;
