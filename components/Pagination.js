"use client";

import { useState, useEffect } from "react";

export default function Pagination({ page, totalPages, onPrevious, onNext }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ativa a animação de fade-in após o componente ser montado
    setIsVisible(true);
  }, []);

  return (
    <div className={`flex justify-between mt-4 transition-opacity duration-300 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}>
      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="bg-green-600 text-white py-1 px-3 rounded disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Retornar
      </button>
      <button
        onClick={onNext}
        disabled={page === totalPages || totalPages === 0}
        className="bg-green-600 text-white py-1 px-3 rounded disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Avançar
      </button>
    </div>
  );
}
