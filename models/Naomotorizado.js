// models/Naomotorizado.js
import mongoose from "mongoose";

const NaomotorizadoSchema = new mongoose.Schema(
  {
    classe: { type: String },
    procedimento: { type: String, required: true },
    numero: { type: String, required: true },
    quantidade: { type: Number },
    unidMedida: { type: String },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    tipo: { 
      type: String, 
      enum: ["bicicleta", "outronaomotorizado"], 
      required: true 
    },
    // Novo campo para armazenar o valor customizado caso "outrosnaomotorizados" seja selecionado
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
  { timestamps: true, collection: "naomotorizados" }
);

export default mongoose.models.Naomotorizado ||
  mongoose.model("Naomotorizado", NaomotorizadoSchema);
