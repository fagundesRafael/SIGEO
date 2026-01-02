// models/EletroEletronicos.js
import mongoose from "mongoose";

const EletroEletronicosSchema = new mongoose.Schema({
  classe: { type: String },
  procedimento: { type: String, required: true },
  numero: { type: String, required: true },
  quantidade: { type: Number, required: true },
  unidMedida: { type: String, required: true },
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  tipo: { 
    type: String, 
    // Os tipos possíveis – se o usuário escolher "Outro EletroEletronico", deverá preencher customTipo e o valor será salvo como "Outro"
    enum: ["Computador", "Fogao", "Geladeira", "Notebook", "Televisor", "OutroEletroEletronico"],
    required: true 
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
  // Se o destino for depósito, os campos abaixo serão preenchidos
  secao: { type: String },
  prateleira: { type: String },
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
  obs: { type: String, maxlength: 80 },
  data: { type: Date, default: Date.now },
  imagem: { type: String },
}, { timestamps: true, collection: "eletroeletronicos" });

export default mongoose.models.EletroEletronicos || mongoose.model("EletroEletronicos", EletroEletronicosSchema);
