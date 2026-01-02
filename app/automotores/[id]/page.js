// app/automotores/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AutomotoresForm from "@/components/AutomotoresForm";
import Loading from "@/components/Loading";
import NotificationModal from "@/components/NotificationModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function VeiculoDetalhes() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [initialData, setInitialData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Busca os dados do veículo pelo ID e adapta os dados iniciais
  useEffect(() => {
    async function fetchVehicle() {
      try {
        const res = await fetch(`/api/automotores/${id}`);
        if (res.ok) {
          const data = await res.json();
          // Se existir um valor em customTipo, consideramos o tipo "outrosautomotores"
          if (data.customTipo) {
            data.tipo = "outrosautomotores";
          }
          data.dataField = data.data
            ? new Date(data.data).toISOString().split("T")[0]
            : "";
          setInitialData(data);
          setIsLoadingData(false);
        } else {
          setErrorMsg("Erro ao buscar veículo");
          setIsLoadingData(false);
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Erro ao buscar veículo");
        setIsLoadingData(false);
      }
    }
    if (id) fetchVehicle();
  }, [id]);

  // Função para atualizar o veículo usando o AutomotoresForm
  const handleUpdate = async (formData) => {
    const payload = {
      ...formData,
      updatedBy: session?.user?.nome,
      // Define o destino conforme o status
      destino: formData.status === "apreendido" ? formData.destino : "outros",
    };
    try {
      const res = await fetch(`/api/automotores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotificationMessage("Veículo atualizado com sucesso!");
        setShowNotification(true);
        setTimeout(() => router.push("/automotores"), 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao atualizar veículo");
      }
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      setErrorMsg("Erro ao atualizar veículo");
    }
  };

  // Função para solicitar a exclusão
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  // Função para confirmar a exclusão
  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`/api/automotores/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/automotores");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao excluir veículo");
      }
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      setErrorMsg("Erro ao excluir veículo");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  if (isLoadingData) return <Loading />;
  if (errorMsg) return <p className="p-4 text-red-500">{errorMsg}</p>;

  return (
    <div className="font-mono">
      <AutomotoresForm
        initialData={initialData}
        onSubmit={handleUpdate}
        isUpdating={true}
        title="Detalhes e Atualização do Veículo:"
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
        <NotificationModal
          message={notificationMessage}
          onClose={closeNotification}
        />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          message="Deseja realmente excluir este veículo permanentemente?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
