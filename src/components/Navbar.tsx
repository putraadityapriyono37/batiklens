// src/components/Navbar.tsx
"use client"; // Pastikan ini ada di baris paling atas

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  // State untuk mengontrol visibilitas dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm w-full">
      {/* Menggunakan div luar agar container bisa diatur di layout.tsx */}
      <div className="py-3 flex justify-between items-center">
        <Link href="/" className="text-gray-800 font-bold text-xl">
          KenalBatik
        </Link>
        
        <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
          
          {/* === BAGIAN DROPDOWN DIMULAI DARI SINI === */}
          <li 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-2 hover:text-orange-600 transition-colors focus:outline-none">
              Fitur
              {/* Ikon panah ke bawah */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Menu Dropdown */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-xl transition-opacity duration-300
                         ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <div className="p-2">
                <Link href="/KenalBatik" className="block px-4 py-2 text-gray-700 rounded-md hover:bg-orange-50">
                  Kenal Batik
                </Link>
                <Link href="/BatikFit" className="block px-4 py-2 text-gray-700 rounded-md hover:bg-orange-50">
                  Batik Fit In
                </Link>
                <Link href="/StudioKreasi" className="block px-4 py-2 text-gray-700 rounded-md hover:bg-orange-50">
                  Studio Kreasi
                </Link>
                <Link href="/BatikPedia" className="block px-4 py-2 text-gray-700 rounded-md hover:bg-orange-50">
                  Batik Pedia
                </Link>
              </div>
            </div>
          </li>
          {/* === BAGIAN DROPDOWN SELESAI === */}

          <li><Link href="#eksplore" className="hover:text-orange-600 transition-colors">Eksplore</Link></li>
          <li><Link href="#galeri" className="hover:text-orange-600 transition-colors">Galeri</Link></li>
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
      </div>
    </header>
  );
};

export default Navbar;

