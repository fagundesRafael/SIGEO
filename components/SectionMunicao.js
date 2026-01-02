// components/SectionMunicao.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function SessionMunicao({ municoes, setMunicoes }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [calibreInput, setCalibreInput] = useState("");
  const [error, setError] = useState("");
  const [deleteModalData, setDeleteModalData] = useState(null);

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existingIndex = municoes.findIndex(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (existingIndex === -1) {
      setMunicoes([...municoes, { marca: marcaInput.trim(), modelos: [], calibres: [] }]);
    }
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = municoes.findIndex(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (municoes[index].modelos.includes(modeloInput.trim())) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...municoes];
    updated[index].modelos.push(modeloInput.trim());
    setMunicoes(updated);
    setModeloInput("");
  }

  function handleAddCalibre() {
    if (!calibreInput.trim()) return;
    const index = municoes.findIndex(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (municoes[index].calibres.includes(calibreInput.trim())) {
      setError("Calibre já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...municoes];
    updated[index].calibres.push(calibreInput.trim());
    setMunicoes(updated);
    setCalibreInput("");
  }

  function requestDeleteBrand(brand) {
    setDeleteModalData({ type: "brand", brand });
  }

  function requestDeleteModelo(brand, modelo) {
    setDeleteModalData({ type: "modelo", brand, item: modelo });
  }

  function requestDeleteCalibre(brand, calibre) {
    setDeleteModalData({ type: "calibre", brand, item: calibre });
  }

  function handleConfirmDelete() {
    if (!deleteModalData) return;
    if (deleteModalData.type === "brand") {
      const updated = municoes.filter(item => item.marca !== deleteModalData.brand);
      setMunicoes(updated);
    } else if (deleteModalData.type === "modelo") {
      const updated = municoes.map(item => {
        if (item.marca === deleteModalData.brand) {
          return { ...item, modelos: item.modelos.filter(m => m !== deleteModalData.item) };
        }
        return item;
      });
      setMunicoes(updated);
    } else if (deleteModalData.type === "calibre") {
      const updated = municoes.map(item => {
        if (item.marca === deleteModalData.brand) {
          return { ...item, calibres: item.calibres.filter(c => c !== deleteModalData.item) };
        }
        return item;
      });
      setMunicoes(updated);
    }
    setDeleteModalData(null);
  }

  function handleCancelDelete() {
    setDeleteModalData(null);
  }

  return (
    <div className="mb-6 p-4 rounded bg-c_deep_gray_black relative">
      {/* Campo de marca */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Inserir marca da munição"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
        />
        {marcaInput.trim() !== "" && (
          <>
            <button type="button" onClick={handleAddMarca} className="text-green-500">
              <IoIosAddCircle size={24} />
            </button>
            <button type="button" onClick={() => requestDeleteBrand(marcaInput.trim())} className="text-red-500">
              <TiDeleteOutline size={20} />
            </button>
          </>
        )}
      </div>
      {/* Renderiza campos de modelo e calibre se houver marca */}
      {marcaInput.trim() !== "" && (
        <>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Inserir modelo da munição"
              value={modeloInput}
              onChange={(e) => setModeloInput(e.target.value)}
              className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
            />
            {modeloInput.trim() !== "" && (
              <button type="button" onClick={handleAddModelo} className="text-green-500">
                <IoIosAddCircle size={24} />
              </button>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Inserir calibre da munição"
              value={calibreInput}
              onChange={(e) => setCalibreInput(e.target.value)}
              className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
            />
            {calibreInput.trim() !== "" && (
              <button type="button" onClick={handleAddCalibre} className="text-green-500">
                <IoIosAddCircle size={24} />
              </button>
            )}
          </div>
        </>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-2 text-[11px]">
        <h3 className="font-bold text-white text-sm mb-1">Marcas, modelos e calibres registrados (Munições):</h3>
        {municoes.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {municoes.map((item, idx) => (
              <li key={idx} className="flex text-white flex-wrap items-center gap-2 border-b-[1px]">
                <strong>{item.marca}</strong>
                <button onClick={() => requestDeleteBrand(item.marca)} className="text-red-500 ml-2">
                  <TiDeleteOutline size={20} />
                </button>
                <div className="ml-4">
                  {item.modelos.length === 0 ? (
                    <span> Nenhum</span>
                  ) : (
                    <ul className="list-disc ml-4">
                      {item.modelos.map((m, i) => (
                        <li key={i} className="inline-flex items-center gap-1">
                          {m}
                          <button onClick={() => requestDeleteModelo(item.marca, m)} className="text-red-500">
                            <TiDeleteOutline size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="ml-4">
                  {(item.calibres?.length || 0) === 0 ? (
                    <span> Nenhum</span>
                  ) : (
                    <ul className="list-disc ml-4">
                      {(item.calibres || []).map((c, i) => (
                        <li key={i} className="inline-flex items-center gap-1">
                          {c}
                          <button onClick={() => requestDeleteCalibre(item.marca, c)} className="text-red-500">
                            <TiDeleteOutline size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
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
              : `Deseja deletar o item "${deleteModalData.item}" da marca "${deleteModalData.brand}"?`
          }
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
