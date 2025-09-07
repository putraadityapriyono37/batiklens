// src/components/Features.tsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from "@iconify/react";

// Data fitur Anda, saya tambahkan heading dan subheading agar sesuai desain baru
const featuresData = [
  {
    heading: 'Kenal Batik',
    subheading: 'Identifikasi motif batik secara instan hanya dengan satu foto.',
    imgSrc: '/images/features/kenal-batik.png', // Ganti dengan path gambar Anda
    href: '/KenalBatik',
  },
  {
    heading: 'Batik Pedia',
    subheading: 'Jelajahi ensiklopedia lengkap tentang sejarah & makna motif batik.',
    imgSrc: '/images/features/batik-pedia.png', // Ganti dengan path gambar Anda
    href: '/BatikPedia',
  },
  {
    heading: 'Studio Kreasi',
    subheading: 'Rancang dan visualisasikan motif batik kreasi Anda sendiri.',
    imgSrc: '/images/features/studio-kreasi.png', // Ganti dengan path gambar Anda
    href: '/StudioKreasi',
  },
  {
    heading: 'Batik Fit',
    subheading: 'Coba motif batik pada model virtual untuk melihat kecocokannya.',
    imgSrc: '/images/features/batik-fit.png', // Ganti dengan path gambar Anda
    href: '/BatikFit',
  },
];

const Features = () => {
    return (
        <section className="py-20 md:py-32 bg-white dark:bg-gray-900">
            {/* Menggunakan container yang konsisten dengan Header */}
            <div className='container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8' id="features-section">
                
                {/* Judul Section */}
                <div className='text-center mb-14'>
                    <p className='text-[#D7AA83] text-lg font-normal mb-3 tracking-widest uppercase'>Fitur Unggulan</p>
                    <h2 className='text-3xl lg:text-5xl font-semibold text-black dark:text-white lg:max-w-3xl mx-auto'>
                        Berbagai Macam Fitur Menarik untuk Anda Jelajahi
                    </h2>
                </div>
                
                {/* Grid untuk Kartu Fitur */}
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-28 gap-x-8 mt-32'>
                    {featuresData.map((item, i) => (
                        <div className='p-8 pt-0 relative rounded-3xl bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900/50 shadow-lg' key={i}>
                            
                            {/* Gambar yang Mengambang */}
                            <div className='flex justify-center absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48'>
                                {/* Lingkaran background untuk gambar */}
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-white dark:from-gray-700 dark:to-gray-800 rounded-full blur-sm"></div>
                                <Image 
                                    src={item.imgSrc} 
                                    alt={item.heading} 
                                    width={160} 
                                    height={160}
                                    className="relative object-contain transform hover:scale-110 transition-transform duration-300" 
                                />
                            </div>
                            
                            {/* Konten Teks di Dalam Kartu */}
                            <div className="text-center mt-28">
                                <h3 className='text-2xl text-black dark:text-white font-semibold'>{item.heading}</h3>
                                <p className='text-base font-normal text-black/50 dark:text-white/50 mt-2 h-16'>{item.subheading}</p>
                                
                                <div className='flex items-center justify-center mt-4'>
                                    <Link href={item.href} className='text-center text-lg group duration-300 ease-in-out font-medium text-[#D7AA83] mt-2 overflow-hidden flex items-center relative after:absolute after:w-full after:h-px after:bg-[#D7AA83] after:bottom-0 after:right-0 after:translate-x-full hover:after:translate-x-0'>
                                        Selengkapnya
                                        <Icon
                                            icon="tabler:chevron-right"
                                            width="24"
                                            height="24"
                                            className="text-[#D7AA83] transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features;