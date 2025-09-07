// src/app/BatikFit/page.tsx
"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

const fashionModels = [
  {
    name: 'Kemeja',
    silhouette: '/images/fitin/KEMEJA.svg',
    shading: '/images/fitin/MULTIPLY-KEMEJA.png',
  },
  {
    name: 'Dress',
    silhouette: '/images/fitin/DRESS.svg',
    shading: '/images/fitin/MULTIPLY-DRESS.png',
  },
  {
    name: 'Tas',
    silhouette: '/images/fitin/BAG.svg',
    shading: '/images/fitin/MULTIPLY-BAG.png',
  },
];

const BatikFitPage = () => {
    // Logika state dan file handling tidak berubah
    const [patternUrl, setPatternUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            if (patternUrl) URL.revokeObjectURL(patternUrl);
            setPatternUrl(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <main className="relative min-h-screen w-full py-20 lg:py-32 bg-gray-900">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            <div className="relative z-10 container mx-auto max-w-screen-xl pt-15 px-4 sm:px-6 lg:px-8 text-center">
                {/* Judul dan Deskripsi */}
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl lg:text-5xl font-serif text-white">
                        Fit In <span className="text-[#D7AA83]">Batik</span> ke Fashion
                    </h1>
                    <p className="mt-4 text-gray-300 leading-relaxed">
                        Pernahkah Anda bertanya-tanya bagaimana motif batik pilihan Anda akan terlihat pada sebuah kemeja atau dress? Unggah gambar motif batik, dan lihat visualisasinya secara instan.
                    </p>
                </div>

                {/* Tombol Upload */}
                <div className="mt-12">
                    <button 
                        onClick={triggerFileInput}
                        className="bg-[#D7AA83] text-stone-800 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-[#c99c75] hover:scale-105 transition-all duration-300"
                    >
                        {patternUrl ? 'Ganti Motif Batik' : 'Pilih & Upload Motif Batik'}
                    </button>
                </div>
                
                {/* Grid untuk Model Fashion */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {fashionModels.map((model) => (
                        <div
                            key={model.name}
                            className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden mx-auto"
                        >
                            {/* Layer 1: Motif yang sudah di-masking */}
                            {patternUrl && (
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${patternUrl})`,
                                        maskImage: `url(${model.silhouette})`,
                                        maskRepeat: "no-repeat",
                                        maskPosition: "center",
                                        maskSize: "contain",
                                        WebkitMaskImage: `url(${model.silhouette})`,
                                        WebkitMaskRepeat: "no-repeat",
                                        WebkitMaskPosition: "center",
                                        WebkitMaskSize: "contain",
                                    }}
                                />
                            )}

                            {/* Layer 2: Shading/garis dengan multiply */}
                            <Image
                                src={model.shading}
                                alt={`Shading ${model.name}`}
                                layout="fill"
                                objectFit="contain"
                                className="mix-blend-multiply"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default BatikFitPage;