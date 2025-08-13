/* 
    Colección para orden de venta (SalesOrder)

    Campos:
        idShoppingCart    -> Referencia al carrito de compras asociado
        paymentMethod     -> Método de pago utilizado
        address           -> Dirección de envío
        saleDate          -> Fecha en que se realizó la venta
        shippingTotal     -> Costo total del envío
        total             -> Total de la orden (productos + envío)
        shippingState     -> Historial de estados del envío con fechas
        deleted           -> Campo para eliminación lógica
*/

import { Schema, model } from "mongoose";

// Subesquema para estados del envío con fecha asociada
const shippingStateSchema = new Schema(
  {
    state: {
      type: String,
      required: true, // Estado del envío obligatorio (ej. "enviado", "entregado")
    },
    date: {
      type: Date,
      required: true, // Fecha en que se registró este estado
    },
  },
  { _id: false }
); // No crea _id para subdocumento

const SalesOrderSchema = new Schema(
  {
    idShoppingCart: {
      type: Schema.Types.ObjectId,
      required: true, // Debe referenciar un carrito de compras existente
      ref: "shoppingCart", // Nombre del modelo referenciado
      trim: true, // Elimina espacios en cadena
    },
    paymentMethod: {
      type: String,
      required: true, // Método de pago obligatorio
      enum: ["credit card", "paypal", "cash", "bank transfer"], // Métodos permitidos
    },
    address: {
      type: String,
      required: true, // Dirección de envío obligatoria
      minLength: 5, // Longitud mínima para evitar datos inválidos
      trim: true,
    },
    saleDate: {
      type: Date,
      required: true, // Fecha de la venta obligatoria
      trim: true, // (No afecta fechas, pero por consistencia)
      default: Date.now,
    },
    shippingTotal: {
      type: Number,
      required: true, // Costo de envío obligatorio
      trim: true,
    },
    total: {
      type: Number,
      required: true, // Total de la orden obligatorio
      min: 0, // No puede ser negativo
    },
    shippingState: {
      type: [shippingStateSchema], // Array de estados del envío
      default: [], // Por defecto, ningún estado registrado inicialmente
    },
  },
  {
    timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
    strict: false, // Permite campos adicionales no definidos en el esquema
  }
);

// Exporto el modelo para su uso en la aplicación
export default model("SalesOrder", SalesOrderSchema);
