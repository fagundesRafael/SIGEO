// app/belicos/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import BelicoForm from "@/components/BelicoForm";
import Loading from "@/components/Loading";
import NotificationModal from "@/components/NotificationModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function ArmaMunicaoDetalhes() {
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
        const res = await fetch(`/api/belicos/${id}`);
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

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      updatedBy: session?.user?.nome,
      ...(formData.tipo === "Arma" && { aspecto: "Outro" }),
      ...(formData.status !== "apreendido" && { destino: "outros", prateleira: "", secao: "" }),
    };

    try {
      const res = await fetch(`/api/belicos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotificationMessage("Registro atualizado com sucesso!");
        setShowNotification(true);
        setTimeout(() => {
          router.push("/belicos");
        }, 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao atualizar material bélico");
      }
    } catch (error) {
      console.error("Erro ao atualizar material bélico:", error);
      setErrorMsg("Erro ao atualizar material bélico");
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`/api/belicos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/belicos");
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
  };

  if (isLoadingData) return <Loading />;
  if (errorMsg) return <p className="p-4 text-red-500">{errorMsg}</p>;

  return (
    <div>
      <BelicoForm
        initialData={initialData}
        onSubmit={onSubmit}
        isUpdating={true}
        title="Detalhes e atualização de material bélico:"
      />
      <div className="flex justify-between p-4">
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-red-600 transition"
        >
          Excluir material bélico
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
          onClose={() => setShowNotification(false)}
        />
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
