//components/ClientWrapper.js
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Loading from "./Loading";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const publicPaths = ["/", "/login", "/signup"];
  const isPublic = publicPaths.includes(pathname);

  const [loading, setLoading] = useState(true);
  const [sessionExists, setSessionExists] = useState(false);

  useEffect(() => {
    if (isPublic) {
      setLoading(false);
      return;
    }

    async function checkSession() {
      setLoading(true);
      const session = await getSession();
      console.log("Sessão recebida:", session);

      if (!session || !session.user) {
        router.push("/login");
      } else {
        setSessionExists(true);
      }

      setLoading(false);
    }

    checkSession();
  }, [isPublic, router]);

  if (loading) {
    return (
      // <div className="min-h-screen flex items-center justify-center">
      //   Carregando...
      // </div>
      <Loading/>
    );
  }

  return (
    <>
      {!isPublic && <Header />}
      <div className="flex h-screen">
        {!isPublic && <Sidebar className="w-1/6" />}
        <main className="flex-grow w-5/6 overflow-y-auto">{children}</main>
      </div>
      {!isPublic && <Footer />}
    </>
  );
}
