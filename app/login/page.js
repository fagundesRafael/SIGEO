// app/login/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (result?.error) {
      setLoading(false);
      setErrorMsg("Email ou senha inválidos.");
    } else {
      setLoading(false);
      router.push(result.url || "/system");
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
          Faça Login na sua conta:
        </h1>
        <img
          className="mx-auto w-24 animate-glow"
          src="/sigeo_full-logo.png"
          alt="full-logo"
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
        <button
          type="submit"
          className=" bg-c_common_red text-white p-2 rounded-2xl mt-4 hover:bg-red-600 transition-all "
        >
          Entrar
        </button>
        <p className="flex flex-col items-center mt-4 text-white">
          Não tem uma conta?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Cadastre-se aqui!
          </Link>
          <img className="w-6" src="/sigeo_padlock.png" alt="padlock" />
        </p>
      </form>
    </div>
  );
}
