// src/components/StudioKreasi.tsx
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

// --- Komponen UI (disesuaikan untuk tema gelap) ---
const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 md:w-24 md:h-24 text-gray-500 dark:text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const Spinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-3xl z-20">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
    <span className="ml-4 text-white font-medium">Membuat kreasi...</span>
  </div>
);

// --- Fungsi Backend (TIDAK DIUBAH) ---
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const StudioKreasi = () => {
  const [prompt, setPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ==========================================================
  // SEMUA LOGIKA BACKEND DI BAWAH INI TIDAK DIUBAH SAMA SEKALI
  // ==========================================================
  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setGeneratedImageUrl(null);
      setError(null);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt || !uploadedFile || isLoading) return;
    setIsLoading(true);
    setGeneratedImageUrl(null);
    setError(null);
    try {
      const imageBase64 = await fileToBase64(uploadedFile);
      const response = await fetch("/api/generate-batik", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageBase64, prompt: prompt }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menghasilkan gambar.");
      }
      const imageBlob = await response.blob();
      const imageUrlFromApi = URL.createObjectURL(imageBlob);
      setGeneratedImageUrl(imageUrlFromApi);
    } catch (err: any) {
      console.error("Error saat submit:", err);
      setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDownload = () => {
    if (!generatedImageUrl) return;
    const a = document.createElement('a');
    a.href = generatedImageUrl;
    a.download = `batik-kreasi-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleDeleteResult = () => { setGeneratedImageUrl(null); };
  const handleResetAll = () => {
    setGeneratedImageUrl(null);
    setUploadedFile(null);
    setPreviewUrl(null);
    setPrompt("");
    setError(null);
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLoading) return;
    handleFileChange(e.dataTransfer.files[0]);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); };
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;
    handleFileChange(e.target.files?.[0] || null);
  };
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };
  // ==========================================================
  // AKHIR DARI BAGIAN LOGIKA BACKEND
  // ==========================================================
  
  return (
    <section className="relative w-full py-20 lg:py-32 bg-gray-900">
      <input type="file" ref={fileInputRef} onChange={onFileInputChange} accept="image/*" className="hidden" />

      <div className="relative z-10 container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center pt-25    ">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-serif text-white">
            Studio <span className="text-[#D7AA83]">Kreasi</span>
          </h1>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Unggah gambar batik referensi, berikan sentuhan imajinasimu melalui
            teks, dan biarkan AI menciptakan sebuah mahakarya baru untukmu.
          </p>
        </div>

        {/* Dropzone / Preview */}
        <div
          onClick={() => !previewUrl && !isLoading && fileInputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          className={`mt-12 w-full max-w-3xl mx-auto aspect-video bg-white/5 backdrop-blur-sm border-2 border-dashed border-gray-600 rounded-3xl shadow-lg flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:border-[#D7AA83] ${!previewUrl && !isLoading ? 'cursor-pointer' : 'cursor-default'}`}
        >
          {generatedImageUrl && <Image src={generatedImageUrl} alt={`Gambar buatan AI dari prompt: ${prompt}`} fill style={{ objectFit: "cover" }} />}
          {previewUrl && !generatedImageUrl && <Image src={previewUrl} alt="Pratinjau gambar yang diunggah" fill style={{ objectFit: "cover" }} />}
          {!previewUrl && !generatedImageUrl && (
            <div className="text-center p-6">
              <CloudIcon />
              <p className="mt-4 text-gray-400 font-semibold">
                Seret dan lepas gambar referensi di sini atau klik untuk memilih
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Format yang didukung: JPG, PNG, WebP
              </p>
            </div>
          )}
          {isLoading && <Spinner />}

          {/* Tombol aksi untuk gambar hasil generate */}
          {generatedImageUrl && !isLoading && (
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button onClick={(e) => { e.stopPropagation(); handleDownload(); }} className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-md transition-colors duration-200" title="Download gambar">
                <DownloadIcon />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteResult(); }} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-md transition-colors duration-200" title="Hapus hasil">
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>

        {/* Info file dan tombol reset */}
        {(previewUrl || generatedImageUrl) && !isLoading && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {uploadedFile && (
              <div className="text-sm text-gray-300 bg-white/10 px-4 py-2 rounded-full">
                File: {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)} KB)
              </div>
            )}
            <button onClick={handleResetAll} className="text-sm text-red-500 hover:text-red-400 px-4 py-2 border border-red-500/30 hover:border-red-400/50 rounded-full transition-colors">
              Reset Semua
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500 bg-red-500/10 p-3 rounded-lg max-w-2xl mx-auto border border-red-500/20">
            <strong>Oops!</strong> {error}
          </div>
        )}

        {/* Prompt Input */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-3xl mx-auto">
          <div className="relative w-full">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => { setPrompt(e.target.value); adjustTextareaHeight(); }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e as any); } }}
              placeholder="Contoh: ubah dengan gaya burung merak emas"
              className="w-full min-h-[4rem] max-h-48 py-4 pl-6 pr-40 text-gray-800 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D7AA83] focus:border-transparent transition-all duration-200 resize-none"
              disabled={isLoading}
              rows={1}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt || !uploadedFile}
              className="absolute right-2 top-2 bottom-2 h-auto px-8 bg-[#D7AA83] text-stone-800 font-bold rounded-xl hover:bg-[#c99c75] disabled:bg-[#D7AA83]/50 transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-stone-800 mr-2"></div><span>Memproses</span></div>
              ) : ( "Buat Gambar" )}
            </button>
          </div>
          <p className="text-left text-sm text-gray-400 mt-2 ml-6">
            Jelaskan perubahan yang Anda inginkan (Enter untuk kirim, Shift+Enter untuk baris baru)
          </p>
        </form>
      </div>
    </section>
  );
};

export default StudioKreasi;