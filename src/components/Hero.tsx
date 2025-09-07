// src/components/HeroSection.tsx

"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
// import CardSlider from "./CardSlider"; // Kita akan buat file ini di langkah berikutnya

const HeroSection = () => {
  // Animasi masuk dari sisi kiri
  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  // Animasi masuk dari sisi kanan
  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      className="relative bg-gray-900 md:pt-40 md:pb-28 py-20 overflow-hidden"
      id="hero"
    >
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 items-center">
          
          {/* === KOLOM KIRI: KONTEN ANDA === */}
          <motion.div {...leftAnimation} className="lg:col-span-6 col-span-12">
            <h1 className="font-sans font-bold lg:text-7xl md:text-6xl text-4xl lg:text-left text-center text-white leading-tight tracking-tight mb-6">
              Lestarikan Budaya, <br className="hidden md:inline" /> Kenali Tiap
              <span className="text-[#D7AA83]"> Corak Batik</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl max-w-2xl lg:text-left text-center mx-auto lg:mx-0 text-gray-300">
              Gunakan kekuatan AI untuk mengidentifikasi, mempelajari, dan menciptakan
              kembali keindahan warisan batik Indonesia.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4">
              <Link href="/KenalBatik">
                <span className="block w-full sm:w-auto px-8 py-4 bg-[#D7AA83] text-stone-800 font-bold rounded-full shadow-lg hover:bg-[#c99c75] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                  Coba Kenali Batik Sekarang
                </span>
              </Link>
              <Link href="/StudioKreasi">
                <span className="block w-full sm:w-auto px-8 py-4 text-white font-semibold rounded-full border border-gray-600 hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                  Masuk Studio Kreasi →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* === KOLOM KANAN: GAMBAR DARI REFERENSI === */}
          <motion.div
            {...rightAnimation}
            className="col-span-6 lg:block hidden"
          >
            <div className="ml-10">
              {/* Anda bisa ganti gambar ini dengan gambar pilihan Anda */}
              <Image
                src="/images/hero/membatik.png"
                alt="Banner Batik"
                width={1150}
                height={1150}
              />
            </div>
          </motion.div>
        </div>
        
        {/* === SLIDER DARI REFERENSI === */}
        {/* <CardSlider /> */}
      </div>

      {/* Efek Latar Belakang dari Referensi */}
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-teal-500 from-50% to-gray-700 to-60% blur-3xl rounded-full -top-32 -right-14 opacity-30"></div>
    </section>
  );
};

export default HeroSection;