/* 
    Colección para orden

    Campos:
        idShoppingCart
        paymentMethod
        address
        saleDate
        shippingTotal
        total
        shippingState
*/

import { Schema, model } from "mongoose";

const shippingStateSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
}, { _id: false });

const SalesOrderSchema = new Schema({
    idShoppingCart: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "ShoppingCart", // Modelo de ShoppingCart
        trim: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["credit card", "paypal", "cash", "bank transfer"] 
    },
    address: {
        type: String,
        required: true,
        minLength: 5,
        trim: true
    },
    saleDate: {
        type: Date,
        required: true,
        trim: true
    },
    shippingTotal: {
        type: Number,
        required: true,
        trim: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    shippingState: {
        type: [shippingStateSchema],
        default: []
    }
}, {
    timestamps: true,
    strict: false
});

export default model("SalesOrder", SalesOrderSchema);