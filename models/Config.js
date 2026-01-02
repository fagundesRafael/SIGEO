// models/Config.js
import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema({
  carros: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  motos: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  caminhonetes: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  caminhoes: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  tratores: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  outrosautomotores: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  bicicletas: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  outronaomotorizado: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  // Novas categorias para eletroeletrônicos:
  geladeiras: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  fogoes: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  computadores: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  notebooks: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  televisores: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  outroeletroeletronicos: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  armas: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
        calibres: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  municoes: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
        calibres: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  outrosbelicos: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
        calibres: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  entorpecentes: {
    type: [String],
    default: [],
  },
  eletro: {
    type: [String],
    default: [],
  },
  outrosobjetos: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
