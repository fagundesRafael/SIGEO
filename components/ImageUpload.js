// components/ImageUpload.js
"use client";

import { useState } from "react";

export default function ImageUpload({ onUpload, setLoading }) {
  const [preview, setPreview] = useState(null);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Limpar a pré-visualização anterior
    setPreview(null);

    // Gerar prévia da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Inicia o loading (exibirá o LoadingImage)
    setLoading(true);

    // Converter o arquivo para base64
    const base64 = await fileToBase64(file);
    // Remover o prefixo (ex: "data:image/png;base64,")
    const base64String = base64.split(",")[1];

    // Realiza o upload via API
    const res = await fetch("/api/upload-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file: base64String,
        fileName: file.name,
        folder: "sigeo",
      }),
    });
    // Encerra o loading
    setLoading(false);

    if (res.ok) {
      const data = await res.json();
      onUpload(data.url);
    } else {
      console.error("Upload failed");
    }
  }

  return (
    <div>
      <label className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition-colors">
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="hidden"
  />
  Escolher imagem
</label>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-96 object-cover mt-2"
        />
      )}
    </div>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}