import mongoose from "mongoose";

const HistoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  mascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mascota",
    required: true,
  },
  creado: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Historia", HistoriaSchema);