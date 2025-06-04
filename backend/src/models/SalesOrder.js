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
        ref: "ShoppingCart"
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["credit card", "paypal", "cash", "bank transfer"] 
    },
    adress: {
        type: String,
        required: true
    },
    saleDate: {
        type: Date,
        required: true
    },
    shippingTotal: {
        type: Number,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
    shippingState: {
        type: [shippingStateSchema],
        default: []
    }
}, {
    timestamps: false,
    strict: true
});

export default model("SalesOrder", SalesOrderSchema);
