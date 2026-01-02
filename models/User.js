// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, default: false },
});

// Evita redefinição do modelo ao usar hot-reload no desenvolvimento
export default mongoose.models.User || mongoose.model("User", UserSchema);
