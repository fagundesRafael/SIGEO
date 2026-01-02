//app/api/upload-image/route.js
import imagekit from "@/lib/imagekit";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { file, fileName, folder } = data;
    // 'file' deve ser uma string base64 (sem o prefixo data:...;base64,)
    const result = await imagekit.upload({
      file, // base64 string
      fileName: fileName,
      folder: folder || "default-folder",
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
