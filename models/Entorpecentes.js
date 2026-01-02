// models/Entorpecentes.js
import mongoose from "mongoose";

const EntorpecentesSchema = new mongoose.Schema({
  classe: { type: String },
  procedimento: { type: String, required: true },
  numero: { type: String, required: true },
  quantidade: { type: Number, required: true },
  unidMedida: { type: String, required: true },
  // Não há marca ou modelo para entorpecentes
  tipo: {
    type: String,
    enum: ["Cocaína", "Crack", "Maconha", "Outro"],
    required: true,
  },
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
  secao: { type: String },
  prateleira: { type: String },
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
  obs: { type: String, maxlength: 80 },
  data: { type: Date, default: Date.now },
  imagem: { type: String },
}, { timestamps: true, collection: "entorpecentes" });

export default mongoose.models.Entorpecentes || mongoose.model("Entorpecentes", EntorpecentesSchema);
