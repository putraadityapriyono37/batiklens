// src/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm w-full">
      <div className="container mx-auto px-6">
        <div className="py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="BatikLens Logo"
              width={32}
              height={32}
            />
            <span className="font-serif text-2xl font-bold text-gray-800">
              BatikLens
            </span>
          </Link>

          <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-orange-600 transition-colors"
              >
                Home
              </Link>
            </li>

            <li
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <span className="flex items-center gap-2 hover:text-orange-600 transition-colors cursor-pointer">
                Fitur
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-xl transition-all duration-300 ${
                  isDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="p-2">
                  <Link
                    href="/KenalBatik"
                    className="block w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-orange-50"
                  >
                    Kenal Batik
                  </Link>
                  <Link
                    href="/BatikPedia"
                    className="block w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-orange-50"
                  >
                    Batik Pedia
                  </Link>
                  <Link
                    href="/StudioKreasi"
                    className="block w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-orange-50"
                  >
                    Studio Kreasi
                  </Link>
                  <Link
                    href="/BatikFit"
                    className="block w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-orange-50"
                  >
                    Batik Fit
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/#gallery"
                className="hover:text-orange-600 transition-colors"
              >
                Galeri
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:block">
                  Halo,{" "}
                  {user.user_metadata?.full_name ||
                    user.email?.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <span className="px-5 py-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold rounded-full hover:opacity-90 transition-opacity">
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
