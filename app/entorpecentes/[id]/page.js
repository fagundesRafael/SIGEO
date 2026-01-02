// app/entorpecentes/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EntorpecentesForm from "@/components/EntorpecentesForm";
import Loading from "@/components/Loading";
import NotificationModal from "@/components/NotificationModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function EntorpecenteDetalhes() {
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
    async function fetchRecord() {
      try {
        const res = await fetch(`/api/entorpecentes/${id}`);
        if (res.ok) {
          const data = await res.json();
          data.dataField = data.data ? new Date(data.data).toISOString().split("T")[0] : "";
          setInitialData(data);
          setIsLoadingData(false);
        } else {
          setErrorMsg("Erro ao buscar registro");
          setIsLoadingData(false);
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Erro ao buscar registro");
        setIsLoadingData(false);
      }
    }
    if (id) fetchRecord();
  }, [id]);

  async function handleUpdate(formData) {
    const payload = {
      ...formData,
      updatedBy: session?.user?.nome,
      ...(formData.status !== "apreendido" && { destino: "outros", secao: "", prateleira: "" }),
    };
    try {
      const res = await fetch(`/api/entorpecentes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotificationMessage("Entorpecente atualizado com sucesso!");
        setShowNotification(true);
        setTimeout(() => router.push("/entorpecentes"), 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao atualizar registro");
      }
    } catch (error) {
      console.error("Erro ao atualizar registro:", error);
      setErrorMsg("Erro ao atualizar registro");
    }
  }

  async function handleDelete() {
    setShowDeleteModal(true);
  }

  async function handleConfirmDelete() {
    try {
      const res = await fetch(`/api/entorpecentes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/entorpecentes");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao excluir registro");
      }
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
      setErrorMsg("Erro ao excluir registro");
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
      <EntorpecentesForm
        initialData={initialData}
        onSubmit={handleUpdate}
        isUpdating={true}
        title="Detalhes e Atualização do Entorpecente:"
      />
      <div className="flex justify-between p-4">
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-red-600 transform transition"
        >
          Excluir Entorpecente
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
          message="Deseja realmente excluir este registro permanentemente?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
