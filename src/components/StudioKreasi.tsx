// src/components/StudioKreasi.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import * as tf from '@tensorflow/tfjs';

// Komponen untuk ikon cloud
const CloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 md:w-24 md:h-24 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
    </svg>
);

// Komponen untuk animasi scan
const ScanningAnimation = () => (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute top-0 left-0 h-1.5 w-full bg-cyan-400 animate-scan shadow-[0_0_15px_2px_theme(colors.cyan.400)]"></div>
    </div>
);

const StudioKreasi = () => {
    const [prompt, setPrompt] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await tf.loadLayersModel('/model.json');
                setModel(loadedModel);
                const metadataResponse = await fetch('/metadata.json');
                const metadata = await metadataResponse.json();
                setLabels(metadata.labels);
            } catch (error) {
                console.error("Gagal memuat model:", error);
            }
        };
        loadModel();
    }, []);

    const handleFileChange = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            setUploadedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setGeneratedImageUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt || !uploadedFile || isLoading) return;

        setIsLoading(true);
        setGeneratedImageUrl(null);

        const formData = new FormData();
        formData.append('image', uploadedFile);
        formData.append('prompt', prompt);

        await new Promise(resolve => setTimeout(resolve, 4000));
        const imageUrlFromApi = '/batik-gallery-2.jpg';
        
        setGeneratedImageUrl(imageUrlFromApi);
        setIsLoading(false);
    };

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim sem, pulvinar et sollicitudin sed, congue quis metus. Donec suscipit nulla sit amet iaculis pulvinar.
                    </p>
                </div>

                <div 
                    onClick={() => !previewUrl && fileInputRef.current?.click()}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    className="mt-12 w-full max-w-2xl mx-auto aspect-video bg-gray-200 rounded-3xl shadow-lg flex items-center justify-center overflow-hidden relative"
                >
                    {previewUrl && !generatedImageUrl && (
                        <Image src={previewUrl} alt="Pratinjau gambar yang diunggah" layout="fill" objectFit="cover" />
                    )}
                    {generatedImageUrl && (
                        <Image src={generatedImageUrl} alt={`Gambar buatan AI dari prompt: ${prompt}`} layout="fill" objectFit="cover" />
                    )}
                    {!previewUrl && !generatedImageUrl && (
                        <div className="cursor-pointer"><CloudIcon /></div>
                    )}
                    {isLoading && (
                        <>
                            {previewUrl && <Image src={previewUrl} alt="Gambar dasar untuk AI" layout="fill" objectFit="cover" className="opacity-40" />}
                            <ScanningAnimation />
                        </>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
                    <div className="relative flex items-center w-full">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Contoh: gabungkan dengan motif burung merak"
                            className="w-full h-16 pl-6 pr-40 py-2 text-gray-700 bg-white border-2 border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button 
                            type="submit"
                            disabled={isLoading || !prompt || !uploadedFile}
                            className="absolute right-2 h-12 px-8 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Loading...' : 'Buat Gambar'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default StudioKreasi;