import { Schema, model } from "mongoose";

const materiaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  codigo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  creditos: {
    type: Number,
    required: true,
  },
  fechaEliminacionMateria: {
    type: Date,
    default: null,
  },
  estadoMateria: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

export default model("Materia", materiaSchema);