/* 
    Colección para colecciones de productos

    Campos:
        name
*/

import { Schema, model } from "mongoose";

const collectionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    }
}, {
  timestamps: true,
  strict: false
});

// Exporto
export default model("Collections", collectionSchema);