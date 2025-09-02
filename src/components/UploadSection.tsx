// src/components/UploadSection.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import * as tf from '@tensorflow/tfjs';

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 md:w-24 md:h-24 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
    </svg>
);

type AnalysisResult = {
    nama: string;
    asal: string;
    filosofi: string;
};

const UploadSection = () => {
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [labels, setLabels] = useState<string[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await tf.loadLayersModel('/model.json');
                setModel(loadedModel);
                const metadataResponse = await fetch('/metadata.json');
                const metadata = await metadataResponse.json();
                setLabels(metadata.labels);
                console.log("Model dan metadata berhasil dimuat.");
            } catch (error) {
                console.error("Gagal memuat model:", error);
            }
        };
        loadModel();
    }, []);

    const handleFileChange = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(file));
            setAnalysisResult(null);
        }
    };

    const handleDetectClick = async () => {
        if (!model || !imageRef.current || !previewUrl) {
            alert("Model belum siap atau tidak ada gambar untuk dideteksi.");
            return;
        }

        setIsLoading(true);
        
        try {
            const imageElement = imageRef.current;
            const tensor = tf.browser.fromPixels(imageElement)
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .expandDims(0);

            const predictions = model.predict(tensor) as tf.Tensor;
            const scores = await predictions.data();
            
            tensor.dispose(); 
            predictions.dispose();

            let highestScore = 0;
            let bestIndex = 0;
            scores.forEach((score, i) => {
                if (score > highestScore) {
                    highestScore = score;
                    bestIndex = i;
                }
            });
            
            const predictedBatikName = labels[bestIndex];
            const defaultFilosofi = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim sem, pulvinar et sollicitudin sed, congue quis metus. Donec suscipit nulla sit amet iaculis pulvinar. Nulla scelerisque lobortis eros, molestie euismod mi sollicitudin quis.";

            setAnalysisResult({
                nama: predictedBatikName,
                asal: `Hasil Deteksi (Akurasi: ${Math.round(highestScore * 100)}%)`,
                filosofi: defaultFilosofi,
            });

        } catch (error) {
            console.error("Error saat deteksi:", error);
            setAnalysisResult({
                nama: "Gagal Deteksi",
                asal: "-",
                filosofi: "Terjadi kesalahan saat proses identifikasi. Mohon coba gambar lain.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleClearClick = () => {
        setPreviewUrl(null);
        setAnalysisResult(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
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
        <section className="relative w-full py-20 lg:py-24 bg-[#F8F8F8]">
            <input type="file" ref={fileInputRef} onChange={onFileInputChange} accept="image/*" className="hidden" />
            {previewUrl && <img ref={imageRef} src={previewUrl} alt="hidden preview" className="hidden" />}
            <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: "url('/background_batik.png')" }}></div>

            <div className="relative z-10 container mx-auto px-6 max-w-5xl">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl lg:text-5xl font-serif text-gray-800">Motif batik identification</h1>
                    <p className="mt-4 text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim sem, pulvinar et sollicitudin sed, congue quis metus. Donec suscipit nulla sit amet iaculis pulvinar.</p>
                </div>

                <div className="bg-white p-8 rounded-[3rem] shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Kolom Kiri: Tempat Upload / Preview Gambar */}
                    <div 
                        onDrop={onDrop} 
                        onDragOver={onDragOver} 
                        onClick={() => fileInputRef.current?.click()}
                        // --- PERBAIKAN ADA DI BARIS DI BAWAH INI ---
                        className={"w-full h-full min-h-[400px] rounded-[2rem] cursor-pointer flex items-center justify-center relative overflow-hidden " + 
                                   (previewUrl ? 'bg-transparent' : 'bg-gray-200')}
                    >
                        {previewUrl ? (
                            <Image src={previewUrl} alt="Preview Batik" layout="fill" objectFit="cover" className="rounded-[2rem]" />
                        ) : (
                            <UploadIcon />
                        )}
                    </div>

                    {/* Kolom Kanan: Informasi & Tombol Aksi */}
                    <div className="flex flex-col p-4">
                        <h2 className="text-3xl font-serif text-gray-800">Nama batik</h2>
                        <div className="mt-4 space-y-2 text-gray-600 text-base">
                            <p><span className="font-semibold">Asal :</span> {analysisResult ? analysisResult.asal : "-"}</p>
                            <p className="line-clamp-6"><span className="font-semibold">Filosofi :</span> {analysisResult ? analysisResult.filosofi : "-"}</p>
                        </div>
                        
                        <div className="mt-auto pt-8 flex items-center gap-4">
                            <button 
                                onClick={handleDetectClick}
                                disabled={!previewUrl || !model || isLoading}
                                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Mendeteksi..." : (!model ? "Memuat Model..." : "Deteksi Batik")}
                            </button>
                            <button 
                                onClick={handleClearClick}
                                className="px-8 py-3 bg-white text-orange-500 font-bold rounded-full border border-orange-400 hover:bg-orange-50 transition-colors duration-300"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UploadSection;