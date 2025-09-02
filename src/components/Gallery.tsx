// src/components/Gallery.tsx
"use client"; // Komponen ini sekarang memiliki interaksi (hover)

import React from 'react';
import Image from 'next/image';

// Data untuk item galeri, sekarang dengan 'name'
const galleryItems = [
  { id: 1, src: '/batik-gallery-1.jpg', name: 'Batik Megamendung' },
  { id: 2, src: '/batik-gallery-2.jpg', name: 'Batik Parang' },
  { id: 3, src: '/batik-gallery-3.jpg', name: 'Batik Kawung' },
  { id: 4, src: '/batik-gallery-4.jpg', name: 'Batik Sidomukti' },
  { id: 5, src: '/batik-gallery-5.jpg', name: 'Batik Truntum' },
  { id: 6, src: '/batik-gallery-6.jpg', name: 'Batik Sekar Jagad' },
];

const Gallery = () => {
  return (
    <section 
      id="galeri" 
      className="relative py-20 bg-orange-500 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-repeat opacity-5" 
        style={{ backgroundImage: "url('/background_batik.png')" }}
      ></div>

      <div className="relative container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          <div className="md:w-1/3 text-center md:text-left text-white px-6 md:pr-8">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Ragam batik Nusantara
            </h2>
            <p className="mt-4 text-lg text-orange-100">
              Warisan Leluhur dalam Ribuan Corak.
            </p>
          </div>

          {/* Bagian Galeri Auto-Scroll di Kanan */}
          <div className="md:w-2/3 w-full">
            {/* Kontainer untuk Scroll - 'group' untuk pause-on-hover */}
            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group">
              {/* Kontainer yang akan dianimasikan */}
              <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
                
                {/* Menampilkan item galeri DUA KALI untuk efek loop yang mulus */}
                {[...galleryItems, ...galleryItems].map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-48 h-72 md:w-56 md:h-80 relative mx-3">
                    <Image
                      src={item.src}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-2xl bg-white/20"
                    />
                    {/* Overlay untuk nama batik */}
                    <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent rounded-2xl">
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