// components/SessionEntorpecentes.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function SessionEntorpecentes({ entorpecentes, setEntorpecentes }) {
  const [tipoInput, setTipoInput] = useState("");
  const [error, setError] = useState("");
  const [deleteModalData, setDeleteModalData] = useState(null);

  function handleAddTipo() {
    if (!tipoInput.trim()) return;
    if (
      entorpecentes.find(
        (t) => t.toLowerCase() === tipoInput.trim().toLowerCase()
      )
    ) {
      setError("Tipo já existe.");
      return;
    }
    setError("");
    setEntorpecentes([...entorpecentes, tipoInput.trim()]);
    setTipoInput("");
  }

  function requestDeleteTipo(tipo) {
    setDeleteModalData({ type: "entorpecente", tipo });
  }

  function handleConfirmDelete() {
    if (!deleteModalData) return;
    if (deleteModalData.type === "entorpecente") {
      setEntorpecentes(entorpecentes.filter((t) => t !== deleteModalData.tipo));
    }
    setDeleteModalData(null);
  }

  function handleCancelDelete() {
    setDeleteModalData(null);
  }

  return (
    <div className="mb-6 p-4 rounded bg-c_deep_gray_black relative">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Inserir tipo de entorpecente"
          value={tipoInput}
          onChange={(e) => setTipoInput(e.target.value)}
          className=" text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
        />
        {tipoInput.trim() !== "" && (
          <>
            <button type="button" onClick={handleAddTipo} className="text-green-500">
              <IoIosAddCircle size={24} />
            </button>
            <button
              type="button"
              onClick={() => requestDeleteTipo(tipoInput.trim())}
              className="text-red-500"
            >
              <TiDeleteOutline size={20} />
            </button>
          </>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-2 text-[11px]">
        <h3 className="font-bold text-white text-sm mb-1">Tipos Registrados:</h3>
        {entorpecentes.length === 0 ? (
          <p>Nenhum tipo registrado.</p>
        ) : (
          <ul>
            {entorpecentes.map((tipo, idx) => (
              <li key={idx} className="flex text-white flex-wrap items-center gap-2">
                {tipo}
                <button
                  type="button"
                  onClick={() => requestDeleteTipo(tipo)}
                  className="text-red-500"
                >
                  <TiDeleteOutline size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {deleteModalData && (
        <ConfirmDeleteModal
          message={`Deseja deletar o tipo "${deleteModalData.tipo}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
