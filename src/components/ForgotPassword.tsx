// src/components/ForgotPassword.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Cek email kamu untuk link reset password 🚀");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900">
      {/* Left Side (Logo / Illustration) */}
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

      {/* Right Side (Form) */}
      <div className="relative z-10 w-full lg:w-1/2 min-h-screen lg:min-h-0 bg-white dark:bg-gray-800 lg:rounded-l-[4rem] flex items-center justify-center p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-serif text-center text-black dark:text-white mb-2">
            Lupa Password
          </h2>
          <h3 className="text-3xl font-serif text-center text-[#D7AA83] mb-8">
            BatikLens
          </h3>

          {/* Alert Error */}
          {error && (
            <div className="mb-4 text-center text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          {/* Alert Success */}
          {message && (
            <div className="mb-4 text-center text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
              {message}
            </div>
          )}

          {!message && (
            <form onSubmit={handleForgotPassword} noValidate>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D7AA83] focus:border-transparent transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#D7AA83] text-stone-800 font-bold rounded-xl hover:bg-[#c99c75] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Mengirim..." : "Kirim Link Reset"}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
            Ingat passwordmu?{" "}
            <Link
              href="/login"
              className="text-[#D7AA83] font-semibold hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
