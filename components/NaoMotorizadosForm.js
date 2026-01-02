// components/NaoMotorizadosForm.js
"use client";

import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import LoadingImage from "./LoadingImage";

// Constantes fixas para os campos
const PROCEDIMENTO_OPTIONS = ["IPL", "BO", "TCO", "AIAI/AAI", "OUTROS"];
const STATUS_OPTIONS = ["apreendido", "restituído", "incinerado", "outros"];
const DESTINO_OPTIONS = ["pátio", "outros"];
const CORES = [
  "Nenhuma",
  "Vermelho",
  "Azul",
  "Verde",
  "Amarelo",
  "Preto",
  "Prata",
  "Branco",
  "Cinza",
  "Roxo",
  "Marrom",
  "Laranja",
  "Outro",
];

// Mapeamento para acessar as configurações de veículos não motorizados.
// Suponha dois tipos: "bicicleta" e "outronaomotorizado".
const TYPE_MAPPING = {
  bicicleta: "bicicletas",
  outronaomotorizado: "outronaomotorizado",
};

export default function NaoMotorizadosForm({ initialData = {}, onSubmit, isUpdating = false, title }) {
  const [formData, setFormData] = useState({
    procedimento: "",
    numero: "",
    tipo: "",
    customTipo: "",
    marca: "",
    modelo: "",
    cor: "",
    status: "",
    destino: "",
    obs: "",
    dataField: "",
    imagem: "",
  });

  const [loadingImage, setLoadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Estado para as configurações (usado para alimentar os selects de marca/modelo)
  const [configs, setConfigs] = useState(null);
  useEffect(() => {
    async function fetchConfigs() {
      try {
        const res = await fetch("/api/configs");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setConfigs(data[0]);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar configs:", error);
      }
    }
    fetchConfigs();
  }, []);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    onSubmit(formData);
  };

  // Obter opções dinâmicas de marca/modelo com base no tipo selecionado
  const configKey = TYPE_MAPPING[formData.tipo];
  const availableMarcas =
    configs && configKey ? (configs[configKey] || []).map((item) => item.marca) || [] : [];
  const availableModelos =
    configs && formData.marca && configKey
      ? (configs[configKey] || []).find((item) => item.marca === formData.marca)?.modelos || []
      : [];

  return (
    <div className="min-h-screen text-white bg-c_deep_black p-1 rounded-md border border-gray-500 shadow font-mono">
      <h1 className="font-bold mt-2 mx-4">{title}</h1>
      {errorMsg && <p className="text-red-500 ml-4 mb-4">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className="flex justify-between p-4 text-xs">
        {/* Coluna Esquerda – Campos principais */}
        <div className="flex flex-col gap-4 w-[45%]">
          <div className="flex gap-4">
            <div>
              <label className="block font-medium">Procedimento:</label>
              <select
                name="procedimento"
                required
                value={formData.procedimento}
                onChange={handleInputChange}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              >
                <option value="">Selecione o procedimento</option>
                {PROCEDIMENTO_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Número / ano:</label>
              <input
                name="numero"
                required
                type="text"
                value={formData.numero}
                onChange={handleInputChange}
                className="bg-c_deep_gray_black p-1 rounded w-[300px]"
                placeholder="Apenas números e caracteres específicos"
              />
            </div>
          </div>
          {/* Tipo – com opção de customização para "outronaomotorizado" */}
          <div>
            <label className="block font-medium">Tipo:</label>
            <div className="flex flex-wrap gap-4 bg-c_deep_gray_black p-2 rounded-md">
              {Object.keys(TYPE_MAPPING).map((key) => (
                <label key={key} className="cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value={key}
                    checked={formData.tipo === key}
                    onChange={() => {
                      handleChange("tipo", key);
                      handleChange("customTipo", "");
                    }}
                    className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                  />{" "}
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
            </div>
          </div>
          {formData.tipo === "outronaomotorizado" && (
            <div className="mt-2">
              <label className="block font-medium">Especifique o tipo:</label>
              <input
                name="customTipo"
                type="text"
                value={formData.customTipo}
                onChange={handleInputChange}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
                placeholder="Informe o tipo do veículo"
              />
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block font-medium">Marca:</label>
              <select
                name="marca"
                required
                value={formData.marca}
                onChange={handleInputChange}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              >
                <option value="">{configs ? "Selecione a marca" : "Carregando..."}</option>
                {availableMarcas.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Modelo:</label>
              <select
                name="modelo"
                required
                value={formData.modelo}
                onChange={handleInputChange}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              >
                <option value="">{configs ? "Selecione o modelo" : "Carregando..."}</option>
                {availableModelos.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Cor:</label>
              <select
                name="cor"
                required
                value={formData.cor}
                onChange={handleInputChange}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              >
                <option value="">Selecione a cor</option>
                {CORES.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block font-medium">Data do registro:</label>
              <input
                name="dataField"
                type="date"
                value={formData.dataField}
                onChange={handleInputChange}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Status:</label>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <label key={opt} className="cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={opt}
                    checked={formData.status === opt}
                    onChange={handleInputChange}
                    className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
                    required
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          </div>
          {formData.status === "apreendido" && (
            <div>
              <label className="block font-medium">Destino:</label>
              <div className="flex gap-2">
                {DESTINO_OPTIONS.map((opt) => (
                  <label key={opt} className="cursor-pointer">
                    <input
                      type="radio"
                      name="destino"
                      value={opt}
                      checked={formData.destino === opt}
                      onChange={handleInputChange}
                      className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
                      required
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          )}
          <div>
            <label className="block font-medium">Observações:</label>
            <textarea
              name="obs"
              maxLength={380}
              rows={10}
              value={formData.obs}
              onChange={handleInputChange}
              className="bg-c_deep_gray_black p-2 rounded w-full"
            />
          </div>
        </div>
        {/* Coluna Direita: Upload de Imagem */}
        <div className="flex flex-col gap-4 w-[45%]">
          <div>
            <label className="block mb-1 text-slate-200 font-medium">
              Imagem (.png, .jpg, .tiff):
            </label>
            <ImageUpload
              onUpload={(url) => handleChange("imagem", url)}
              setLoading={setLoadingImage}
              uploaded={!!formData.imagem}
            />
            {loadingImage && <LoadingImage />}
            {formData.imagem ? (
              <img
                src={formData.imagem}
                alt="Imagem do registro"
                className="w-96 h-96 mt-3 object-cover"
              />
            ) : (
              <img
                src="/no-image.jpg"
                alt="Sem imagem"
                className="w-96 h-96 mt-3 opacity-10 object-cover"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-blue-600 transition"
          >
            {isUpdating ? "Atualizar Veículo" : "Registrar Veículo"}
          </button>
        </div>
      </form>
    </div>
  );
}
