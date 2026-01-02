// components/EntorpecentesForm.js
"use client";

import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import LoadingImage from "./LoadingImage";

// Constantes fixas
const PROCEDIMENTO_OPTIONS = ["IPL", "BO", "TCO", "AIAI/AAI", "OUTROS"];
const STATUS_OPTIONS = ["apreendido", "restituído", "incinerado", "outros"];
const DESTINO_OPTIONS = ["cartório", "depósito", "outros"];
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

// Opções para o campo tipo
const TIPO_OPTIONS = ["Cocaína", "Crack", "Maconha", "Outro"];

export default function EntorpecentesForm({ initialData = {}, onSubmit, isUpdating = false, title }) {
  const [formData, setFormData] = useState({
    procedimento: "",
    numero: "",
    tipo: "",
    customTipo: "",
    quantidade: "",
    unidMedida: "",
    cor: "",
    status: "",
    destino: "",
    secao: "",
    prateleira: "",
    obs: "",
    dataField: "",
    imagem: "",
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  return (
    <div className="min-h-screen text-white bg-c_deep_black p-1 rounded-md border border-gray-500 shadow font-mono">
      <h1 className="font-bold mt-2 mx-4">{title}</h1>
      {errorMsg && <p className="text-red-500 ml-4 mb-4">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className="flex justify-between p-4 text-xs">
        {/* Coluna Esquerda – Campos principais */}
        <div className="flex flex-col gap-4 w-[45%]">
          {/* Procedimento e Número */}
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
                  <option key={opt} value={opt}>{opt}</option>
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
          {/* Tipo – Radio para Entorpecentes */}
          <div>
            <label className="block font-medium">Tipo:</label>
            <div className="flex gap-4 bg-c_deep_gray_black p-2 rounded-md">
              {TIPO_OPTIONS.map((opt) => (
                <label key={opt} className="cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value={opt}
                    checked={formData.tipo === opt}
                    onChange={() => {
                      handleChange("tipo", opt);
                      handleChange("customTipo", "");
                    }}
                    className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                  /> {opt}
                </label>
              ))}
            </div>
          </div>
          {formData.tipo === "Outro" && (
            <div className="mt-2">
              <label className="block font-medium">Especifique o tipo:</label>
              <input
                name="customTipo"
                type="text"
                value={formData.customTipo}
                onChange={handleInputChange}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
                placeholder="Informe o tipo"
              />
            </div>
          )}
          {/* Quantidade, UnidMedida e Cor */}
          <div className="flex flex-wrap justify-between">
            <div>
              <label className="block font-medium">Quantidade:</label>
              <input
                name="quantidade"
                type="number"
                required
                value={formData.quantidade}
                onChange={handleInputChange}
                placeholder="Informe quantidade"
                className="bg-c_deep_gray_black p-1 w-28 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Unid. de Medida:</label>
              <select
                name="unidMedida"
                required
                value={formData.unidMedida}
                onChange={handleInputChange}
                className="bg-c_deep_gray_black p-1 rounded"
              >
                <option value="">Selecione a unidade de medida</option>
                <option value="unid">unidade(s)</option>
                <option value="mm">milímetro(s)</option>
                <option value="cm">centímetro(s)</option>
                <option value="mt">metro(s)</option>
                <option value="mlgr">miligrama(s)</option>
                <option value="gr">grama(s)</option>
                <option value="kg">kilo(s)</option>
                <option value="porcao">porção(oes)</option>
                <option value="caixa">caixa(s)</option>
                <option value="pacote">pacote(s)</option>
                <option value="resma">resma(s)</option>
                <option value="outro">outro(s)</option>
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
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Data */}
          <div className="flex flex-wrap justify-between">
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
          {/* Status e Destino */}
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
                    className="w-2.5 h-2.5 border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
                    required
                  /> {opt}
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
                      className="w-2.5 h-2.5 border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
                      required
                    /> {opt}
                  </label>
                ))}
              </div>
              {formData.destino === "depósito" && (
                <div className="flex gap-4 mt-2">
                  <input
                    name="secao"
                    type="text"
                    placeholder="Seção"
                    value={formData.secao}
                    onChange={handleInputChange}
                    className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
                  />
                  <input
                    name="prateleira"
                    type="text"
                    placeholder="Prateleira"
                    value={formData.prateleira}
                    onChange={handleInputChange}
                    className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
                  />
                </div>
              )}
            </div>
          )}
          {/* Observações */}
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
        {/* Coluna Direita – Upload de Imagem */}
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
              <img src={formData.imagem} alt="Imagem do registro" className="w-96 h-96 mt-3 object-cover" />
            ) : (
              <img src="/no-image.jpg" alt="Sem imagem" className="w-96 h-96 mt-3 opacity-10 object-cover" />
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-blue-600 transition">
            {isUpdating ? "Atualizar Outro Objeto" : "Registrar Outro Objeto"}
          </button>
        </div>
      </form>
    </div>
  );
}
