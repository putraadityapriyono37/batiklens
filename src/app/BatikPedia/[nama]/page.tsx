// src/app/BatikPedia/[nama]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import BatikDetail from "@/components/BatikDetail";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 0;

type PageProps = { params: { nama: string } }

export default async function Page({ params }: PageProps) {
    const motifName = decodeURIComponent(params.nama);

    const { data: motif } = await supabase
        .from("motifs")
        .select("*")
        .eq("name", motifName)
        .single();

    if (!motif) {
        notFound();
    }

    return (
        <main className="bg-white">
            <Navbar />
            <BatikDetail motif={motif} />
            <Footer />
        </main>
    );
}