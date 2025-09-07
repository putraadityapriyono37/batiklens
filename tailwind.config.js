// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-cutoff-pro)', 'sans-serif'],
      },
      colors: {
        'batik-brown': '#D7AA83',
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
        scan: 'scan 2s ease-in-out infinite',
      },
      keyframes: {
        scroll: {
          // isi keyframes scroll kamu
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-10%)', opacity: 0 },
          '50%': { transform: 'translateY(110%)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
