// src/components/Navbar.tsx
import React from 'react';

const Navbar = () => {
  return (
    // PERBAIKAN: Menggunakan background putih yang valid dan menambah bayangan tipis
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* PERBAIKAN: Mengubah warna teks brand agar terlihat di latar putih */}
        <div className="text-gray-800 font-bold text-xl">
          BatikLens
        </div>
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {/* PERBAIKAN: Mengubah warna hover agar lebih kontras */}
          <li><a href="#fitur" className="hover:text-orange-600 transition-colors">Fitur</a></li>
          <li><a href="#eksplore" className="hover:text-orange-600 transition-colors">Eksplore</a></li>
          <li><a href="#galeri" className="hover:text-orange-600 transition-colors">Galeri</a></li>
        </ul>
        
        {/* PERBAIKAN: Mengubah semua 'class' menjadi 'className' */}
        <div className="inline-flex items-center rounded-full bg-white p-1 shadow-md">
          <button className="rounded-full p-2 transition-colors hover:bg-gray-100" aria-label="Menu">
            {/* PERBAIKAN: Mengubah atribut SVG menjadi format camelCase */}
            <svg className="h-6 w-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <button className="rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 px-6 py-2 font-semibold text-white transition-opacity hover:opacity-90">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;