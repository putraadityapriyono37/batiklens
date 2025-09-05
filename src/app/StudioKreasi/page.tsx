// src/app/StudioKreasi/page.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StudioKreasi from '@/components/StudioKreasi'; // Import komponen intinya

export default function StudioKreasiPage() {
  return (
    <main className="bg-[#F8F8F8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
      </div>

      {/* Cukup panggil komponen StudioKreasi di sini */}
      <StudioKreasi />

      <Footer />
    </main>
  );
}