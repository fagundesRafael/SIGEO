// app/eletroeletronicos/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EletroEletronicosForm from "@/components/EletroEletronicosForm";
import Loading from "@/components/Loading";
import NotificationModal from "@/components/NotificationModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function EletroEletronicoDetalhes() {
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
        const res = await fetch(`/api/eletroeletronicos/${id}`);
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
      ...(formData.status !== "apreendido" && { destino: "outros", prateleira: "", secao: "" }),
    };
    try {
      const res = await fetch(`/api/eletroeletronicos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotificationMessage("Eletroeletrônico atualizado com sucesso!");
        setShowNotification(true);
        setTimeout(() => router.push("/eletroeletronicos"), 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao atualizar eletroeletrônico");
      }
    } catch (error) {
      console.error("Erro ao atualizar eletroeletrônico:", error);
      setErrorMsg("Erro ao atualizar eletroeletrônico");
    }
  }

  async function handleDelete() {
    setShowDeleteModal(true);
  }

  async function handleConfirmDelete() {
    try {
      const res = await fetch(`/api/eletroeletronicos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/eletroeletronicos");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao excluir eletroeletrônico");
      }
    } catch (error) {
      console.error("Erro ao excluir eletroeletrônico:", error);
      setErrorMsg("Erro ao excluir eletroeletrônico");
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
      <EletroEletronicosForm
        initialData={initialData}
        onSubmit={handleUpdate}
        isUpdating={true}
        title="Detalhes e Atualização do Eletroeletrônico:"
      />
      <div className="flex justify-between p-4">
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-red-600 transform transition"
        >
          Excluir Eletroeletrônico
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
          message="Deseja realmente excluir este eletroeletrônico permanentemente?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
