// src/app/BatikFit/page.tsx
"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

// Update struktur data untuk memuat 2 jenis gambar
const fashionTemplates = [
  {
    name: 'Kemeja',
    silhouetteSrc: '/kemeja-siluet.png', // Ganti dengan file siluet Anda
    maskSrc: '/kemeja-mask.png',         // Ganti dengan file mask Anda
  },
  {
    name: 'Dress',
    silhouetteSrc: '/dress-siluet.png',
    maskSrc: '/dress-siluet.png',
  },
  {
    name: 'Tas',
    silhouetteSrc: '/tas-siluet.png',
    maskSrc: '/tas-mask.png',
  },
];

const BatikFitPage = () => {
  const [patternUrl, setPatternUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        // Hapus URL lama untuk mencegah memory leak
        if (patternUrl) {
            URL.revokeObjectURL(patternUrl);
        }
        setPatternUrl(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="relative min-h-screen w-full py-20 lg:py-24 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div 
        className="absolute inset-0 bg-repeat opacity-5" 
        style={{ backgroundImage: "url('/background_batik.png')" }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-serif text-white">
            Fit In Batik ke Fashion
          </h1>
          <p className="mt-4 text-orange-100 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim sem, pulvinar et sollicitudin sed, congue quis metus. Donec suscipit nulla sit amet iaculis pulvinar.
          </p>
        </div>

        {/* Grid Template Fashion */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {fashionTemplates.map((template) => (
            <div
              key={template.name}
              className="relative w-full aspect-[3/4] rounded-3xl shadow-lg overflow-hidden"
              style={{
                backgroundImage: patternUrl ? `url(${patternUrl})` : 'none',
                backgroundColor: '#FFFFFF', // Selalu putih, karena siluet sudah punya warna sendiri
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Logika untuk menampilkan siluet atau mask */}
              {patternUrl ? (
                // JIKA SUDAH UPLOAD: Tampilkan MASK transparan di atas background motif
                <Image
                  src={template.maskSrc}
                  alt={`Template mask for ${template.name}`}
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                // JIKA BELUM UPLOAD: Tampilkan SILUET abu-abu
                <Image
                  src={template.silhouetteSrc}
                  alt={`Silhouette of ${template.name}`}
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button 
            onClick={triggerFileInput}
            className="bg-yellow-500/90 text-gray-800 font-bold px-10 py-4 rounded-full shadow-lg backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-transform duration-300"
          >
            Upload Gambar
          </button>
        </div>
      </div>
    </main>
  );
};

export default BatikFitPage;