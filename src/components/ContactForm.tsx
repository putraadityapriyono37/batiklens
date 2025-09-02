// src/components/ContactForm.tsx
import React from 'react';

const ContactForm = () => {
  return (
    <section 
      id="kontak" 
      className="relative py-20 bg-orange-500 overflow-hidden"
    >
      {/* Background Pattern yang konsisten */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5" 
        style={{ backgroundImage: "url('/background_batik.png')" }}
      ></div>

      {/* Kontainer Utama */}
      <div className="relative container mx-auto px-6 max-w-4xl">
        
        {/* Judul */}
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
            Ragam batik Nusantara
          </h2>
          {/* Anda bisa mengganti judul di atas menjadi "Hubungi Kami" jika dirasa lebih sesuai */}
        </div>

        {/* Form */}
        <form action="#" method="POST">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Input Nama */}
            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-orange-100 mb-2">
                Nama
              </label>
              <input 
                type="text" 
                name="nama" 
                id="nama" 
                placeholder="Nama kamu"
                className="w-full p-3 bg-white/95 text-gray-800 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
              />
            </div>

            {/* Input Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-orange-100 mb-2">
                Email
              </label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Email@gmail.com"
                className="w-full p-3 bg-white/95 text-gray-800 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Input Pesan */}
            <div className="md:col-span-2">
              <label htmlFor="pesan" className="block text-sm font-medium text-orange-100 mb-2">
                Pesan
              </label>
              <textarea 
                name="pesan" 
                id="pesan" 
                rows={6}
                placeholder="Pesan kamu"
                className="w-full p-3 bg-white/95 text-gray-800 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
              ></textarea>
            </div>

          </div>

          {/* Tombol Kirim */}
          <div className="mt-8 text-right">
            <button 
              type="submit"
              className="bg-white text-orange-600 font-bold px-10 py-3 rounded-lg hover:bg-orange-100 transition-colors duration-300"
            >
              KIRIM
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default ContactForm;