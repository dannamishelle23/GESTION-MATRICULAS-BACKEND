import {Schema, model} from 'mongoose';


const matriculaSchema = new Schema(
  {
    codigoMatricula: { type: String, required: true, unique: true },
    descripcion: { type: String, trim: true },
    estudianteID: { type: Schema.Types.ObjectId, ref: "Estudiantes", required: true },
    materiaID: { type: Schema.Types.ObjectId, ref: "Materia", required: true },
    fechaMatricula: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model("Matricula", matriculaSchema);