// src/components/Register.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

// --- Komponen Ikon (Style Disesuaikan untuk tema gelap) ---
const EyeIcon = ({ onClick }: { onClick: () => void }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" onClick={onClick}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
);
const EyeSlashIcon = ({ onClick }: { onClick: () => void }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" onClick={onClick}><path strokeLinecap="round" strokeLinejoin="round" d="M3.981 12C5.418 17.781 9.907 21.75 15 21.75c.485 0 .963-.042 1.432-.122M20.982 12A10.5 10.5 0 0 0 12 4.5C9.027 4.5 6.32 5.624 4.314 7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="m15 15 2.25 2.25M15 15 12 12V9.75M15 15l-3 3m0 0 3 3m-3-3L9 9.75M15 15l3-3m-3 3L12 12" /></svg>
);

export default function RegisterPage() {
    // ==========================================================
    // SEMUA LOGIKA PENDAFTARAN DI BAWAH INI TIDAK DIUBAH SAMA SEKALI
    // ==========================================================
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
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
        setMessage('');
        if (password !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name },
                emailRedirectTo: `${window.location.origin}/login`
            },
        });
        if (error) {
            setError(error.message);
        } else {
            setMessage("Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.");
        }
        setLoading(false);
    };
    // ==========================================================
    // AKHIR DARI BAGIAN LOGIKA PENDAFTARAN
    // ==========================================================

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900">
            {/* Sisi Kiri (Info & Logo) */}
            <div className="relative z-10 hidden lg:flex w-1/2 p-12 items-center justify-center">
                <div className="w-full max-w-md">
                    <Link href="/">
                        <Image 
                            src="/images/logo/logo_brown_batiklens.svg" 
                            alt="BatikLens Logo" 
                            width={400} 
                            height={200} 
                            className="object-contain"
                        />
                    </Link>
                </div>
            </div>

            {/* Sisi Kanan (Form Register) */}
            <div className="relative z-10 w-full lg:w-1/2 min-h-screen lg:min-h-0 bg-white dark:bg-gray-800 lg:rounded-l-[4rem] flex items-center justify-center p-8 sm:p-12 lg:p-16 shadow-2xl">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-serif text-center text-black dark:text-white mb-2">Buat Akun Baru</h2>
                    <h3 className="text-3xl font-serif text-center text-[#D7AA83] mb-8">BatikLens</h3>

                    {message && <div className="mb-4 text-center text-green-600 bg-green-500/10 p-3 rounded-lg border border-green-500/20">{message}</div>}
                    {error && <div className="mb-4 text-center text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-6">
                            <button type="button" onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm disabled:opacity-50">
                                <Image src="/google-logo.svg" alt="Google" width={20} height={20} className="mr-3"/>
                                Continue with Google
                            </button>
                        </div>

                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                            <span className="px-4 text-gray-500 dark:text-gray-400">Or</span>
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                        </div>

                        <div className="mb-4">
                            <input type="text" placeholder="Nama kamu" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D7AA83] focus:border-transparent transition-colors" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <input type="email" placeholder="Email" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D7AA83] focus:border-transparent transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4 relative">
                            <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D7AA83] focus:border-transparent transition-colors pr-12" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <span className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                {showPassword ? <EyeSlashIcon onClick={() => setShowPassword(!showPassword)} /> : <EyeIcon onClick={() => setShowPassword(!showPassword)} />}
                            </span>
                        </div>
                        <div className="mb-6 relative">
                            <input type={showConfirmPassword ? "text" : "password"} placeholder="Konfirmasi Password" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D7AA83] focus:border-transparent transition-colors pr-12" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            <span className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                {showConfirmPassword ? <EyeSlashIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <EyeIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
                            </span>
                        </div>
                        <button type="submit" disabled={loading} className="w-full py-4 bg-[#D7AA83] text-stone-800 font-bold rounded-xl hover:bg-[#c99c75] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? "Mendaftar..." : "Buat Akun"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
                        Sudah punya akun? <Link href="/login" className="text-[#D7AA83] font-semibold hover:underline">Masuk di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}