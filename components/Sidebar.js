// components/Sidebar.js
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaCar, FaBicycle, FaUserCircle } from "react-icons/fa";
import { GiHeavyBullets, GiPowder } from "react-icons/gi";
import { MdMonitor, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoDocumentOutline, IoStatsChart } from "react-icons/io5";
import { PiGearSixBold } from "react-icons/pi";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ativa a animação de fade-in após o componente ser montado
    setIsVisible(true);
  }, []);

  const isActive = (path) => pathname === path;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <aside 
      className={`relative left-0 top-0 h-screen bg-c_deep_black p-4 rounded-md mx-1 border border-gray-500 shadow transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {session && (
        <div className="mb-2">
          <p className="text-cyan-50 text-bold text-xs">
            Bem vindo(a){" "}
            {session?.user?.nome.split(" ")[0] &&
              capitalizeFirstLetter(session.user.nome.split(" ")[0])}
            .
          </p>
        </div>
      )}

      <div className="flex flex-col mb-4 text-xs font-mono gap-4 text-gray-200 ">
        <ul className="space-y-2">
          <span className="text-c_text_blue font-black">sessões:</span>
          <li className="flex ml-2 items-center">
            <FaCar />
            <Link
              href="/automotores"
              className={`block p-1 rounded ml-1 ${
                isActive("/automotores")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Automotores
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <GiHeavyBullets />
            <Link
              href="/belicos"
              className={`block p-1 rounded  ml-1 ${
                isActive("/belicos")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Materiais bélicos
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <MdMonitor />
            <Link
              href="/eletroeletronicos"
              className={`block p-1 rounded  ml-1 ${
                isActive("/eletroeletronicos")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Eletro-eletrônicos
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <FaBicycle />
            <Link
              href="/naomotorizados"
              className={`block p-1 rounded  ml-1 ${
                isActive("/naomotorizados")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Veículos sem motor
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <GiPowder />
            <Link
              href="/entorpecentes"
              className={`block p-1 rounded  ml-1 ${
                isActive("/entorpecentes")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Entorpecentes
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <IoDocumentOutline />
            <Link
              href="/documentos"
              className={`block p-1 rounded  ml-1 ${
                isActive("/documentos")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Documentos
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <MdOutlineCheckBoxOutlineBlank />
            <Link
              href="/outrosobjetos"
              className={`block p-1 rounded  ml-1 ${
                isActive("/outrosobjetos")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Outros objetos
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-col mb-4 text-xs font-mono gap-4 text-gray-200 ">
        <ul className="space-y-2">
          <span className="text-c_text_blue font-black">sistema:</span>
          <li className="flex ml-2 items-center">
            <PiGearSixBold />
            <Link
              href="/configs"
              className={`block p-1 rounded ml-1 ${
                isActive("/configs")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full">
    Configurações
  </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <FaUserCircle />
            <Link
              href="/configs"
              className={`block p-1 rounded  ml-1 cursor-not-allowed ${
                isActive("/users")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              Usuários
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <IoStatsChart />
            <Link
              href="/estatistica"
              className={`block p-1 rounded  ml-1 ${
                isActive("/estatistica")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Estatísticas
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {session && (
        <div className="mt-2">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white text-xs p-1 rounded mt-4 hover:bg-red-600 transition w-full"
          >
            Sair
          </button>
        </div>
      )}
    </aside>
  );
}
