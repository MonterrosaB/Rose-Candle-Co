/*
    Colección de configuraciones del sitio (Settings)

    Campos:
        marquee - Texto que se muestra en el banner superior
        banner - Objeto con imagen
        email - Objeto con asunto y cuerpo del correo
*/

import { Schema, model } from "mongoose";

const settingsSchema = new Schema(
  {
    // Texto del marquee
    marquee: {
      type: String,
      required: true,
      trim: true,
      default: "¡Disfruta nuestras velas de temporada!"
    },

    // Banner principal
    banner: {
      imageUrl: {
        type: String,
        trim: true,
      }
    },

    // Configuración de correos
    email: {
      subject: {
        type: String,
        trim: true,
      },
      body: {
        type: String,
        trim: true,
      }
    },
  },
  {
    timestamps: true,
    strict: false // permite campos adicionales
  }
);

// Exportar modelo
export default model("Settings", settingsSchema);
