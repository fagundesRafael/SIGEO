// app/naomotorizados/registrar/page.js
"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import NaoMotorizadosForm from "@/components/NaoMotorizadosForm";
import NotificationModal from "@/components/NotificationModal";

export default function RegistrarNaoMotorizado() {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  async function handleSubmit(formData) {
    const payload = {
      ...formData,
      classe: "nao-motorizado",
      createdBy: session?.user?.nome,
      updatedBy: "",
      destino: formData.status === "apreendido" ? formData.destino : "outros",
    };

    try {
      const res = await fetch("/api/naomotorizados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotificationMessage("Veículo não motorizado criado com sucesso!");
        setShowNotification(true);
        setTimeout(() => router.push("/naomotorizados"), 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao criar veículo não motorizado");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setErrorMsg("Erro ao enviar formulário");
    }
  }

  return (
    <>
      <NaoMotorizadosForm onSubmit={handleSubmit} title="Registrar Novo Veículo Não Motorizado:" />
      {errorMsg && <p className="text-red-500 ml-4 mb-4">{errorMsg}</p>}
      {showNotification && (
        <NotificationModal message={notificationMessage} onClose={() => setShowNotification(false)} />
      )}
    </>
  );
}
