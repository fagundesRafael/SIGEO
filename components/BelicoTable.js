// components/BelicoTable.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function BelicoTable({ records }) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleRows, setVisibleRows] = useState([]);

  useEffect(() => {
    // Ativa a animação de fade-in após o componente ser montado
    setIsVisible(true);

    // Efeito cascata para as linhas da tabela
    if (records.length > 0) {
      // Limpa as linhas visíveis
      setVisibleRows([]);
      
      // Adiciona as linhas uma por uma com um pequeno atraso
      records.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRows(prev => [...prev, index]);
        }, index * (600 / records.length)); // Distribui o tempo total (600ms) entre todas as linhas
      });
    }
  }, [records]);

  return (
    <table className={`w-full transition-opacity duration-300 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}>
      <thead className="bg-blue-900 text-white text-[10px]">
        <tr>
          {[
            "Proced./Num.",
            // "Número",
            "Quantid.",
            "Tipo",
            "Marca",
            "Modelo",
            "Calibre",
            "Cor",
            "Aspecto",
            "Status",
            "Destino",
            "Registrado",
            "Modificado",
            "Obs",
            "Data",
            "Imagem",
            "Ações",
          ].map((col) => (
            <th key={col} className="p-1">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((r, index) => (
          <tr 
            key={r._id} 
            className={`text-[10px] transition-all duration-300 ease-in-out ${
              visibleRows.includes(index) ? "opacity-100" : "opacity-0"
            }`}
            style={{ 
              transform: visibleRows.includes(index) ? "translateY(0)" : "translateY(-10px)"
            }}
          >
            {/* <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {r.procedimento}
            </td> */}
            <td
              className="border border-c_deep_black bg-c_deep_gray_black text-center p-1"
              title={`${r.procedimento} ${r.numero}`}
            >
              {r.procedimento} {r.numero && r.numero.length > 8 ? `${r.numero.substring(0, 8)}...` : r.numero}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {`${r.quantidade} ${r.unidMedida}`}
            </td>
            {r.customTipo ? (
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={r.tipo !== "Outro" ? `${r.tipo}` : `${r.customTipo}`} >
                {r.customTipo && r.customTipo.length > 9 ? `${r.customTipo.substring(0, 9)}...` : r.customTipo}
              </td>
            ) : (
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                {r.tipo}
              </td>
            )}
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {r.marca}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {r.modelo}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {r.calibre}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {r.cor}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {r.aspecto}
            </td>
            {r.status === "restituído" ? (
              <td className="border border-c_deep_black bg-green-500 text-center text-slate-100 p-1">
                {r.status}
              </td>
            ) : r.status === "apreendido" ? (
              <td className="border border-c_deep_black bg-red-500 text-center text-slate-100 p-1">
                {r.status}
              </td>
            ) : (
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center text-slate-100 p-1">
                {r.status}
              </td>
            )}
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {r.destino}
            </td>
            <td
              className="border border-c_deep_black bg-c_deep_gray_black text-center p-1"
              title={r.createdBy}
            >
              {r.createdBy.split(" ")[0]}
            </td>
            <td
              className="border border-c_deep_black bg-c_deep_gray_black text-center p-1"
              title={r.updatedBy}
            >
              {r.updatedBy ? r.updatedBy.split(" ")[0] : ""}
            </td>
            <td
              className="border border-c_deep_black bg-c_deep_gray_black text-center p-1"
              title={r.obs}
            >
              {r.obs && r.obs.length > 6 ? `${r.obs.substring(0, 6)}...` : r.obs}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {new Date(r.data).toLocaleDateString()}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {r.imagem ? (
                <img src={r.imagem} alt="Imagem" className="w-10 h-10 object-cover" />
              ) : (
                <img src="/no-image.jpg" alt="Sem imagem" className="w-10 h-10 object-cover" />
              )}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              <Link
                href={`/belicos/${r._id}`}
                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-600"
              >
                Ver/Editar
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
