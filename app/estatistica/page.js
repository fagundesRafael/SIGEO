// app/estatistica/page.js
"use client"

import { useState } from 'react';
import EstatisticaAutomotores from '@/components/EstatisticaAutomotores';
import EstatisticaBelicos from '@/components/EstatisticaBelicos';
import EstatisticaEletronicos from '@/components/EstatisticaEletronicos';
import EstatisticaNaoMotorizados from '@/components/EstatisticaNaoMotorizados';
import EstatisticaEntorpecentes from '@/components/EstatisticaEntorpecentes';
import EstatisticaDocumentos from '@/components/EstatisticaDocumentos';
import EstatisticaOutrosObjetos from '@/components/EstatisticaOutrosObjetos';

export default function EstatisticaPage() {
  const [activeTab, setActiveTab] = useState('automotores');

  return (
    <div className="min-h-screen font-mono p-4 bg-c_deep_black text-white">
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('automotores')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'automotores'
              ? 'bg-blue-600 text-white'
              : 'bg-c_deep_middle_black text-gray-300 hover:bg-blue-600/20'
          }`}
        >
          Automotores
        </button>
        <button
          onClick={() => setActiveTab('belicos')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'belicos'
              ? 'bg-blue-600 text-white'
              : 'bg-c_deep_middle_black text-gray-300 hover:bg-blue-600/20'
          }`}
        >
          Bélicos
        </button>
        <button
          onClick={() => setActiveTab('eletronicos')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'eletronicos'
              ? 'bg-blue-600 text-white'
              : 'bg-c_deep_middle_black text-gray-300 hover:bg-blue-600/20'
          }`}
        >
          Eletroeletrônicos
        </button>
        <button
          onClick={() => setActiveTab('naomotorizados')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'naomotorizados'
              ? 'bg-blue-600 text-white'
              : 'bg-c_deep_middle_black text-gray-300 hover:bg-blue-600/20'
          }`}
        >
          Não Motorizados
        </button>
        <button
          onClick={() => setActiveTab('entorpecentes')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'entorpecentes'
              ? 'bg-blue-600 text-white'
              : 'bg-c_deep_middle_black text-gray-300 hover:bg-blue-600/20'
          }`}
        >
          Entorpecentes
        </button>
        <button
          onClick={() => setActiveTab('documentos')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'documentos'
              ? 'bg-blue-600 text-white'
              : 'bg-c_deep_middle_black text-gray-300 hover:bg-blue-600/20'
          }`}
        >
          Documentos
        </button>
        <button
          onClick={() => setActiveTab('outrosobjetos')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'outrosobjetos'
              ? 'bg-blue-600 text-white'
              : 'bg-c_deep_middle_black text-gray-300 hover:bg-blue-600/20'
          }`}
        >
          Outros Objetos
        </button>
      </div>

      <div className="bg-c_deep_middle_black rounded-lg p-6">
        {activeTab === 'automotores' && <EstatisticaAutomotores />}
        {activeTab === 'belicos' && <EstatisticaBelicos />}
        {activeTab === 'eletronicos' && <EstatisticaEletronicos />}
        {activeTab === 'naomotorizados' && <EstatisticaNaoMotorizados />}
        {activeTab === 'entorpecentes' && <EstatisticaEntorpecentes />}
        {activeTab === 'documentos' && <EstatisticaDocumentos />}
        {activeTab === 'outrosobjetos' && <EstatisticaOutrosObjetos />}
      </div>
    </div>
  );
}

