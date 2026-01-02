// app/signup/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { gerarPDFTermos } from "@/components/TermosUso";

export default function SignupPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const pdf = gerarPDFTermos();
      pdf.save('termos-uso-sigeo.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Por favor, tente novamente.');
    } finally {
      setDownloading(false);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    setErrorMsg("");
    if (password.length < 6) {
      setLoading(false);
      setErrorMsg("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (checked === false) {
      setLoading(false);
      setErrorMsg(
        "Você deve aceitar os termos de uso e política de privacidade."
      );
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, password }),
    });

    if (res.ok) {
      setLoading(false);
      alert(
        "Usuário criado com sucesso! Redirecionando para a página de login."
      );
      router.push("/login");
    } else {
      setLoading(false);
      const data = await res.json();
      setErrorMsg(data.error || "Erro ao criar usuário.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {loading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="w-[35%] flex flex-col bg-c_deep_gray_black border p-6 rounded-xl border-gray-500 shadow"
      >
        <h1 className="text-2xl text-white font-mono mx-auto mb-2">
          Crie sua conta:
        </h1>
        <img
          className="mx-auto w-24 animate-glow"
          src="/sigeo_full-logo.png"
          alt="full-logo"
        />
        <label className="text-white">Nome:</label>
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border text-white mb-4 border-gray-500 p-2 rounded bg-c_deep_gray_black"
          required
        />
        <label className="text-white">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border text-white mb-4 border-gray-500 p-2 rounded bg-c_deep_gray_black"
          required
        />
        <label className="text-white">Senha:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border text-white mb-4 border-gray-500 p-2 rounded bg-c_deep_gray_black"
          required
        />
        {errorMsg && <p className="text-red-500 mx-auto text-sm">{errorMsg}</p>}
        
        {/* Link para download dos termos */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="text-blue-500 hover:underline text-xs mb-2 text-center"
        >
          {downloading ? 'Baixando...' : 'Clique aqui para ler os termos de uso e política de privacidade'}
        </button>
        
        <div className="flex mx-auto gap-1 text-white text-xs items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="border border-gray-500 rounded"
          />
          <p>Eu li e aceito os termos de uso e política de privacidade</p>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-2xl mt-4 hover:bg-green-600 transition"
        >
          Criar Conta
        </button>
        <p className="mt-4 mx-auto flex flex-col text-slate-300 ">
          Já possui conta?{" "}
          <Link href="/login" className="text-blue-500 hover:underline mx-auto">
            Faça o Login
          </Link>
          <img className="w-6 mx-auto" src="/sigeo_padlock.png" alt="padlock" />
        </p>
      </form>
    </div>
  );
}
