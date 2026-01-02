// app/eletroeletronicos/registrar/page.js
"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import EletroEletronicosForm from "@/components/EletroEletronicosForm";
import NotificationModal from "@/components/NotificationModal";

export default function RegistrarEletroEletronico() {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  async function handleSubmit(formData) {
    const payload = {
      ...formData,
      classe: "eletroeletronico",
      createdBy: session?.user?.nome,
      updatedBy: "",
      destino: formData.status === "apreendido" ? formData.destino : "outros",
    };

    try {
      const res = await fetch("/api/eletroeletronicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotificationMessage("Eletroeletrônico criado com sucesso!");
        setShowNotification(true);
        setTimeout(() => router.push("/eletroeletronicos"), 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao criar eletroeletrônico");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setErrorMsg("Erro ao enviar formulário");
    }
  }

  return (
    <>
      <EletroEletronicosForm onSubmit={handleSubmit} title="Registrar Novo Eletroeletrônico:" />
      {errorMsg && <p className="text-red-500 ml-4 mb-4">{errorMsg}</p>}
      {showNotification && (
        <NotificationModal message={notificationMessage} onClose={() => setShowNotification(false)} />
      )}
    </>
  );
}
