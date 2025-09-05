// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      // ... (konfigurasi Anda yang lain seperti fontFamily, dll.)

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