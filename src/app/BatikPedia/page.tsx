// src/app/BatikPedia/page.tsx
import { supabase } from "@/lib/supabaseClient";
import BatikPedia from "@/components/BatikPedia"; // Impor komponen
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 0;

export default async function BatikPediaPage() {
  // 1. Ambil data di sisi server
  const { data: motifs, error } = await supabase
    .from("motifs")
    .select("id, name, origin, image_url")
    .order("name", { ascending: true });

  if (error) {
    return <p>Gagal memuat data...</p>;
  }

  // 2. Tampilkan komponen dan kirim data sebagai props
  return (
    <main className="bg-white">
      <Navbar />
      <BatikPedia motifs={motifs || []} />
      <Footer />
    </main>
  );
}