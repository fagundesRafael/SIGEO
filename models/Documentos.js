// models/Documentos.js
import mongoose from "mongoose";

const DocumentosSchema = new mongoose.Schema({
  classe: { type: String },
  procedimento: { type: String, required: true },
  numero: { type: String, required: true },
  // Não há marca nem modelo
  tipo: {
    type: String,
    enum: ["RG", "CNH", "Procuração", "Cert. de Nascimento", "Cert. de Casamento", "Outro"],
    required: true,
  },
  customTipo: { type: String },
  quantidade: { type: Number, default: 1 },
  unidMedida: { type: String, default: "unid", enum: ["unid", "ml", "l"] },
  cor: { type: String },
  status: { type: String, enum: ["apreendido", "restituído", "incinerado", "outros"] },
  destino: { type: String, enum: ["cartório", "depósito", "outros"] },
  secao: { type: String },
  prateleira: { type: String },
  obs: { type: String, maxlength: 380 },
  data: { type: Date, default: Date.now },
  imagem: { type: String },
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
}, { timestamps: true, collection: "documentos" });

export default mongoose.models.Documentos || mongoose.model("Documentos", DocumentosSchema);
