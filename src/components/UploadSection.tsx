// src/components/UploadSection.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import * as tf from '@tensorflow/tfjs';
import { supabase } from '@/lib/supabaseClient'; // Pastikan path ini benar

// --- Komponen & Tipe Data ---
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 md:w-24 md:h-24 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
    </svg>
);

interface Batik {
    name: string;
    origin: string;
    philosophy: string;
}

// --- Komponen Utama ---
const UploadSection = () => {
    // State untuk AI & Data
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [labels, setLabels] = useState<string[]>([]);
    const [analysisResult, setAnalysisResult] = useState<Batik | null>(null);
    
    // State untuk UI
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string>("-");

    // Refs
    const imageRef = useRef<HTMLImageElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // [LOGIKA AI & DATABASE DIMULAI DI SINI]

    useEffect(() => {
        const loadModel = async () => {
            try {
                // Pastikan path ke model sudah benar
                const loadedModel = await tf.loadLayersModel('/model/model.json');
                const metadataResponse = await fetch('/model/metadata.json');
                const metadata = await metadataResponse.json();
                setModel(loadedModel);
                setLabels(metadata.labels);
                console.log("Model dan metadata berhasil dimuat.");
            } catch (error) {
                console.error("Gagal memuat model:", error);
                // Handle error di UI jika diperlukan
            }
        };
        loadModel();
    }, []);

    const fetchBatikDetails = async (motifName: string): Promise<Batik | null> => {
        try {
            const { data, error } = await supabase
                .from('motifs')
                .select('name, origin, philosophy')
                .eq('name', motifName)
                .single();

            if (error) {
                console.error('Error mengambil data dari Supabase:', error);
                return null;
            }
            return data;
        } catch (error) {
            console.error('Error tak terduga saat fetch:', error);
            return null;
        }
    };

    const handleDetectClick = async () => {
        if (!model || !imageRef.current || !previewUrl) {
            alert("Model belum siap atau tidak ada gambar untuk dideteksi.");
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null); // Reset hasil sebelumnya
        
        try {
            const imageElement = imageRef.current;
            
            // Proses gambar dengan TensorFlow.js
            const tensor = tf.browser.fromPixels(imageElement)
                .resizeBilinear([224, 224])
                .toFloat()
                .expandDims(0)
                .div(tf.scalar(255)); // Normalisasi

            const predictions = model.predict(tensor) as tf.Tensor;
            const scores = await predictions.data();
            
            tf.dispose([tensor, predictions]); // Wajib untuk membersihkan memori

            // Cari prediksi terbaik
            let highestScore = 0;
            let bestIndex = 0;
            scores.forEach((score, i) => {
                if (score > highestScore) {
                    highestScore = score;
                    bestIndex = i;
                }
            });
            
            const predictedBatikName = labels[bestIndex];
            setStatusMessage(`Hasil Deteksi (Akurasi: ${Math.round(highestScore * 100)}%)`);

            // Ambil detail dari Supabase berdasarkan prediksi
            const details = await fetchBatikDetails(predictedBatikName);

            if (details) {
                setAnalysisResult(details);
            } else {
                // Handle jika data tidak ditemukan di Supabase
                setAnalysisResult({
                    name: predictedBatikName,
                    origin: "Data tidak ditemukan",
                    philosophy: "Informasi detail untuk motif ini belum tersedia di database kami.",
                });
            }

        } catch (error) {
            console.error("Error saat deteksi:", error);
            setAnalysisResult({
                name: "Gagal Deteksi",
                origin: "-",
                philosophy: "Terjadi kesalahan saat proses identifikasi. Mohon coba gambar lain.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // [LOGIKA UI & EVENT HANDLERS]

    const handleFileChange = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setAnalysisResult(null); // Reset hasil saat gambar baru dipilih
            setStatusMessage("-");

            // Otomatis muat gambar ke elemen <img> tersembunyi
            if (imageRef.current) {
                imageRef.current.src = url;
            }
        }
    };
    
    const handleClearClick = () => {
        setPreviewUrl(null);
        setAnalysisResult(null);
        setStatusMessage("-");
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

    // [BAGIAN TAMPILAN (JSX)]
    return (
        <section className="relative w-full py-20 lg:py-24 bg-[#F8F8F8]">
            <input type="file" ref={fileInputRef} onChange={onFileInputChange} accept="image/*" className="hidden" />
            {/* <img> tersembunyi ini penting untuk dibaca oleh TensorFlow.js */}
            <img ref={imageRef} src={previewUrl || ""} alt="hidden preview" className="hidden" />
            <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: "url('/background_batik.png')" }}></div>

            <div className="relative z-10 container mx-auto px-6 max-w-5xl">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl lg:text-5xl font-serif text-gray-800">Kenali Motif Batik</h1>
                    <p className="mt-4 text-gray-600 leading-relaxed">Unggah gambar kain batik Anda, dan biarkan teknologi AI kami mengidentifikasi nama, asal, dan filosofi di baliknya dalam hitungan detik.</p>
                </div>

                <div className="bg-white p-8 rounded-[3rem] shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Kolom Kiri: Tempat Upload / Preview Gambar */}
                    <div 
                        onDrop={onDrop} 
                        onDragOver={onDragOver} 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full min-h-[400px] rounded-[2rem] cursor-pointer flex items-center justify-center relative overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300"
                    >
                        {previewUrl ? (
                            <Image src={previewUrl} alt="Preview Batik" layout="fill" objectFit="cover" className="rounded-[2rem]" />
                        ) : (
                            <div className="text-center text-gray-500">
                                <UploadIcon />
                                <p className="mt-2 font-semibold">Tarik & Lepas Gambar</p>
                                <p className="text-sm">atau klik untuk memilih file</p>
                            </div>
                        )}
                    </div>

                    {/* Kolom Kanan: Informasi & Tombol Aksi */}
                    <div className="flex flex-col p-4 h-full">
                        <h2 className="text-3xl font-serif text-gray-800">
                           {analysisResult ? `Batik ${analysisResult.name}` : "Hasil Analisis"}
                        </h2>
                        <div className="mt-4 space-y-2 text-gray-600 text-base flex-grow">
                            <p><span className="font-semibold">Asal:</span> {analysisResult ? analysisResult.origin : statusMessage}</p>
                            <p className="line-clamp-6"><span className="font-semibold">Filosofi:</span> {analysisResult ? analysisResult.philosophy : "-"}</p>
                        </div>
                        
                        <div className="mt-auto pt-8 flex items-center gap-4">
                            <button 
                                onClick={handleDetectClick}
                                disabled={!previewUrl || !model || isLoading}
                                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Mendeteksi..." : (!model ? "Memuat Model..." : "Deteksi Batik")}
                            </button>
                            {previewUrl && (
                                <button 
                                    onClick={handleClearClick}
                                    className="px-8 py-3 bg-white text-orange-500 font-bold rounded-full border border-orange-400 hover:bg-orange-50 transition-colors duration-300"
                                >
                                    Hapus
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UploadSection;