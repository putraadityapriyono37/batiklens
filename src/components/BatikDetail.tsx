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
        <section className="w-full py-20 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                            <Image
                                src={motif.image_url || "/placeholder.png"}
                                alt={`Batik ${motif.name}`}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-4xl lg:text-5xl font-serif text-gray-800">Batik {motif.name}</h1>
                            <p className="mt-2 text-lg text-gray-600 font-semibold">{motif.origin}</p>
                            <div className="mt-6 border-t pt-6">
                                <h2 className="text-xl font-serif text-gray-800 mb-2">Filosofi</h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{motif.philosophy}</p>
                            </div>
                            <div className="mt-8">
                              <Link href="/BatikPedia">
                                  <span className="text-orange-500 hover:text-orange-700 font-semibold transition-colors">
                                      ← Kembali ke Galeri
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