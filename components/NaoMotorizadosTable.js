// components/NaoMotorizadosTable.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NaoMotorizadosTable({ veiculos }) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleRows, setVisibleRows] = useState([]);

  useEffect(() => {
    // Ativa a animação de fade-in após o componente ser montado
    setIsVisible(true);

    // Efeito cascata para as linhas da tabela
    if (veiculos.length > 0) {
      // Limpa as linhas visíveis
      setVisibleRows([]);
      
      // Adiciona as linhas uma por uma com um pequeno atraso
      veiculos.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRows(prev => [...prev, index]);
        }, index * (600 / veiculos.length)); // Distribui o tempo total (600ms) entre todas as linhas
      });
    }
  }, [veiculos]);

  return (
    <table className={`w-full font-mono transition-opacity duration-300 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}>
      <thead className="bg-blue-900 text-white text-[10px]">
        <tr>
          <th className="p-1">Proced./Num.</th>
          <th className="p-1">Tipo</th>
          <th className="p-1">Marca</th>
          <th className="p-1">Modelo</th>
          <th className="p-1">Cor</th>
          <th className="p-1">Status</th>
          <th className="p-1">Registrado</th>
          <th className="p-1">Modificado</th>
          <th className="p-1">Obs</th>
          <th className="p-1">Data</th>
          <th className="p-1">Imagem</th>
          <th className="p-1">Ações</th>
        </tr>
      </thead>
      <tbody>
        {veiculos.map((v, index) => (
          <tr 
            key={v._id} 
            className={`text-[10px] transition-all duration-300 ease-in-out ${
              visibleRows.includes(index) ? "opacity-100" : "opacity-0"
            }`}
            style={{ 
              transform: visibleRows.includes(index) ? "translateY(0)" : "translateY(-10px)"
            }}
          >
            <td
              className="border border-c_deep_black bg-c_deep_gray_black text-center p-1"
              title={`${v.procedimento} ${v.numero}`}
            >
              {v.procedimento} {v.numero?.length > 8 ? `${v.numero.substring(0,8)}...` : v.numero}
            </td>
            {v.customTipo ? (
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                {v.customTipo}
              </td>
            ) : (
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                {v.tipo}
              </td>
            )}
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.marca}</td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.modelo}</td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.cor}</td>
            {v.status === "restituído" ? (
              <td className="border border-c_deep_black bg-green-500 text-center text-slate-100 p-1">
                {v.status}
              </td>
            ) : v.status === "apreendido" ? (
              <td className="border border-c_deep_black bg-red-500 text-center text-slate-100 p-1">
                {v.status}
              </td>
            ) : (
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                {v.status}
              </td>
            )}
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.createdBy}>
              {v.createdBy.split(" ")[0]}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.updatedBy}>
              {v.updatedBy?.split(" ")[0] || ""}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.obs}>
              {v.obs?.length > 6 ? `${v.obs.substring(0,6)}...` : v.obs}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {new Date(v.data).toLocaleDateString()}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {v.imagem ? (
                <img src={v.imagem} alt="Imagem do veículo" className="w-10 h-10 object-cover" />
              ) : (
                <img src="/no-image.jpg" alt="Sem imagem" className="w-10 h-10 object-cover" />
              )}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              <Link
                href={`/naomotorizados/${v._id}`}
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
