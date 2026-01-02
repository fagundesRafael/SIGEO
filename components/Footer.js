// components/Footer.js
"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ativa a animação de fade-in após o componente ser montado
    setIsVisible(true);
  }, []);

  return (
    <footer className={`flex flex-col items-center gap-2 rounded-md w-full text-white bg-c_deep_black p-4 m-1 text-center border border-gray-500 shadow transition-opacity duration-300 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}>
      <img className="w-4 animate-glow" src="/sigeo_padlock.png" alt="" />
      <img className="w-16 animate-glow" src="/sigeo.png" alt="footer-logo" />
      <p className="text-[10px]">
        SISTEMA INTEGRADO DE GESTÃO DE OBJETOS APREENDIDOS
      </p>
      <div className="text-xs text-c_logo_red">
      <p>Todos os direitos reservados</p>
      <p>created by: fagundesrafael</p>
      </div>
    </footer>
  );
}
