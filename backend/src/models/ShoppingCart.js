/* 
    Colección para carrito de compras

    Campos:
        idUser
        creationDate
        products
        total
*/

import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Customers", // Modelo de Customers
        trim: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Products", // Modelo de Products
        required: true
    }],
    total: {
        type: Number,
        required: true,
        min: 0,
        trim: true
    }
}, {
    timestamps: false,
    strict: false 
});

export default model("shoppingCart", shoppingCartSchema);
