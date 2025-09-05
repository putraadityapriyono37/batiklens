// src/app/api/generate-batik/route.ts
import { NextResponse } from 'next/server';
import * as fal from '@fal-ai/serverless-client';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { fetch } from 'undici';

if (!global.fetch) {
  global.fetch = fetch as any;
}

fal.config({
  credentials: process.env.FAL_AI_KEY!,
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const config = {
  runtime: 'edge',
};

// --- PERBAIKAN DI SINI ---
// 1. Definisikan tipe untuk memberitahu TypeScript bentuk respons terjemahan
type TranslationResponse = {
    responseData?: {
      translatedText?: string;
    };
};

async function translateToEnglish(text: string): Promise<string> {
    if (!text.trim()) {
        return "";
    }
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|en`;
    try {
        const response = await fetch(url);
        // 2. Gunakan 'as' (type assertion) untuk memberitahu TypeScript bentuk datanya
        const data = await response.json() as TranslationResponse;
        
        // Sekarang TypeScript tidak akan error lagi
        if (data.responseData && data.responseData.translatedText) {
            console.log(`Menerjemahkan: "${text}" -> "${data.responseData.translatedText}"`);
            return data.responseData.translatedText;
        }
        return text;
    } catch (error) {
        console.error("Gagal menerjemahkan:", error);
        return text;
    }
}
// --- AKHIR DARI PERBAIKAN ---

export async function POST(request: Request) {
  try {
    const { image: imageBase64, prompt: originalPrompt } = await request.json(); 

    if (!imageBase64 || !originalPrompt) {
      return NextResponse.json({ error: 'Gambar dan prompt dibutuhkan' }, { status: 400 });
    }

    const englishPrompt = await translateToEnglish(originalPrompt);
    
    // ... sisa kode Anda tetap sama persis ...
    const imageBuffer = Buffer.from(
        imageBase64.replace(/^data:image\/\w+;base64,/, ""),
        'base64'
    );
    const fileExtension = imageBase64.substring(imageBase64.indexOf('/') + 1, imageBase64.indexOf(';'));
    const fileName = `${uuidv4()}.${fileExtension}`;
    const bucketName = 'temp-batik-uploads';

    const { error: uploadError } = await supabaseAdmin.storage
        .from(bucketName)
        .upload(fileName, imageBuffer, { contentType: `image/${fileExtension}` });

    if (uploadError) throw new Error(`Supabase upload error: ${uploadError.message}`);

    const { data: publicUrlData } = supabaseAdmin.storage
        .from(bucketName)
        .getPublicUrl(fileName);
    
    const publicUrl = publicUrlData.publicUrl;
    if (!publicUrl) throw new Error('Gagal mendapatkan URL publik dari Supabase.');

    console.log("Memulai panggilan ke fal.ai dengan prompt (EN):", englishPrompt);
    const result: any = await fal.run('fal-ai/flux-kontext/dev', {
        input: {
            prompt: englishPrompt,
            image_url: publicUrl,
        },
    });
    console.log("Panggilan ke fal.ai berhasil.");

    await supabaseAdmin.storage.from(bucketName).remove([fileName]);
    
    if (!result.images || !Array.isArray(result.images) || result.images.length === 0) {
      console.error("Struktur respons Fal AI tidak terduga:", JSON.stringify(result, null, 2));
      throw new Error("Respons dari AI tidak mengandung gambar hasil.");
    }

    const resultImageUrl = result.images[0].url;
    
    const imageResponse = await fetch(resultImageUrl);
    const resultArrayBuffer = await imageResponse.arrayBuffer();
    const resultBuffer = Buffer.from(resultArrayBuffer);
    const contentType = imageResponse.headers.get('content-type') || 'image/png';
    
    return new Response(resultBuffer, {
      headers: { 'Content-Type': contentType },
    });

  } catch (error: any) {
    console.error("Error di API Route:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}