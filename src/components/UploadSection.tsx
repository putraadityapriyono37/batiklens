// src/components/UploadSection.tsx
"use client"; // Menandakan ini adalah Client Component

import React, { useState, useRef } from 'react';
import Image from 'next/image';

// Komponen untuk ikon upload
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 md:w-24 md:h-24 text-white/80">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
    </svg>
);

const UploadSection = () => {
    // State untuk menyimpan file yang di-upload dan untuk status drag
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Ref untuk mengakses input file yang tersembunyi
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fungsi untuk memproses file yang dipilih
    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Event handler untuk klik tombol, drag, dan drop
    const onButtonClick = () => fileInputRef.current?.click();
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const onDragLeave = () => setIsDragging(false);
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };
    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    return (
        <section id="upload-fitur" className="relative w-full py-20 lg:py-24 bg-gray-100 overflow-hidden">
            <input type="file" ref={fileInputRef} onChange={onFileInputChange} accept="image/*" className="hidden" />
            
            <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: "url('/background_batik.png')" }}></div>

            <div className="relative container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <div className="text-center lg:text-left text-gray-900">
                        {/* --- PERUBAHAN HANYA DI BARIS INI --- */}
                        <h1 className="text-4xl lg:text-6xl font-serif leading-tight">
                            Lestarikan Batik<br />dengan KenalBatik
                        </h1>
                        <p className="mt-6 text-gray-500 text-lg max-w-lg mx-auto lg:mx-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim sem, pulvinar et sollicitudin sed, congue quis metus. Donec suscipit nulla sit amet iaculis pulvinar.
                        </p>
                        <button onClick={onButtonClick} className="mt-8 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold px-10 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                            Upload Gambar
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <div
                            onClick={onButtonClick}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            className={`relative p-2 border-4 ${isDragging ? 'border-blue-400' : 'border-orange-400'} rounded-[40px] w-full max-w-md cursor-pointer transition-all duration-300 ${isDragging ? 'scale-105' : 'scale-100'}`}
                        >
                            <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden group">
                                <Image
                                    src={previewUrl || "/background_batik.png"}
                                    alt="Upload gambar batik"
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className={`absolute inset-0 bg-black/30 flex flex-col items-center justify-center transition-opacity duration-300 ${previewUrl ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                                    <UploadIcon />
                                    {isDragging && <p className="mt-4 text-white font-semibold">Lepaskan file di sini</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UploadSection;