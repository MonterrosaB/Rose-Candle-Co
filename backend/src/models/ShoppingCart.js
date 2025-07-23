/* 
    Colección para carrito de compras

    Campos:
        idUser       -> Referencia al usuario propietario del carrito
        products     -> Lista de productos agregados al carrito
        total        -> Total acumulado del carrito
*/

import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      required: true, // El carrito debe pertenecer a un usuario
      ref: "Customers", // Referencia al modelo Customers (usuarios/clientes)
      trim: true, // Elimina espacios en strings, aunque aquí no es tan crítico
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products", // Referencia al modelo Products
        required: true, // Cada producto en el arreglo es obligatorio
      },
    ],
    total: {
      type: Number,
      required: true, // Total debe estar definido (aunque sea 0)
      min: 0, // No puede ser negativo
      trim: true, // No afecta números, pero mantiene consistencia
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    strict: false, // Permite campos adicionales no definidos en el esquema
  }
);

// Exporto el modelo para poder usarlo en otras partes de la app
export default model("shoppingCart", shoppingCartSchema);
