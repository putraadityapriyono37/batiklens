// src/components/Explore.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Menggunakan Link dari Next.js untuk navigasi

// Data untuk posisi, nama, dan link tujuan setiap pin
const pinData = [
  { top: '35%', left: '15%', label: 'Sumatra', href: '/eksplorasi/sumatra' },
  { top: '30%', left: '42%', label: 'Kalimantan', href: '/eksplorasi/kalimantan' },
  { top: '65%', left: '38%', label: 'Jawa', href: '/eksplorasi/jawa' },
  { top: '40%', left: '58%', label: 'Sulawesi', href: '/eksplorasi/sulawesi' },
  { top: '70%', left: '68%', label: 'Bali & NTT', href: '/eksplorasi/bali-ntt' },
  { top: '45%', left: '85%', label: 'Papua', href: '/eksplorasi/papua' },
];

// Komponen untuk ikon pin
const MapPinIcon = () => (
  <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C7.589 0 4 3.589 4 8c0 4.411 8 16 8 16s8-11.589 8-16c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </svg>
);

const Explore = () => {
  return (
    <section id="eksplore" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-serif text-gray-800">
          Eksplore Batik
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          di seluruh daerah di indonesia
        </p>
        <div className="relative max-w-5xl mx-auto mt-12">
          <Image
            src="/Petaindonesia.png"
            alt="Peta Eksplorasi Batik di Indonesia"
            width={1000}
            height={500}
            layout="responsive"
            objectFit="contain"
          />
          {pinData.map((pin, index) => (
            // --- PERBAIKAN ADA DI SINI ---
            // Tag <a> dihapus, dan semua props-nya dipindah ke <Link>
            <Link 
              href={pin.href} 
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus:outline-none group"
              style={{ top: pin.top, left: pin.left }}
            >
              <MapPinIcon />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {pin.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;