// src/components/Features.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const featureData = [
  {
    label: 'FITUR 1',
    imageSrc: '/background_batik.png',
    alt: 'Contoh Motif Batik 1',
    href: '/KenalBatik', 
  },
  {
    label: 'FITUR 2',
    imageSrc: '/background_batik.png',
    alt: 'Contoh Motif Batik 2',
    href: '/BatikPedia',
  },
  {
    label: 'FITUR 3',
    imageSrc: '/background_batik.png',
    alt: 'Contoh Motif Batik 3',
    href: '/StudioKreasi',
  },
  {
    label: 'FITUR 4',
    imageSrc: '/background_batik.png',
    alt: 'Contoh Motif Batik 4',
    href: '/BatikFit',
  },
];

const Features = () => {
  return (
    <section id="fitur" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        
        <div className="relative bg-gradient-to-b from-orange-400 to-orange-600 rounded-3xl lg:rounded-[50px] px-6 pt-10 pb-32 shadow-xl">
          
          <h2 className="text-4xl font-serif text-white mb-8 md:mb-12">
            Fitur-fitur KenalBatik
          </h2>

          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
            {/* --- PERUBAHAN ADA DI BARIS DI BAWAH INI --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {featureData.map((feature) => (
                <Link href={feature.href} key={feature.label}>
                  <div className="bg-orange-400 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                    <div className="relative w-full h-48 sm:h-56 md:h-64">
                      <Image
                        src={feature.imageSrc}
                        alt={feature.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-2xl"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-white text-lg">
                        {feature.label}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;