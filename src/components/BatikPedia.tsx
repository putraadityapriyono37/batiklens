"use client";
import Link from "next/link";
import Image from "next/image";

interface Batik {
  id: number;
  name: string;
  origin: string;
  image_url: string | null;
}

interface BatikPediaProps {
  motifs: Batik[];
}

const BatikPedia: React.FC<BatikPediaProps> = ({ motifs }) => {
  return (
    <section className="relative w-full py-20 lg:py-24 bg-gray-900 overflow-hidden">
      {/* Background batik pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-2"
        style={{ backgroundImage: "url('/background_batik.png')" }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-sans font-bold text-white">
            BatikPedia
          </h1>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Jelajahi ensiklopedia motif batik dari seluruh penjuru Nusantara.
            Kenali asal-usul dan makna filosofis di setiap coraknya.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {motifs?.map((motif) => (
            <Link href={`/BatikPedia/${motif.name}`} key={motif.id}>
              <div className="group block bg-white rounded-lg border border-transparent hover:border-[#D7AA83] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Gambar */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={motif.image_url || "/placeholder.png"}
                    alt={`Batik ${motif.name}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Text */}
                <div className="p-4">
                  <h3 className="font-semibold font-sans text-gray-900 group-hover:text-[#D7AA83] transition-colors">
                    {motif.name}
                  </h3>
                  <p className="text-sm text-gray-600">{motif.origin}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Glow Accent */}
      <div className="absolute w-72 h-72 bg-gradient-to-tr from-[#D7AA83] to-transparent blur-3xl rounded-full -bottom-20 -left-10 opacity-20"></div>
    </section>
  );
};

export default BatikPedia;
