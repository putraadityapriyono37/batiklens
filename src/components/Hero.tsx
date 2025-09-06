// src/components/Hero.tsx
"use client";

import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative bg-orange-500 text-white overflow-hidden min-h-screen flex flex-col justify-center items-center text-center"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-20"
        style={{ backgroundImage: "url('/background_batik.png')" }}
      ></div>

      {/* Konten Hero */}
      <div className="relative z-10 container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight tracking-tight text-shadow-md">
          Lestarikan Budaya, <br className="hidden md:inline" /> Kenali Tiap
          Corak Batik
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-orange-100 text-shadow">
          Gunakan kekuatan AI untuk mengidentifikasi, mempelajari, dan menciptakan
          kembali keindahan warisan batik Indonesia.
        </p>

        {/* === TOMBOL AKSI (BAGIAN BARU) === */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/KenalBatik">
            <span className="w-full sm:w-auto px-8 py-4 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:bg-orange-100 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
              Coba Kenali Batik Sekarang
            </span>
          </Link>
          <Link href="/StudioKreasi">
            <span className="w-full sm:w-auto px-8 py-4 text-white font-semibold rounded-full hover:bg-white/20 transition-colors duration-300 cursor-pointer">
              Masuk Studio Kreasi →
            </span>
          </Link>
        </div>
        {/* ==================================== */}
      </div>
    </section>
  );
};

export default Hero;
