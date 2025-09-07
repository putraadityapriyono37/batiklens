// src/components/ForgotPassword.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Link untuk mengatur ulang password telah dikirim ke email Anda.');
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
                    Jangan khawatir, kami akan bantu Anda mendapatkan kembali akses ke akun Anda.
                </p>
            </div>
            <div className="relative z-10 w-full lg:w-1/2 min-h-screen lg:min-h-0 bg-white lg:rounded-l-[4rem] flex items-center justify-center p-8 sm:p-12 lg:p-16 shadow-2xl">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-serif text-center text-gray-800 mb-2">Lupa Password</h2>
                    <p className="text-center text-gray-500 mb-8">Masukkan email Anda untuk menerima link reset.</p>
                    
                    {message && <div className="mb-4 text-center text-green-600 bg-green-100 p-3 rounded-lg">{message}</div>}
                    {error && <div className="mb-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}

                    {!message && (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg disabled:opacity-50"
                            >
                                {loading ? "Mengirim..." : "Kirim Link Reset"}
                            </button>
                        </form>
                    )}

                    <p className="mt-6 text-center text-gray-600">
                        Ingat password Anda? <Link href="/login" className="text-orange-500 font-semibold hover:underline">Kembali ke Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}