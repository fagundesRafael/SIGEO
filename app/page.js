// app/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCar, FaBicycle, FaUserCircle } from "react-icons/fa";
import { GiHeavyBullets, GiPowder } from "react-icons/gi";
import { MdMonitor, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoDocumentOutline, IoStatsChart } from "react-icons/io5";
import { PiGearSixBold } from "react-icons/pi";
import TermosUso from "@/components/TermosUso";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const menuRef = useRef(null);
  const padlockRef = useRef(null);
  const router = useRouter();

  // Definição dos itens do menu circular
  const menuItems = [
    { icon: <FaCar />, label: "Automotores", href: "/automotores" },
    { icon: <GiHeavyBullets />, label: "Materiais bélicos", href: "/belicos" },
    { icon: <IoDocumentOutline />, label: "Documentos", href: "/documentos" },
    { icon: <IoStatsChart />, label: "Estatísticas", href: "/estatistica" },
    { icon: <GiPowder />, label: "Entorpecentes", href: "/entorpecentes" },
    { icon: <MdMonitor />, label: "Eletro-eletrônicos", href: "/eletroeletronicos" },
    { icon: <MdOutlineCheckBoxOutlineBlank />, label: "Outros objetos", href: "/outrosobjetos" },
    { icon: <PiGearSixBold />, label: "Configurações", href: "/configs" },
    { icon: <FaUserCircle />, label: "Usuários", href: "/configs", disabled: true },
    { icon: <FaBicycle />, label: "Veículos sem motor", href: "/naomotorizados" },
  ];

  // Efeito para mostrar os itens do menu sequencialmente
  useEffect(() => {
    if (isOpen) {
      // Limpa os itens visíveis
      setVisibleItems([]);
      
      // Adiciona os itens um por um com um pequeno atraso
      menuItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, index * 50); // 50ms de atraso entre cada item
      });
    } else {
      // Quando fechado, esconde todos os itens
      setVisibleItems([]);
    }
  }, [isOpen]);

  // Efeito para fechar o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        padlockRef.current && 
        !padlockRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Função para lidar com o clique em um item do menu
  const handleItemClick = (item, index, e) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    setSelectedItem(index);
    
    // Aguarda a animação terminar antes de navegar
    setTimeout(() => {
      router.push(item.href);
    }, 1500); // 1.5 segundos para a animação e visualização
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-c_deep_black">
      {/* Botão de download dos termos */}
      <div className="absolute top-4 right-4">
        <TermosUso />
      </div>

      <div className="relative">
        {/* Container do cadeado */}
        <div 
          ref={padlockRef}
          className={`relative w-64 h-48 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-500 ${
            !isOpen ? "animate-pulse" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Cabeça do cadeado */}
          <div 
            className={`relative z-2 transition-all duration-700 ease-in-out mb-[-30px] ${
              isOpen ? "transform -translate-y-1 opacity-80" : ""
            }`}
          >
            <Image 
              src="/sigeo_head-padlock.png" 
              alt="Cabeça do cadeado" 
              width={100} 
              height={100}
              className="animate-softglow"
            />
          </div>
          
          {/* Corpo do cadeado */}
          <div 
            className={`relative z-1 transition-all duration-700 ease-in-out mt-[-30px] ${
              isOpen ? "transform translate-y-3 opacity-50" : ""
            }`}
          >
            <Image 
              src="/sigeo_body-padlock.png" 
              alt="Corpo do cadeado" 
              width={100} 
              height={100}
              className="animate-softglow"
            />
          </div>
          
          {/* Texto de instrução */}
          <div className={`absolute bottom-[-30px] text-center text-white font-mono text-md transition-opacity duration-500 ${
            isOpen ? "opacity-0" : "opacity-70"
          }`}>
            Clique no cadeado para iniciar o sistema!
          </div>
        </div>

        {/* Menu circular */}
        <div 
          ref={menuRef}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 transition-all duration-700 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {menuItems.map((item, index) => {
            // Cálculo da posição em círculo
            const angle = (index * (2 * Math.PI / menuItems.length));
            const radius = 200; // Raio do círculo
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const isVisible = visibleItems.includes(index);
            const isSelected = selectedItem === index;

            // Estilo para o item selecionado durante a transição
            const selectedStyle = isSelected
              ? {
                  left: '50%',
                  top: '50%',
                  opacity: 1,
                  transform: 'translate(-50%, -50%) scale(1.5)',
                  zIndex: 50,
                }
              : {
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  opacity: isVisible ? 1 : 0,
                  transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0})`,
                  zIndex: isSelected ? 50 : 1,
                };

            // Estilo para os itens não selecionados quando um item é selecionado
            const nonSelectedStyle = isSelected && selectedItem !== index
              ? {
                  opacity: 0,
                  transform: 'translate(-50%, -50%) scale(0)',
                }
              : {};

            return (
              <div 
                key={index}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 
                  ${item.disabled ? "cursor-not-allowed opacity-50" : "hover:scale-110 hover:opacity-100"} 
                  group`}
                style={{ 
                  ...selectedStyle,
                  ...nonSelectedStyle,
                  transition: 'all 0.7s ease-out'
                }}
                onClick={(e) => handleItemClick(item, index, e)}
              >
                <div className="flex flex-col items-center justify-center bg-c_deep_gray_black p-3 rounded-full shadow-lg border border-gray-500 text-white opacity-80 group-hover:opacity-100 transition-all w-20 h-20 cursor-pointer">
                  <div className="text-xl text-c_text_blue mb-1">{item.icon}</div>
                  <span className="text-xs font-mono whitespace-nowrap text-center">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Logo SIGEO abaixo do cadeado */}
        <div className={`absolute animate-softglow bottom-[-0px] left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}>
          <Image 
            src="/sigeo.png" 
            alt="Logo SIGEO" 
            width={105} 
            height={35}
          />
        </div>
      </div>
    </div>
  );
}
