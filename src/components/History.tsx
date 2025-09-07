"use client";
import { motion } from "framer-motion";

const History = () => {
  return (
    // 1. Ubah background di sini
    <section 
      className="md:pt-10 pt-20 pb-10 bg-gray-900" 
      id="timeline"
    >
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 2. Ubah warna teks kecil */}
            <p className="text-stone-700 sm:text-2xl text-lg mb-6">
              Proses Kreatif Anda
            </p>
          </motion.div>

          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* 3. Ubah warna teks besar */}
            <h2 className="text-black sm:text-4xl text-3xl font-medium lg:w-3/4 mx-auto">
              Dari inspirasi hingga karya nyata, kami memandu Anda melalui setiap langkah untuk mengenali dan menciptakan motif batik yang unik.
            </h2>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default History;