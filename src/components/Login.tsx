// src/components/Login.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Impor useRouter
import { supabase } from '@/lib/supabaseClient';

// --- Komponen-komponen UI (tidak perlu diubah) ---
const EyeIcon = ({ onClick }: { onClick: () => void }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" onClick={onClick}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
);
const EyeSlashIcon = ({ onClick }: { onClick: () => void }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" onClick={onClick}><path strokeLinecap="round" strokeLinejoin="round" d="M3.981 12C5.418 17.781 9.907 21.75 15 21.75c.485 0 .963-.042 1.432-.122M20.982 12A10.5 10.5 0 0 0 12 4.5C9.027 4.5 6.32 5.624 4.314 7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="m15 15 2.25 2.25M15 15 12 12V9.75M15 15l-3 3m0 0 3 3m-3-3L9 9.75M15 15l3-3m-3 3L12 12" /></svg>
);


export default function LoginPage() {
    const router = useRouter(); // Inisialisasi router
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        setLoading(true);
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/` },
        });
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/'); // Arahkan ke homepage
            router.refresh(); // Refresh halaman untuk memastikan Navbar update
        }
        
        setLoading(false);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500">
             <div className="absolute inset-0 bg-repeat opacity-40" style={{ backgroundImage: "url('/background_batik.png')" }}></div>
            <div className="relative z-10 hidden lg:block w-1/2 p-12 text-white">
                <Link href="/" className="flex items-center space-x-4 mb-8">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <Image src="/logo.svg" alt="BatikLens Logo" width={40} height={40} />
                    </div>
                    <span className="font-serif text-5xl">BatikLens</span>
                </Link>
                <p className="text-lg leading-relaxed max-w-md mt-4">
                    Temukan kekayaan budaya di setiap helai kain. Teknologi AI kami membantu Anda mengenali, memahami, dan bahkan menciptakan motif batik baru.
                </p>
            </div>
            <div className="relative z-10 w-full lg:w-1/2 min-h-screen lg:min-h-0 bg-white lg:rounded-l-[4rem] flex items-center justify-center p-8 sm:p-12 lg:p-16 shadow-2xl">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-serif text-center text-gray-800 mb-2">Selamat Datang Kembali</h2>
                    <h3 className="text-3xl font-serif text-center text-orange-500 mb-8">BatikLens</h3>
                    
                    {error && <div className="mb-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="flex justify-between items-center space-x-4 mb-6">
                            <button type="button" onClick={handleGoogleLogin} disabled={loading} className="flex-grow flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50">
                                <Image src="/google-logo.svg" alt="Google" width={20} height={20} className="mr-2"/>
                                Continue with Google
                            </button>
                        </div>

                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-4 text-gray-500">Or</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <div className="mb-4">
                            <input type="email" id="email" name="email" placeholder="Email" className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4 relative">
                            <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password" className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-colors pr-12" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <span className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                {showPassword ? (<EyeSlashIcon onClick={() => setShowPassword(!showPassword)} />) : (<EyeIcon onClick={() => setShowPassword(!showPassword)} />)}
                            </span>
                        </div>
                        <div className="text-right mb-6">
                            <Link href="/forgot-password" className="text-sm text-orange-500 hover:underline">Lupa Password?</Link>
                        </div>
                        <button type="submit" disabled={loading} className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg disabled:opacity-50">
                            {loading ? "Memproses..." : "Masuk"}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-gray-600">
                        Belum punya akun? <Link href="/register" className="text-orange-500 font-semibold hover:underline">Daftar di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}