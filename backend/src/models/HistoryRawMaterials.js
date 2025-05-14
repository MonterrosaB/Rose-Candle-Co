/*
    Campos:
        price
        idRawMateria
*/

import { Schema, model } from "mongoose"

const historyRawMaterialSchema = new Schema({
    price: {
        type: Number,
        require: true,
        min: 0,
        match: [/^(0|[1-9]\d*)(\.\d+)?$/, 'Número no válido']
    },
    idRawMateria: {
        type: Schema.Types.ObjectId,
        ref: "RawMaterials", //Modelo de Materia prima
        require: true
    },
}, {
    timestamps: true,
    strict: false
});

// Exporto
export default model("HitoryRawMaterials", historyRawMaterialSchema)