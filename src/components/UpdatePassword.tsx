// src/components/UpdatePassword.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function UpdatePassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --- PANTAU MODE PASSWORD RECOVERY ---
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          console.log("Mode pemulihan password aktif.");
        }
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);
  // --- AKHIR BLOK ---

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password baru dan konfirmasi password tidak cocok.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        "Password berhasil diperbarui! Anda akan diarahkan ke halaman login."
      );
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900">
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
      <div className="relative z-10 w-full lg:w-1/2 min-h-screen lg:min-h-0 bg-white dark:bg-gray-800 lg:rounded-l-[4rem] flex items-center justify-center p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-serif text-center text-black dark:text-white mb-2">
            Atur Password Baru
          </h2>
          <h3 className="text-3xl font-serif text-center text-[#D7AA83] mb-8">
            BatikLens
          </h3>
          {message && (
            <div className="mb-4 text-center text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 text-center text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password Baru"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D7AA83] focus:border-transparent transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Konfirmasi Password Baru"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D7AA83] focus:border-transparent transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#D7AA83] text-stone-800 font-bold rounded-xl hover:bg-[#c99c75] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan Password Baru"}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
            Kembali ke{" "}
            <Link
              href="/login"
              className="text-[#D7AA83] font-semibold hover:underline"
            >
              halaman login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
