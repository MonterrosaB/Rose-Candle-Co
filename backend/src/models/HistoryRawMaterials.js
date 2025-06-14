/*
    Coleccion para historial de precios de la materia prima
    
    Campos:
        price
        idRawMateria
*/

import { Schema, model } from "mongoose"

const historyRawMaterialSchema = new Schema({
    price: {
        type: Number,
        required: true,
        min: 0,
        match: [/^(0|[1-9]\d*)(\.\d+)?$/, 'Número no válido'],
        trim: true
    },
    idRawMateria: {
        type: Schema.Types.ObjectId,
        ref: "RawMaterials", //Modelo de Materia prima
        required: true,
        trim: true
    },
}, {
    timestamps: true,
    strict: false
});

// Exporto
export default model("HitoryRawMaterials", historyRawMaterialSchema)