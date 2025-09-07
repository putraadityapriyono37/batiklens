// src/components/Gallery.tsx
"use client";

import React from 'react';
import Image from 'next/image';

const galleryItems = [
  { id: 1, src: '/images/gallery/mega_mendung.jpg', name: 'Batik Megamendung' },
  { id: 2, src: '/images/gallery/parang.jpg', name: 'Batik Parang' },
  { id: 3, src: '/images/gallery/kawung.jpg', name: 'Batik Kawung' },
  { id: 4, src: '/images/gallery/cendrawasih.jpg', name: 'Batik Cendrawasih' },
];

const Gallery = () => {
  return (
    // 1. Ubah background menjadi gelap
    <section 
      id="galeri" 
      className="relative py-20 md:py-32 bg-gray-900 overflow-hidden"
    >
      {/* Container sudah konsisten dengan komponen lain */}
      <div className="relative container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* 2. Sesuaikan teks di kolom kiri */}
          <div className="md:w-1/3 text-center md:text-left text-white md:pr-8">
            <h2 className="text-4xl md:text-5xl font-sans font-bold leading-tight">
              Ragam <span className="text-[#D7AA83]">batik</span> Nusantara
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Warisan Leluhur dalam Ribuan Corak.
            </p>
          </div>

          {/* 3. Bagian galeri di kanan (tidak banyak berubah) */}
          <div className="md:w-2/3 w-full">
            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group">
              <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
                
                {[...galleryItems, ...galleryItems].map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-48 h-72 md:w-56 md:h-80 relative mx-3">
                    <Image
                      src={item.src}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-2xl bg-white/10" // Sedikit penyesuaian opacity
                    />
                    <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent rounded-2xl">
                      <p className="font-semibold text-white">{item.name}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Gallery;