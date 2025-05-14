/*
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
        require: true
    },
    reason: {
        type: String,
        require: true
    },
    amountSold: {
        type: Number,
        require: true,
        min: 0,
        match: [/^(0|[1-9]\d*)(\.\d+)?$/, 'Número no válido']
    },
}, {
    timestamps: true,
    strict: false
});

// Exporto
export default model("ProductPriceHistory", productPriceHistorySchema)