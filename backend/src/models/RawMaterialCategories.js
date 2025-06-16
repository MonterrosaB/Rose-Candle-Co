import { Schema, model } from "mongoose"

const rawMaterialCategoriesSchema = new Schema({
    
    name: {
        type: String,
        require: true,
        minLength: 3,
        trim: true
}

}, {
    timestamps: true,
    strict: false
});

// Exporto
export default model("rawMaterialCategories", rawMaterialCategoriesSchema)  