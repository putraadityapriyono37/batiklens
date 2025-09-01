// src/components/ContactForm.tsx
import React from 'react';

const ContactForm = () => {
  return (
    <section id="kontak" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Hubungi Kami</h2>
        <form className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input type="text" placeholder="Nama Anda" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input type="email" placeholder="Email Anda" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="mb-6">
            <textarea placeholder="Pesan Anda" rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
          </div>
          <div className="text-right">
            <button type="submit" className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-600">
              KIRIM
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;