// src/components/StudioKreasi.tsx
"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

// --- Komponen-komponen UI (tidak diubah) ---
const CloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 md:w-24 md:h-24 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
    </svg>
);

const ScanningAnimation = () => (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute top-0 left-0 h-1.5 w-full bg-cyan-400 animate-scan shadow-[0_0_15px_2px_theme(colors.cyan.400)]"></div>
    </div>
);
// --- Akhir dari Komponen UI ---


const StudioKreasi = () => {
    const [prompt, setPrompt] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // State untuk pesan error
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            setUploadedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setGeneratedImageUrl(null);
            setError(null);
        }
    };

    // --- PERUBAHAN UTAMA ADA DI FUNGSI INI ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt || !uploadedFile || isLoading) return;

        setIsLoading(true);
        setGeneratedImageUrl(null);
        setError(null);

        const formData = new FormData();
        formData.append('image', uploadedFile);
        formData.append('prompt', prompt);

        try {
            // Panggil API tunggal kita dan tunggu hasilnya
            const response = await fetch('/api/generate-batik', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                // Coba baca pesan error dari server jika ada
                const errorData = await response.json();
                throw new Error(errorData.error || 'Gagal menghasilkan gambar.');
            }
            
            // Terima hasil sebagai data gambar (Blob)
            const imageBlob = await response.blob();
            
            // Ubah data gambar (Blob) menjadi URL yang bisa ditampilkan di tag <img>
            const imageUrlFromApi = URL.createObjectURL(imageBlob);
            
            setGeneratedImageUrl(imageUrlFromApi);

        } catch (err: any) {
            console.error("Error saat submit:", err);
            setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
        } finally {
            setIsLoading(false);
        }
    };
    // --- AKHIR DARI PERUBAHAN ---

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFileChange(e.dataTransfer.files[0]);
    };
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e.target.files?.[0] || null);
    };

    return (
        <section className="relative w-full py-12 lg:py-16">
            <input type="file" ref={fileInputRef} onChange={onFileInputChange} accept="image/*" className="hidden" />
            <div className="absolute inset-0 bg-repeat opacity-50" style={{ backgroundImage: "url('/background_batik.png')" }}></div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl lg:text-5xl font-serif text-gray-800">Studio Kreasi</h1>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        Unggah gambar batik referensi, berikan sentuhan imajinasimu melalui teks, dan biarkan AI menciptakan sebuah mahakarya baru untukmu.
                    </p>
                </div>

                <div 
                    onClick={() => !previewUrl && fileInputRef.current?.click()}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    className="mt-12 w-full max-w-2xl mx-auto aspect-video bg-gray-200/50 backdrop-blur-sm border border-gray-300 rounded-3xl shadow-lg flex items-center justify-center overflow-hidden relative"
                >
                    {generatedImageUrl && (
                        <Image src={generatedImageUrl} alt={`Gambar buatan AI dari prompt: ${prompt}`} layout="fill" objectFit="cover" />
                    )}
                    {previewUrl && !generatedImageUrl && (
                        <Image src={previewUrl} alt="Pratinjau gambar yang diunggah" layout="fill" objectFit="cover" />
                    )}
                    {!previewUrl && !generatedImageUrl && (
                        <div className="cursor-pointer text-center">
                            <CloudIcon />
                            <p className="mt-2 text-gray-500 font-semibold">Pilih Gambar Referensi</p>
                        </div>
                    )}
                    {isLoading && (
                        <>
                            {previewUrl && <Image src={previewUrl} alt="Gambar dasar untuk AI" layout="fill" objectFit="cover" className="opacity-40" />}
                            <ScanningAnimation />
                        </>
                    )}
                </div>

                {/* Tampilkan pesan error jika ada */}
                {error && (
                    <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-lg max-w-2xl mx-auto">
                        <strong>Oops!</strong> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
                    <div className="relative flex items-center w-full">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Contoh: ubah dengan gaya burung merak emas"
                            className="w-full h-16 pl-6 pr-40 py-2 text-gray-700 bg-white border-2 border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button 
                            type="submit"
                            disabled={isLoading || !prompt || !uploadedFile}
                            className="absolute right-2 h-12 px-8 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Mencipta...' : 'Buat Gambar'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default StudioKreasi;