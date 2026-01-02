// lib/dbConnect.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Por favor, defina a variável de ambiente MONGODB_URI no arquivo .env.local"
  );
}

/**
 * Conecta ao MongoDB utilizando mongoose.
 */
export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return; // já está conectado
  return mongoose.connect(MONGODB_URI);
}