// src/app/api/generate-batik/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Untuk saat ini kita terima FormData karena frontend akan mengirim gambar
    const formData = await request.formData();
    const image = formData.get('image') as Blob; // Gambar awal (misal: Motif A)
    const prompt = formData.get('prompt') as string; // Perintah teks (misal: "ubah dengan gaya Megamendung")

    if (!image || !prompt) {
      return NextResponse.json({ error: 'Gambar dan prompt dibutuhkan' }, { status: 400 });
    }

    // Panggil API Hugging Face / fal.ai dari sisi server
    const response = await fetch(
      "https://router.huggingface.co/fal-ai/fal-ai/flux-kontext/dev?_subdomain=queue", // URL Endpoint FLUX.1
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`, // Menggunakan token rahasia
          "Content-Type": image.type,
        },
        method: "POST",
        body: image, // Kirim gambar sebagai body request
        // Catatan: Model FLUX.1 mungkin butuh input berbeda. Ini adalah contoh umum.
        // Anda mungkin perlu menyesuaikan cara mengirim prompt, cek dokumentasi API-nya.
      }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Hugging Face API Error:", errorText);
        return NextResponse.json({ error: `Hugging Face API error: ${errorText}` }, { status: response.status });
    }

    const resultImage = await response.blob();

    // Kirim gambar hasil kembali ke frontend
    return new Response(resultImage, {
        headers: { 'Content-Type': resultImage.type }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}