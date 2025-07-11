import { Schema, model } from "mongoose"

const suppliersSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
   contact: {
  type: String,
  required: true,
  match: [/^\d{4}-\d{4}$/, 'Número de contacto no válido (formato debe ser ####-####)'],
  trim: true
}

}, {
    timestamps: true,
    strict: false
});

// Exporto
export default model("Suppliers", suppliersSchema)