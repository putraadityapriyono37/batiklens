// src/components/BatikDetail.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

interface MotifDetail {
    name: string;
    origin: string;
    philosophy: string;
    image_url: string | null;
}

interface BatikDetailProps {
    motif: MotifDetail;
}

const BatikDetail: React.FC<BatikDetailProps> = ({ motif }) => {
    return (
        <section className="w-full py-20 lg:py-32 bg-gray-900">
            {/* Kontainer Utama yang sudah disamakan jaraknya */}
            <div className="container mx-auto max-w-screen-xl pt-15 px-4 sm:px-6 lg:px-8">
                {/* Kartu Detail dengan style baru */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                        
                        {/* Kolom Kiri: Gambar Batik */}
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
                            <Image
                                src={motif.image_url || "/placeholder.png"}
                                alt={`Batik ${motif.name}`}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        {/* Kolom Kanan: Detail Teks */}
                        <div className="flex flex-col">
                            <h1 className="text-4xl lg:text-5xl font-serif text-white">
                                Batik <span className="text-[#D7AA83]">{motif.name}</span>
                            </h1>
                            <p className="mt-2 text-lg text-gray-300 font-semibold">{motif.origin}</p>
                            
                            <div className="mt-6 border-t border-gray-700 pt-6">
                                <h2 className="text-xl font-serif text-white mb-2">Filosofi</h2>
                                <p className="text-gray-400 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto pr-2">
                                    {motif.philosophy}
                                </p>
                            </div>
                            
                            <div className="mt-8">
                                <Link href="/BatikPedia">
                                    <span className="text-[#D7AA83] hover:text-[#c99c75] font-semibold transition-colors flex items-center group">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                        </svg>
                                        Kembali ke BatikPedia
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BatikDetail;