// app/configs/page.js
"use client";

import { useState, useEffect } from "react";
import SectionCarros from "@/components/SectionCarros";
import SectionMotos from "@/components/SectionMotos";
import SectionCaminhonetes from "@/components/SectionCaminhonetes";
import SectionCaminhoes from "@/components/SectionCaminhoes";
import SectionTratores from "@/components/SectionTratores";
import SectionOutrosAutomotores from "@/components/SectionOutrosAutomotores";
import SectionBicicletas from "@/components/SectionBicicletas";
import SectionOutroNaoMotorizado from "@/components/SectionOutroNaoMotorizado";
import SectionArmas from "@/components/SectionArmas";
import SectionMunicao from "@/components/SectionMunicao";
import SectionOutrosBelicos from "@/components/SectionOutrosBelicos";
import SectionGeladeira from "@/components/SectionGeladeira";
import SectionFogao from "@/components/SectionFogao";
import SectionComputador from "@/components/SectionComputador";
import SectionNotebook from "@/components/SectionNotebook";
import SectionTelevisor from "@/components/SectionTelevisor";
import SectionOutroEletroEletronico from "@/components/SectionOutroEletroEletronico";
import SectionOutros from "@/components/SectionOutrosObjetos";
import NotificationModal from "@/components/NotificationModal";

