import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Menambahkan konfigurasi untuk mengabaikan error ESLint saat build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;