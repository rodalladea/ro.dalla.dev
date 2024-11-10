import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                terminal: {
                    black: "#000000",
                    highlight: "#21202e",
                    "highlight-high": "#2a283e",
                    "text-primary": "#e0def4",
                    "text-secondary": "#908caa",
                    "text-green": "#3e8fb0",
                    "text-foam": "#9ccfd8",
                    "text-red": "#eb6f92",
                    "text-pink": "#ea9a97",
                    "text-gold": "#ea9d34",
                    border: "#4b4b4b",
                    selected: "#44415a",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
