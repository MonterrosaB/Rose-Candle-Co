/* 
    Colección para correos suscritos al boletín

    Campos:
        email - Correo electrónico del suscriptor, único y obligatorio
        active - Estado de la suscripción (activo/inactivo)
*/

import { Schema, model } from "mongoose"; // Importar Schema y model de mongoose para definir el esquema y modelo

// Definición del esquema para la colección "Subscribers"
const subscriberSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        active: { type: Boolean, default: true } // por si suspende la suscripción
    },
    {
        timestamps: true,
        strict: false
    }
);

// Exportar el modelo
export default model("Subscribers", subscriberSchema);
