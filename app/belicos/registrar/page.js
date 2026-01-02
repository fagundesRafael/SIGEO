// app/belicos/registrar/page.js
"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BelicoForm from "@/components/BelicoForm";
import NotificationModal from "@/components/NotificationModal";

export default function RegistrarArmaMunicao() {
  const router = useRouter();
  const { data: session } = useSession();
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      classe: "belico",
      createdBy: session?.user?.nome,
      ...(formData.tipo === "Arma" && { aspecto: "Outro" }),
    };

    try {
      const res = await fetch("/api/belicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotificationMessage("Registro criado com sucesso!");
        setShowNotification(true);
        setTimeout(() => {
          router.push("/belicos");
        }, 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao criar registro");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setErrorMsg("Erro ao enviar formulário");
    }
  };

  return (
    <>
      <BelicoForm onSubmit={onSubmit} title="Inserir Novo material bélico:" />
      {errorMsg && <p className="text-red-500 ml-4 mb-4">{errorMsg}</p>}
      {showNotification && (
        <NotificationModal
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
}
