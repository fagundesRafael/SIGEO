// components/SectionCarros.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function SectionCarros({ carros, setCarros }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [showModeloInput, setShowModeloInput] = useState(false);
  const [error, setError] = useState("");
  const [deleteModalData, setDeleteModalData] = useState(null);

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = carros.find(
      (carro) =>
        carro.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (!existing) {
      setCarros([...carros, { marca: marcaInput.trim(), modelos: [] }]);
    }
    setShowModeloInput(true);
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = carros.findIndex(
      (carro) => carro.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (carros[index].modelos.includes(modeloInput.trim())) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...carros];
    updated[index].modelos.push(modeloInput.trim());
    setCarros(updated);
    setModeloInput("");
  }

  function requestDeleteBrand(brand) {
    setDeleteModalData({ type: "brand", brand });
  }

  function requestDeleteModel(brand, model) {
    setDeleteModalData({ type: "model", brand, model });
  }

  function handleConfirmDelete() {
    if (!deleteModalData) return;
    if (deleteModalData.type === "brand") {
      const updated = carros.filter(
        (carro) => carro.marca !== deleteModalData.brand
      );
      setCarros(updated);
    } else if (deleteModalData.type === "model") {
      const updated = carros.map((carro) => {
        if (carro.marca === deleteModalData.brand) {
          return { ...carro, modelos: carro.modelos.filter((m) => m !== deleteModalData.model) };
        }
        return carro;
      });
      setCarros(updated);
    }
    setDeleteModalData(null);
  }

  function handleCancelDelete() {
    setDeleteModalData(null);
  }

  return (
    <div className="mb-2 p-4 rounded bg-c_deep_gray_black relative">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Inserir marca do carro"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className=" text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
        />
        {marcaInput.trim() !== "" && (
          <>
            <button
              type="button"
              onClick={handleAddMarca}
              className="text-green-500"
            >
              <IoIosAddCircle size={14} />
            </button>
            <button
              type="button"
              onClick={() => requestDeleteBrand(marcaInput.trim())}
              className="text-red-500"
            >
              <TiDeleteOutline size={14} />
            </button>
          </>
        )}
      </div>
      {showModeloInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="inserir modelo do carro"
            value={modeloInput}
            onChange={(e) => setModeloInput(e.target.value)}
            className=" text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
          />
          {modeloInput.trim() !== "" && (
            <>
              <button
                type="button"
                onClick={handleAddModelo}
                className="text-green-500"
              >
                <IoIosAddCircle size={14} />
              </button>
              <button
                type="button"
                onClick={() =>
                  requestDeleteModel(marcaInput.trim(), modeloInput.trim())
                }
                className="text-red-500"
              >
                <TiDeleteOutline size={14} />
              </button>
            </>
          )}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-2 text-[11px]">
        <h3 className="font-bold text-white text-sm mb-1">Marcas e Modelos Registrados (Carros):</h3>
        {carros.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {carros.map((carro, idx) => (
              <li key={idx} className="flex text-white flex-wrap items-center gap-2 border-b-[1px]">
                <strong>{carro.marca}</strong>
                <button
                  onClick={() => requestDeleteBrand(carro.marca)}
                  className="text-red-500"
                >
                  <TiDeleteOutline size={14} />
                </button>
                <span>:</span>
                {carro.modelos.map((modelo, i) => (
                  <span key={i} className="flex italic text-[11px] items-center gap-1">
                    {modelo}
                    <button
                      onClick={() => requestDeleteModel(carro.marca, modelo)}
                      className="text-red-500"
                    >
                      <TiDeleteOutline size={14} />
                    </button>
                    {i < carro.modelos.length - 1 && <span>,</span>}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
      {deleteModalData && (
        <ConfirmDeleteModal
          message={
            deleteModalData.type === "brand"
              ? `Deseja deletar a marca "${deleteModalData.brand}" e todos os seus modelos?`
              : `Deseja deletar o modelo "${deleteModalData.model}" da marca "${deleteModalData.brand}"?`
          }
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
