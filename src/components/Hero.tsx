// src/components/Hero.tsx
import React from 'react';

const Hero = () => {
  return (
    <section 
      id="hero" 
      // --- PERUBAHAN UTAMA ADA DI BARIS INI ---
      className="relative bg-orange-500 text-white overflow-hidden min-h-screen flex flex-col justify-center items-center"
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-repeat opacity-4" 
        style={{ backgroundImage: "url('/background_batik.png')" }}
      ></div>
      
      {/* Konten Hero */}
      {/* PERUBAHAN: Menghapus padding vertikal karena sudah diatur oleh flexbox */}
      <div className="relative container mx-auto px-4 text-center">
        <p className="text-lg md:text-xl mb-3 font-medium">
          Welcome to Batiklens
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Lestarikan Batik <br className="hidden md:inline"/> dengan Batik Lens
        </h1>
      </div>
    </section>
  );
};

export default Hero;