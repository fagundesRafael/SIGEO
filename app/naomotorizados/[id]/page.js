// app/naomotorizados/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NaoMotorizadosForm from "@/components/NaoMotorizadosForm";
import Loading from "@/components/Loading";
import NotificationModal from "@/components/NotificationModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function NaoMotorizadoDetalhes() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [initialData, setInitialData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function fetchNaoMotorizado() {
      try {
        const res = await fetch(`/api/naomotorizados/${id}`);
        if (res.ok) {
          const data = await res.json();
          data.dataField = data.data ? new Date(data.data).toISOString().split("T")[0] : "";
          setInitialData(data);
          setIsLoadingData(false);
        } else {
          setErrorMsg("Erro ao buscar veículo não motorizado");
          setIsLoadingData(false);
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Erro ao buscar veículo não motorizado");
        setIsLoadingData(false);
      }
    }
    if (id) fetchNaoMotorizado();
  }, [id]);

  async function handleUpdate(formData) {
    const payload = {
      ...formData,
      updatedBy: session?.user?.nome,
    };
    try {
      const res = await fetch(`/api/naomotorizados/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotificationMessage("Veículo não motorizado atualizado com sucesso!");
        setShowNotification(true);
        setTimeout(() => router.push("/naomotorizados"), 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao atualizar veículo não motorizado");
      }
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      setErrorMsg("Erro ao atualizar veículo");
    }
  }

  async function handleDelete() {
    setShowDeleteModal(true);
  }

  async function handleConfirmDelete() {
    try {
      const res = await fetch(`/api/naomotorizados/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/naomotorizados");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao excluir veículo não motorizado");
      }
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      setErrorMsg("Erro ao excluir veículo");
    } finally {
      setShowDeleteModal(false);
    }
  }

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  if (isLoadingData) return <Loading />;
  if (errorMsg) return <p className="p-4 text-red-500">{errorMsg}</p>;

  return (
    <div>
      <NaoMotorizadosForm
        initialData={initialData}
        onSubmit={handleUpdate}
        isUpdating={true}
        title="Detalhes e Atualização do Veículo Não Motorizado:"
      />
      <div className="flex justify-between p-4">
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-red-600 transform transition"
        >
          Excluir Veículo
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-gray-600 transition-colors"
        >
          Cancelar e Voltar
        </button>
      </div>
      {showNotification && (
        <NotificationModal message={notificationMessage} onClose={closeNotification} />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          message="Deseja realmente excluir este veículo não motorizado permanentemente?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
