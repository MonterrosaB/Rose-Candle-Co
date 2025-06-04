import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "customers"
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true
    }],
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: false, 
});

export default model("shoppingCart", shoppingCartSchema);
