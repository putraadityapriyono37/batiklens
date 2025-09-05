// src/app/api/generate-batik/route.ts
import { NextResponse } from "next/server";
import * as fal from "@fal-ai/serverless-client";
import { fetch } from "undici";

// Polyfill untuk fetch di lingkungan Node.js
if (!global.fetch) {
  global.fetch = fetch as any;
}

fal.config({
  credentials: process.env.FAL_AI_KEY!,
});

// ❌ JANGAN pakai runtime edge kalau butuh Buffer
// export const config = { runtime: "edge" };

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;
    const prompt = formData.get("prompt") as string | null;

    if (!imageFile || !prompt) {
      return NextResponse.json(
        { error: "Gambar dan prompt dibutuhkan" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    console.log("🚀 Memulai panggilan ke fal.ai...");

    const result: any = await fal.run("fal-ai/flux-pro/v1.1-ultra", {
      input: {
        prompt,
        image: [
          {
            name: imageFile.name,
            buffer: imageBuffer,
          },
        ],
      },
    });

    console.log("✅ Panggilan ke fal.ai berhasil:", JSON.stringify(result, null, 2));

    const resultImageUrl = result.images?.[0]?.url;
    if (!resultImageUrl) {
      console.error("❌ Tidak ada URL gambar di response FAL.");
      return NextResponse.json(
        { error: "Tidak ada gambar dihasilkan" },
        { status: 500 }
      );
    }

    // Ambil gambar dari URL hasil
    const imageResponse = await fetch(resultImageUrl);
    const resultArrayBuffer = await imageResponse.arrayBuffer();
    const resultBuffer = Buffer.from(resultArrayBuffer);

    const contentType =
      imageResponse.headers.get("content-type") || "image/png";

    return new Response(resultBuffer, {
      headers: { "Content-Type": contentType },
    });
  } catch (error: any) {
    console.error("❌ Error di API Route:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
