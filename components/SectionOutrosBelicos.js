// components/SectionOutrosBelicos.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function SectionOutrosBelicos({ outrosbelicos, setOutrosBelicos }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [calibreInput, setCalibreInput] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [error, setError] = useState("");
  const [deleteModalData, setDeleteModalData] = useState(null);

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = outrosbelicos.find(
      (item) =>
        item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (!existing) {
      // Ao criar a marca, já inicializamos os arrays de modelos e calibres
      setOutrosBelicos([
        ...outrosbelicos,
        { marca: marcaInput.trim(), modelos: [], calibres: [] },
      ]);
    }
    setShowInputs(true);
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = outrosbelicos.findIndex(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (outrosbelicos[index].modelos.includes(modeloInput.trim())) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...outrosbelicos];
    updated[index].modelos.push(modeloInput.trim());
    setOutrosBelicos(updated);
    setModeloInput("");
  }

  function handleAddCalibre() {
    if (!calibreInput.trim()) return;
    const index = outrosbelicos.findIndex(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (outrosbelicos[index].calibres.includes(calibreInput.trim())) {
      setError("Calibre já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...outrosbelicos];
    updated[index].calibres.push(calibreInput.trim());
    setOutrosBelicos(updated);
    setCalibreInput("");
  }

  function requestDeleteBrand(brand) {
    setDeleteModalData({ type: "brand", brand });
  }

  function requestDeleteModel(brand, model) {
    setDeleteModalData({ type: "model", brand, item: model });
  }

  function requestDeleteCalibre(brand, calibre) {
    setDeleteModalData({ type: "calibre", brand, item: calibre });
  }

  function handleConfirmDelete() {
    if (!deleteModalData) return;
    if (deleteModalData.type === "brand") {
      const updated = outrosbelicos.filter(
        (item) => item.marca !== deleteModalData.brand
      );
      setOutrosBelicos(updated);
    } else if (deleteModalData.type === "model") {
      const updated = outrosbelicos.map((item) => {
        if (item.marca === deleteModalData.brand) {
          return { ...item, modelos: item.modelos.filter((m) => m !== deleteModalData.item) };
        }
        return item;
      });
      setOutrosBelicos(updated);
    } else if (deleteModalData.type === "calibre") {
      const updated = outrosbelicos.map((item) => {
        if (item.marca === deleteModalData.brand) {
          return { ...item, calibres: item.calibres.filter((c) => c !== deleteModalData.item) };
        }
        return item;
      });
      setOutrosBelicos(updated);
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
          placeholder="Inserir marca do insumo/componente bélico"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
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
      {/* Campos de modelo e calibre exibidos após adicionar a marca */}
      {showInputs && marcaInput.trim() !== "" && (
        <>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder="Inserir modelo do insumo/componente bélico"
              value={modeloInput}
              onChange={(e) => setModeloInput(e.target.value)}
              className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
            />
            {modeloInput.trim() !== "" && (
              <button type="button" onClick={handleAddModelo} className="text-green-500">
                <IoIosAddCircle size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder="Inserir calibre do insumo/componente bélico"
              value={calibreInput}
              onChange={(e) => setCalibreInput(e.target.value)}
              className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
            />
            {calibreInput.trim() !== "" && (
              <button type="button" onClick={handleAddCalibre} className="text-green-500">
                <IoIosAddCircle size={14} />
              </button>
            )}
          </div>
        </>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-2 text-[11px]">
        <h3 className="font-bold text-white text-sm mb-1">Marcas, modelos e calibres registrados (Outros Bélicos):</h3>
        {outrosbelicos.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {outrosbelicos.map((item, idx) => (
              <li key={idx} className="flex text-white flex-wrap items-center gap-2 border-b-[1px]">
                <strong>{item.marca}</strong>
                <button onClick={() => requestDeleteBrand(item.marca)} className="text-red-500">
                  <TiDeleteOutline size={14} />
                </button>
                <div className="ml-4">
                  {item.modelos.length === 0 ? (
                    <span> Nenhum</span>
                  ) : (
                    <ul className="list-disc ml-4">
                      {item.modelos.map((m, i) => (
                        <li key={i} className="inline-flex items-center gap-1">
                          {m}
                          <button onClick={() => requestDeleteModel(item.marca, m)} className="text-red-500">
                            <TiDeleteOutline size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="ml-4">
                  {item.calibres && item.calibres.length > 0 ? (
                    <ul className="list-disc ml-4">
                      {item.calibres.map((c, i) => (
                        <li key={i} className="inline-flex items-center gap-1">
                          {c}
                          <button onClick={() => requestDeleteCalibre(item.marca, c)} className="text-red-500">
                            <TiDeleteOutline size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span> Nenhum</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {deleteModalData && (
        <ConfirmDeleteModal
          message={
            deleteModalData.type === "brand"
              ? `Deseja deletar a marca "${deleteModalData.brand}" e todos os seus modelos e calibres?`
              : deleteModalData.type === "model"
              ? `Deseja deletar o modelo "${deleteModalData.item}" da marca "${deleteModalData.brand}"?`
              : `Deseja deletar o calibre "${deleteModalData.item}" da marca "${deleteModalData.brand}"?`
          }
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
