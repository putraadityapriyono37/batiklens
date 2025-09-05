// src/components/BatikPedia.tsx
"use client"; // Komponen ini interaktif karena mengandung Link

import Link from "next/link";
import Image from "next/image";

// Definisikan tipe data
interface Batik {
  id: number;
  name: string;
  origin: string;
  image_url: string | null;
}

// Definisikan tipe untuk props
interface BatikPediaProps {
  motifs: Batik[];
}

const BatikPedia: React.FC<BatikPediaProps> = ({ motifs }) => {
  return (
    <section className="relative w-full py-20 lg:py-24 bg-white">
      <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: "url('/background_batik.png')" }}></div>
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif text-gray-800">BatikPedia</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">Jelajahi ensiklopedia motif batik dari seluruh penjuru Nusantara. Kenali asal-usul dan makna filosofis di setiap coraknya.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {motifs?.map((motif) => (
            <Link href={`/BatikPedia/${motif.name}`} key={motif.id}>
              <div className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative w-full aspect-square">
                  <Image
                    src={motif.image_url || "/placeholder.png"}
                    alt={`Batik ${motif.name}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold font-serif text-gray-800">{motif.name}</h3>
                  <p className="text-sm text-gray-500">{motif.origin}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BatikPedia;