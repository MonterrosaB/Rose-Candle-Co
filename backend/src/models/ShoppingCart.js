/* 
    Colección para carrito de compras

    Campos:
        idUser       -> Referencia al usuario propietario del carrito
        products     -> Lista de productos agregados al carrito
        total        -> Total acumulado del carrito
        deleted      -> Campo para eliminación lógica
*/

import { Schema, model } from "mongoose";

// Subesquema: Productos usados en el carrito
const productSchema = new Schema({
  idProduct: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Products"
  },
  quantity: {
    type: Number,
    default: 1,
    required: true
  },
  selectedVariantIndex: {
    type: Number,
    default: 0,
    required: true
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

//Esquema: Carrito de productos
const shoppingCartSchema = new Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      required: true, // El carrito debe pertenecer a un usuario
      ref: "Customers", // Referencia al modelo Customers (usuarios/clientes)
      trim: true, // Elimina espacios en strings, aunque aquí no es tan crítico
    },
    products: [productSchema],
    total: {
      type: Number,
      required: true, // Total debe estar definido (aunque sea 0)
      min: 0, // No puede ser negativo
      trim: true, // No afecta números, pero mantiene consistencia
    },
    status: {
      type: String,
      required: true, // Total debe estar definido (aunque sea 0)
      enum: ["active", "completed"],
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    strict: false, // Permite campos adicionales no definidos en el esquema
  }
);

// Exporto el modelo para poder usarlo en otras partes de la app
export default model("shoppingCart", shoppingCartSchema);
