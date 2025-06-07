/*
    Colección para historial de precios de un producto
    
    Campos:
        idProduct
        reason
        amountSold
*/

import { Schema, model } from "mongoose"

const productPriceHistorySchema = new Schema({
    idProduct: {
        type: Schema.Types.ObjectId,
        ref: "Products", //Modelo de Productos
        require: true,
        trim: true
    },
    reason: {
        type: String,
        require: true,
        minLength: 5,
        trim: true
    },
    amountSold: {
        type: Number,
        require: true,
        min: 0,
        match: [/^(0|[1-9]\d*)(\.\d+)?$/, 'Número no válido'],
        trim: true
    },
}, {
    timestamps: true,
    strict: false
});

// Exporto
export default model("ProductPriceHistory", productPriceHistorySchema)