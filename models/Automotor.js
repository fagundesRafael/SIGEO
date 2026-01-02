// models/Automotor.js
import mongoose from "mongoose";

const AutomotorSchema = new mongoose.Schema(
  {
    classe: { type: String },
    procedimento: { type: String, required: true },
    numero: { type: String, required: true },
    quantidade: { type: Number },
    unidMedida: { type: String },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    placa: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      set: (v) => (v && v.trim() !== "" ? v.trim().toUpperCase() : undefined),
    },
    chassi: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      set: (v) => (v && v.trim() !== "" ? v.trim().toUpperCase() : undefined),
    },
    tipo: { 
      type: String, 
      enum: ["carro", "moto", "caminhonete", "caminhao", "trator", "outrosautomotores"], 
      required: true 
    },
    // Novo campo para armazenar o valor customizado caso "outrosautomotores" seja selecionado
    customTipo: { type: String },
    cor: { type: String, required: false },
    chaves: { type: Boolean, default: false },
    status: {
      type: String,
      required: true,
      enum: ["apreendido", "restituído", "incinerado", "outros"],
    },
    destino: {
      type: String,
      enum: ["pátio", "outros"],
      default: undefined,
    },
    createdBy: { type: String, required: true },
    updatedBy: { type: String },
    obs: { type: String, maxlength: 80 },
    data: { type: Date, default: Date.now },
    imagem: { type: String },
  },
  { timestamps: true, collection: "automotores" }
);

export default mongoose.models.Automotor ||
  mongoose.model("Automotor", AutomotorSchema);
