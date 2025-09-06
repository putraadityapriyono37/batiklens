// src/app/BatikFit/page.tsx
"use client"; // Wajib karena kita menggunakan hooks

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import BatikFit from '@/components/BatikFit';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BatikFitPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                // Jika tidak ada user yang login, arahkan ke halaman login
                router.push('/login');
            } else {
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        };

        checkUser();
    }, [router]);

    // Tampilkan layar loading saat sedang memeriksa status login
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <p className="text-lg font-semibold text-gray-700">Memeriksa Sesi Anda...</p>
            </div>
        );
    }

    // Hanya tampilkan halaman jika user sudah terautentikasi
    if (isAuthenticated) {
        return (
            <main className="bg-white">
                <Navbar />
                <BatikFit />
                <Footer />
            </main>
        );
    }

    // Tampilkan null atau fallback component jika redirect belum terjadi
    return null;
}