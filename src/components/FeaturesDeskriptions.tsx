// src/components/Features.tsx
import React from 'react';

const Features = () => {
  return (
    <section id="fitur" className="py-20 bg-white"> {/* Background putih */}
      <div className="container mx-auto px-6">
        
        {/* Fitur 1: Gambar Kiri, Teks Kanan */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20"> {/* Ditambah mb-20 untuk jarak antar fitur */}
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-full h-80 rounded-3xl shadow-lg">
              {/* Ini adalah placeholder gambar. Ganti div ini dengan komponen <Image> dari Next.js */}
              {/* Contoh: <Image src="/path/to/image1.jpg" alt="Fitur 1" width={500} height={320} className="rounded-3xl" /> */}
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-4xl font-serif font-bold text-gray-800 mb-4 leading-snug"> {/* font-serif & text-4xl sesuai desain */}
              Judul Deskripsi Fitur 1
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg"> {/* text-lg untuk ukuran font lebih besar */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim sem, pulvinar et sollicitudin sed, congue quis metus. Donec suscipit nulla sit amet iaculis pulvinar.
            </p>
          </div>
        </div>

        {/* Fitur 2: Teks Kiri, Gambar Kanan */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 md:order-2"> {/* md:order-2 memindahkan gambar ke kanan di layar sedang/besar */}
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-full h-80 rounded-3xl shadow-lg">
              {/* Ini adalah placeholder gambar. Ganti div ini dengan komponen <Image> dari Next.js */}
              {/* Contoh: <Image src="/path/to/image2.jpg" alt="Fitur 2" width={500} height={320} className="rounded-3xl" /> */}
            </div>
          </div>
          <div className="md:w-1/2 md:order-1"> {/* md:order-1 memindahkan teks ke kiri di layar sedang/besar */}
            <h3 className="text-4xl font-serif font-bold text-gray-800 mb-4 leading-snug"> {/* font-serif & text-4xl sesuai desain */}
              Judul Deskripsi Fitur 2
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg"> {/* text-lg untuk ukuran font lebih besar */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim sem, pulvinar et sollicitudin sed, congue quis metus. Donec suscipit nulla sit amet iaculis pulvinar.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;