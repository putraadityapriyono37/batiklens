// src/components/ContactForm.tsx
"use client";

import React, { useState } from "react";

// Ganti dengan Access Key dari Web3Forms
const YOUR_ACCESS_KEY = "6d4ca2c7-9160-4335-947e-c329bb9178e9";

// Tipe untuk status form
type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const data = new FormData(e.currentTarget);
    data.append("access_key", YOUR_ACCESS_KEY);
    data.append("subject", "Pesan Baru dari Pengunjung BatikLens");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus("success");
        setFormData({ nama: "", email: "", pesan: "" }); // reset
      } else {
        console.error("Gagal mengirim form:", result);
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Error saat submit form:", error);
      setFormStatus("error");
    }
  };

  return (
    <section
      id="kontak"
      className="relative py-20 lg:py-24 bg-orange-500 overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-5"
        style={{ backgroundImage: "url('/background_batik.png')" }}
      ></div>

      {/* Kontainer Utama */}
      <div className="relative container mx-auto px-6 max-w-4xl">
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
            Hubungi Kami
          </h2>
          <p className="mt-4 text-orange-100 max-w-xl">
            Punya pertanyaan, saran, atau ingin berkolaborasi? Kami senang
            mendengar dari Anda.
          </p>
        </div>

        {/* Card Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          {formStatus === "success" ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-serif text-green-700 font-bold">
                Terima Kasih!
              </h3>
              <p className="mt-2 text-gray-600">
                Pesan Anda telah berhasil terkirim.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label
                    htmlFor="nama"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Nama kamu"
                    className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email@gmail.com"
                    className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="pesan"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Pesan
                  </label>
                  <textarea
                    name="pesan"
                    id="pesan"
                    rows={6}
                    placeholder="Pesan kamu"
                    className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.pesan}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              {formStatus === "error" && (
                <p className="mt-4 text-sm text-red-600">
                  Gagal mengirim pesan. Silakan coba lagi.
                </p>
              )}

              <div className="mt-8 text-right">
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="bg-orange-500 text-white font-bold px-10 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait"
                >
                  {formStatus === "sending" ? "Mengirim..." : "KIRIM"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
