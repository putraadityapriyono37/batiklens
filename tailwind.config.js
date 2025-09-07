// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      // ... (konfigurasi Anda yang lain seperti fontFamily, dll.)
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
              // Ganti konfigurasi lama dengan ini
              sans: ['var(--font-cutoff-pro)', 'sans-serif'],
            },
            colors: {
              'batik-brown': '#D7AA83',
            },
            // ...konfigurasi lainnya
          },
        },
        plugins: [],
      }

      // --- TAMBAHKAN BAGIAN INI ---
      animation: {
        scroll: 'scroll 40s linear infinite',
        scan: 'scan 2s ease-in-out infinite', // Animasi baru kita
      },
      keyframes: {
        scroll: {
          // ... (keyframe scroll Anda yang sudah ada)
        },
        scan: { // Keyframe untuk animasi scan
          '0%, 100%': { transform: 'translateY(-10%)', opacity: 0 },
          '50%': { transform: 'translateY(110%)', opacity: 1 },
        },
      },
      // --- AKHIR BAGIAN TAMBAHAN ---
    },
  },
  plugins: [],
};