export default function ConfigsPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Automotores
  const [carros, setCarros] = useState([]);
  const [motos, setMotos] = useState([]);
  const [caminhonetes, setCaminhonetes] = useState([]);
  const [caminhoes, setCaminhoes] = useState([]);
  const [tratores, setTratores] = useState([]);
  const [outrosautomotores, setOutrosAutomotores] = useState([]);

  // Veículos não motorizados
  const [bicicletas, setBicicletas] = useState([]);
  const [outronaomotorizado, setOutronaomotorizado] = useState([]);

  // Bélicos
  const [armas, setArmas] = useState([]);
  const [municoes, setMunicoes] = useState([]);
  const [outrosbelicos, setOutrosBelicos] = useState([]);

  // Eletroeletrônicos (novas categorias)
  const [geladeiras, setGeladeiras] = useState([]);
  const [fogoes, setFogoes] = useState([]);
  const [computadores, setComputadores] = useState([]);
  const [notebooks, setNotebooks] = useState([]);
  const [televisores, setTelevisores] = useState([]);
  const [outroeletroeletronicos, setOutroeletroeletronicos] = useState([]);

  // Outras
  const [entorpecentes, setEntorpecentes] = useState([]);
  const [eletro, setEletro] = useState([]);
  const [outrosobjetos, setOutrosObjetos] = useState([]);

  // Adicionar estado para controlar quais seções estão expandidas
  const [expandedSections, setExpandedSections] = useState({
    automotores: false,
    belicos: false,
    veiculosNaoMotorizados: false,
    eletroeletronicos: false,
    outrosObjetos: false
  });

  // Estado para controlar a visibilidade dos cards
  const [visibleCards, setVisibleCards] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Função para alternar a expansão de uma seção
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  useEffect(() => {
    // Ativa a animação de fade-in após o componente ser montado
    setIsVisible(true);

    // Efeito cascata para os cards
    const sectionCards = ['automotores', 'belicos', 'veiculosNaoMotorizados', 'eletroeletronicos', 'outrosObjetos'];
    
    // Limpa os cards visíveis
    setVisibleCards([]);
    
    // Adiciona os cards um por um com um pequeno atraso
    sectionCards.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 120); // 120ms de atraso entre cada card (total ~600ms)
    });
  }, []);

  useEffect(() => {
    async function fetchConfigs() {
      try {
        const res = await fetch("/api/configs", {
          method: "GET",
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            const config = data[0];
            setCarros(config.carros || []);
            setMotos(config.motos || []);
            setCaminhonetes(config.caminhonetes || []);
            setCaminhoes(config.caminhoes || []);
            setTratores(config.tratores || []);
            setOutrosAutomotores(config.outrosautomotores || []);
            setBicicletas(config.bicicletas || []);
            setOutronaomotorizado(config.outronaomotorizado || []);
            setArmas(config.armas || []);
            setMunicoes(config.municoes || []);
            setOutrosBelicos(config.outrosbelicos || []);
            setGeladeiras(config.geladeiras || []);
            setFogoes(config.fogoes || []);
            setComputadores(config.computadores || []);
            setNotebooks(config.notebooks || []);
            setTelevisores(config.televisores || []);
            setOutroeletroeletronicos(config.outroeletroeletronicos || []);
            setEletro(config.eletro || []);
            setOutrosObjetos(config.outrosobjetos || []);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    }
    fetchConfigs();
  }, []);

  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    console.log("Função handleSubmit iniciada");
    
    const configData = {
      carros,
      motos,
      caminhonetes,
      caminhoes,
      tratores,
      outrosautomotores,
      bicicletas,
      outronaomotorizado,
      armas,
      municoes,
      outrosbelicos,
      geladeiras,
      fogoes,
      computadores,
      notebooks,
      televisores,
      outroeletroeletronicos,
      eletro,
      outrosobjetos,
    };
    
    try {
      console.log("Iniciando chamada à API");
      const res = await fetch("/api/configs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configData),
      });
      console.log("Resposta da API:", res.status);
      
      if (res.ok) {
        console.log("Configurações salvas com sucesso");
        showAlert("Configurações salvas com sucesso!");
      } else {
        const data = await res.json();
        console.error("Erro na resposta da API:", data);
        showAlert("Erro: " + (data.error || "Erro ao salvar configuração."));
      }
    } catch (error) {
      console.error("Erro ao salvar configuração:", error);
      showAlert("Erro ao salvar configuração.");
    }
  };

  return (
    <div className="container font-mono mx-auto p-2 bg-c_deep_black rounded-lg border border-gray-500">
      <h1 className="text-xs font-bold text-white mb-2 text-primary">Configurações</h1>
      
      {/* Seção Automotores */}
      <div 
        className={`border border-gray-500 mb-1 rounded-sm transition-opacity duration-600 ease-in-out ${
          isVisible && visibleCards.includes(0) ? "opacity-100" : "opacity-0"
        }`}
      >
        <button 
          type="button"
          onClick={() => toggleSection('automotores')}
          className="w-full flex justify-between items-center p-1 bg-blue-800 hover:bg-blue-700 text-slate-100 text-left text-xs font-medium text-primary"
        >
          <span>Automotores:</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.automotores ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {expandedSections.automotores && (
          <div className="p-4">
            <SectionCarros carros={carros} setCarros={setCarros} />
            <SectionMotos motos={motos} setMotos={setMotos} />
            <SectionCaminhonetes
              caminhonetes={caminhonetes}
              setCaminhonetes={setCaminhonetes}
            />
            <SectionCaminhoes
              caminhoes={caminhoes}
              setCaminhoes={setCaminhoes}
            />
            <SectionTratores tratores={tratores} setTratores={setTratores} />
            <SectionOutrosAutomotores
              outrosautomotores={outrosautomotores}
              setOutrosAutomotores={setOutrosAutomotores}
            />
          </div>
        )}
      </div>
      
      {/* Seção Bélicos */}
      <div 
        className={`border border-gray-500 mb-1 rounded-sm transition-opacity duration-600 ease-in-out ${
          isVisible && visibleCards.includes(1) ? "opacity-100" : "opacity-0"
        }`}
      >
        <button 
          type="button"
          onClick={() => toggleSection('belicos')}
          className="w-full flex justify-between items-center p-1 bg-blue-800 hover:bg-blue-700 text-slate-100 text-left text-xs font-medium text-primary"
        >
          <span>Bélicos:</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.belicos ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {expandedSections.belicos && (
          <div className="p-4">
            <SectionArmas armas={armas} setArmas={setArmas} />
            <SectionMunicao municoes={municoes} setMunicoes={setMunicoes} />
            <SectionOutrosBelicos
              outrosbelicos={outrosbelicos}
              setOutrosBelicos={setOutrosBelicos}
            />
          </div>
        )}
      </div>
      
      {/* Seção Veículos não motorizados */}
      <div 
        className={`border border-gray-500 mb-1 rounded-sm transition-opacity duration-600 ease-in-out ${
          isVisible && visibleCards.includes(2) ? "opacity-100" : "opacity-0"
        }`}
      >
        <button 
          type="button"
          onClick={() => toggleSection('veiculosNaoMotorizados')}
          className="w-full flex justify-between items-center p-1 bg-blue-800 hover:bg-blue-700 text-slate-100 text-left text-xs font-medium text-primary"
        >
          <span>Veículos não motorizados:</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.veiculosNaoMotorizados ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {expandedSections.veiculosNaoMotorizados && (
          <div className="p-4">
            <SectionBicicletas
              bicicletas={bicicletas}
              setBicicletas={setBicicletas}
            />
            <SectionOutroNaoMotorizado
              outronaomotorizado={outronaomotorizado}
              setOutronaomotorizado={setOutronaomotorizado}
            />
          </div>
        )}
      </div>
      
      {/* Seção Eletroeletrônicos */}
      <div 
        className={`border border-gray-500 mb-1 rounded-sm transition-opacity duration-600 ease-in-out ${
          isVisible && visibleCards.includes(3) ? "opacity-100" : "opacity-0"
        }`}
      >
        <button 
          type="button"
          onClick={() => toggleSection('eletroeletronicos')}
          className="w-full flex justify-between items-center p-1 bg-blue-800 hover:bg-blue-700 text-slate-100 text-left text-xs font-medium text-primary"
        >
          <span>Eletroeletrônicos:</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.eletroeletronicos ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {expandedSections.eletroeletronicos && (
          <div className="p-4">
            <SectionGeladeira
              geladeiras={geladeiras}
              setGeladeiras={setGeladeiras}
            />
            <SectionFogao fogoes={fogoes} setFogoes={setFogoes} />
            <SectionComputador
              computadores={computadores}
              setComputadores={setComputadores}
            />
            <SectionNotebook
              notebooks={notebooks}
              setNotebooks={setNotebooks}
            />
            <SectionTelevisor
              televisores={televisores}
              setTelevisores={setTelevisores}
            />
            <SectionOutroEletroEletronico
              outroeletroeletronicos={outroeletroeletronicos}
              setOutroeletroeletronicos={setOutroeletroeletronicos}
            />
          </div>
        )}
      </div>
      
      {/* Seção Outros objetos */}
      <div 
        className={`border border-gray-500 mb-1 rounded-sm transition-opacity duration-600 ease-in-out ${
          isVisible && visibleCards.includes(4) ? "opacity-100" : "opacity-0"
        }`}
      >
        <button 
          type="button"
          onClick={() => toggleSection('outrosObjetos')}
          className="w-full flex justify-between items-center p-1 bg-blue-800 hover:bg-blue-700 text-slate-100 text-left text-xs font-medium text-primary"
        >
          <span>Outros objetos:</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.outrosObjetos ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {expandedSections.outrosObjetos && (
          <div className="p-4">
            <SectionOutros
              outrosobjetos={outrosobjetos}
              setOutrosObjetos={setOutrosObjetos}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end mt-4">
        <button 
          type="button" 
          onClick={() => {
            console.log("Botão Salvar clicado");
            handleSubmit();
          }}
          className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Salvar
        </button>
      </div>
      
      {showNotification && (
        <NotificationModal
          message={notificationMessage}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}
