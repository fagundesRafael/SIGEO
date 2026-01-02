"use client"

import { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function EstatisticaEntorpecentes() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gerando, setGerando] = useState(false);

  // Refs para os gráficos para captura de PDF
  const estatisticasRef = useRef(null);

  // Dados processados para os gráficos
  const [totalApreendidosCount, setTotalApreendidosCount] = useState(0);
  const [statusData, setStatusData] = useState({ labels: [], data: [] });
  const [tiposData, setTiposData] = useState({ labels: [], data: [] });
  const [destinosData, setDestinosData] = useState({ labels: [], data: [] });
  const [cronologiaData, setCronologiaData] = useState({ labels: [], data: [] });
  const [procedimentosData, setProcedimentosData] = useState({ labels: [], data: [] });

  useEffect(() => {
    async function fetchRecords() {
      try {
        setLoading(true);
        const res = await fetch('/api/entorpecentes?limit=1000');
        if (!res.ok) {
          throw new Error('Falha ao buscar dados de entorpecentes');
        }
        const data = await res.json();
        setRecords(data.records || []);
      } catch (err) {
        console.error('Erro ao buscar registros:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      processarDados();
    }
  }, [records]);

  const processarDados = () => {
    // 1. Total de entorpecentes apreendidos
    const apreendidos = records.filter(r => r.status === 'apreendido');
    setTotalApreendidosCount(apreendidos.length);

    // 2. Gráfico de pizza por status
    const statusCount = {};
    records.forEach(r => {
      statusCount[r.status] = (statusCount[r.status] || 0) + 1;
    });
    setStatusData({
      labels: Object.keys(statusCount),
      data: Object.values(statusCount)
    });

    // 3. Gráfico de pizza por tipo/customTipo
    const tiposCount = {};
    records.forEach(r => {
      const tipo = r.customTipo || r.tipo;
      tiposCount[tipo] = (tiposCount[tipo] || 0) + 1;
    });
    setTiposData({
      labels: Object.keys(tiposCount),
      data: Object.values(tiposCount)
    });

    // 4. Gráfico de pizza por destino
    const destinosCount = {};
    records.forEach(r => {
      const destino = r.destino || 'Não especificado';
      destinosCount[destino] = (destinosCount[destino] || 0) + 1;
    });
    setDestinosData({
      labels: Object.keys(destinosCount),
      data: Object.values(destinosCount)
    });

    // 5. Gráfico de linha para cronologia
    const dataRegistros = {};
    records.forEach(r => {
      if (r.data) {
        const data = new Date(r.data).toLocaleDateString();
        dataRegistros[data] = (dataRegistros[data] || 0) + 1;
      }
    });

    // Ordenando as datas
    const datasOrdenadas = Object.keys(dataRegistros).sort((a, b) => new Date(a) - new Date(b));

    setCronologiaData({
      labels: datasOrdenadas,
      data: datasOrdenadas.map(data => dataRegistros[data])
    });

    // 6. Gráfico de barras para procedimentos
    const procedimentosCount = {};
    records.forEach(r => {
      if (r.procedimento) {
        procedimentosCount[r.procedimento] = (procedimentosCount[r.procedimento] || 0) + 1;
      }
    });

    // Ordenar por quantidade (do maior para o menor)
    const procedimentosOrdenados = Object.entries(procedimentosCount)
      .sort(([, a], [, b]) => b - a)
      .reduce((obj, [key, value]) => {
        obj.labels.push(key);
        obj.data.push(value);
        return obj;
      }, { labels: [], data: [] });

    setProcedimentosData(procedimentosOrdenados);
  };

  // Função para gerar o PDF
  const gerarPDF = async () => {
    if (!estatisticasRef.current) return;

    try {
      setGerando(true);

      // Captura o conteúdo do componente
      const canvas = await html2canvas(estatisticasRef.current, {
        scale: 1,
        useCORS: true,
        logging: false,
        backgroundColor: '#1d1d1b'
      });

      const imgData = canvas.toDataURL('image/png');

      // Cria o PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Adiciona título
      pdf.setTextColor(255, 255, 255);
      pdf.setFillColor(29, 29, 27);
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
      pdf.setFontSize(18);
      pdf.text('Relatório de Estatísticas - Entorpecentes', pdfWidth / 2, 15, { align: 'center' });

      // Adiciona a imagem dos gráficos
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);

      // Adiciona informações textuais
      const yPos = 25 + imgHeight + 10;
      pdf.setFontSize(14);
      pdf.text('Resumo das Estatísticas', pdfWidth / 2, yPos, { align: 'center' });

      pdf.setFontSize(12);
      let y = yPos + 10;

      // Total de entorpecentes apreendidos
      pdf.text(`Total de entorpecentes apreendidos: ${totalApreendidosCount}`, 15, y);
      y += 8;

      // Distribuição por status
      pdf.text('Distribuição por Status:', 15, y);
      y += 6;
      statusData.labels.forEach((label, index) => {
        pdf.text(`- ${label}: ${statusData.data[index]}`, 20, y);
        y += 6;
      });
      y += 2;

      // Distribuição por tipo
      if (y > pdfHeight - 40) {
        pdf.addPage();
        pdf.setFillColor(29, 29, 27);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
        y = 20;
      }

      pdf.text('Distribuição por Tipo:', 15, y);
      y += 6;
      tiposData.labels.forEach((label, index) => {
        pdf.text(`- ${label}: ${tiposData.data[index]}`, 20, y);
        y += 6;
        if (y > pdfHeight - 20 && index < tiposData.labels.length - 1) {
          pdf.addPage();
          pdf.setFillColor(29, 29, 27);
          pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
          y = 20;
        }
      });

      // Distribuição por destino
      if (y > pdfHeight - 40) {
        pdf.addPage();
        pdf.setFillColor(29, 29, 27);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
        y = 20;
      }

      pdf.text('Distribuição por Destino:', 15, y);
      y += 6;
      destinosData.labels.forEach((label, index) => {
        pdf.text(`- ${label}: ${destinosData.data[index]}`, 20, y);
        y += 6;
        if (y > pdfHeight - 20 && index < destinosData.labels.length - 1) {
          pdf.addPage();
          pdf.setFillColor(29, 29, 27);
          pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
          y = 20;
        }
      });

      // Distribuição por Procedimento
      if (y > pdfHeight - 40) {
        pdf.addPage();
        pdf.setFillColor(29, 29, 27);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
        y = 20;
      }

      pdf.text('Distribuição por Procedimento:', 15, y);
      y += 6;
      procedimentosData.labels.forEach((label, index) => {
        pdf.text(`- ${label}: ${procedimentosData.data[index]}`, 20, y);
        y += 6;
        if (y > pdfHeight - 20 && index < procedimentosData.labels.length - 1) {
          pdf.addPage();
          pdf.setFillColor(29, 29, 27);
          pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
          y = 20;
        }
      });

      // Adiciona data de geração
      pdf.setFontSize(10);
      pdf.text(`Relatório gerado em: ${new Date().toLocaleString()}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });

      // Salva o PDF
      pdf.save('relatorio-entorpecentes.pdf');
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Erro ao gerar o PDF. Por favor, tente novamente.');
    } finally {
      setGerando(false);
    }
  };

  // Configurações dos gráficos
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        color: 'white',
        font: {
          size: 12
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Cronologia de Registros',
        color: 'white',
        font: {
          size: 12
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const barVerticalOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Distribuição por Procedimento',
        color: 'white',
        font: {
          size: 12
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen font-mono p-4 bg-c_deep_black text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen font-mono p-4 bg-c_deep_black text-white">
        <h1 className="text-xl font-bold mb-4">Erro ao carregar estatísticas</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Estatísticas de Entorpecentes</h2>
        <button 
          onClick={gerarPDF} 
          disabled={gerando}
          className="flex text-xs items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-26 h-6 py-1 px-2 rounded-md transition-colors"
        >
          <FaFilePdf />
          {gerando ? 'Gerando PDF...' : 'Gerar Relatório PDF'}
        </button>
      </div>
      
      <div ref={estatisticasRef} className="space-y-6">
        <div className="flex flex-wrap gap-6">
          {/* Container da primeira linha - Card principal e Status */}
          <div className="flex flex-wrap w-full gap-6 mb-6">
            {/* Card principal - Ocupa 45% da largura */}
            <div className="flex-1 min-w-[45%] h-[300px] bg-c_deep_middle_black rounded-lg shadow-lg p-4 border border-gray-700">
              <div className="flex flex-col h-full justify-center items-center">
                <h2 className="text-xl font-semibold mb-2">Entorpecentes Apreendidos</h2>
                <div className="text-5xl font-bold text-blue-400 mb-2">{totalApreendidosCount}</div>
                <p className="text-sm text-center text-gray-400">Total de entorpecentes com status "apreendido"</p>
              </div>
            </div>

            {/* Gráfico de Pizza - Status - Ocupa 45% da largura */}
            <div className="flex-1 min-w-[45%] h-[300px] bg-c_deep_middle_black rounded-lg shadow-lg p-4 border border-gray-700">
              {statusData.labels.length > 0 && (
                <div className="h-full">
                  <Pie
                    data={{
                      labels: statusData.labels,
                      datasets: [
                        {
                          data: statusData.data,
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      ...pieOptions,
                      plugins: {
                        ...pieOptions.plugins,
                        title: {
                          ...pieOptions.plugins.title,
                          text: 'Distribuição por Status'
                        }
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Container da segunda linha - Tipos e Destinos */}
          <div className="flex flex-wrap w-full gap-6 mb-6">
            {/* Gráfico de Pizza - Tipos */}
            <div className="flex-1 min-w-[45%] h-[300px] bg-c_deep_middle_black rounded-lg shadow-lg p-4 border border-gray-700">
              {tiposData.labels.length > 0 && (
                <div className="h-full">
                  <Pie
                    data={{
                      labels: tiposData.labels,
                      datasets: [
                        {
                          data: tiposData.data,
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(199, 199, 199, 0.7)',
                            'rgba(83, 102, 255, 0.7)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                            'rgba(83, 102, 255, 1)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      ...pieOptions,
                      plugins: {
                        ...pieOptions.plugins,
                        title: {
                          ...pieOptions.plugins.title,
                          text: 'Distribuição por Tipo'
                        }
                      }
                    }}
                  />
                </div>
              )}
            </div>

            {/* Gráfico de Pizza - Destinos */}
            <div className="flex-1 min-w-[45%] h-[300px] bg-c_deep_middle_black rounded-lg shadow-lg p-4 border border-gray-700">
              {destinosData.labels.length > 0 && (
                <div className="h-full">
                  <Pie
                    data={{
                      labels: destinosData.labels,
                      datasets: [
                        {
                          data: destinosData.data,
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      ...pieOptions,
                      plugins: {
                        ...pieOptions.plugins,
                        title: {
                          ...pieOptions.plugins.title,
                          text: 'Distribuição por Destino'
                        }
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Container da terceira linha - Cronologia e Procedimentos */}
          <div className="flex flex-wrap w-full gap-6">
            {/* Gráfico de Linha - Cronologia */}
            <div className="flex-1 min-w-[45%] h-[300px] bg-c_deep_middle_black rounded-lg shadow-lg p-4 border border-gray-700">
              {cronologiaData.labels.length > 0 && (
                <div className="h-full">
                  <Line
                    data={{
                      labels: cronologiaData.labels,
                      datasets: [
                        {
                          label: 'Registros',
                          data: cronologiaData.data,
                          borderColor: 'rgba(75, 192, 192, 1)',
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          tension: 0.1,
                          fill: true,
                        },
                      ],
                    }}
                    options={lineOptions}
                  />
                </div>
              )}
            </div>

            {/* Gráfico de Barras - Procedimentos */}
            <div className="flex-1 min-w-[45%] h-[300px] bg-c_deep_middle_black rounded-lg shadow-lg p-4 border border-gray-700">
              {procedimentosData.labels.length > 0 && (
                <div className="h-full">
                  <Bar
                    data={{
                      labels: procedimentosData.labels,
                      datasets: [
                        {
                          data: procedimentosData.data,
                          backgroundColor: 'rgba(54, 162, 235, 0.7)',
                          borderColor: 'rgba(54, 162, 235, 1)',
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={barVerticalOptions}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 