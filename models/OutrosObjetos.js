// models/OutrosObjetos.js
import mongoose from "mongoose";

const OutrosObjetosSchema = new mongoose.Schema({
  classe: { type: String },
  procedimento: { type: String, required: true },
  numero: { type: String, required: true },
  quantidade: { type: Number, required: true },
  unidMedida: { type: String, required: true },
  // Apenas a marca é registrada – não existe campo modelo
  marca: { type: String, required: true },
  tipo: {
    type: String,
    // O enum permite somente "Outro Objeto"
    enum: ["Outro Objeto"],
    required: true,
  },
  // customTipo conterá a informação digitada manualmente, se necessária
  customTipo: { type: String },
  cor: { type: String },
  status: {
    type: String,
    required: true,
    enum: ["apreendido", "restituído", "incinerado", "outros"],
  },
  destino: {
    type: String,
    enum: ["cartório", "depósito", "outros"],
    default: undefined,
  },
  // Caso o destino seja "depósito", estes campos devem ser preenchidos
  secao: { type: String },
  prateleira: { type: String },
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
  obs: { type: String, maxlength: 80 },
  data: { type: Date, default: Date.now },
  imagem: { type: String },
}, { timestamps: true, collection: "outrosobjetos" });

export default mongoose.models.OutrosObjetos || mongoose.model("OutrosObjetos", OutrosObjetosSchema);
