import { Schema, model, Types } from "mongoose";

// Subesquema para la colección de temporada
const seasonalCollectionSchema = new Schema({
  idCollection: {
    type: Types.ObjectId,
    ref: "Collections",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
  },
});

// Subesquema para productos recomendados
const recommendedProductSchema = new Schema(
  {
    idProduct: {
      type: Types.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  { _id: false }
);

const settingsSchema = new Schema(
  {
    // Marquee principal
    marquee: {
      name: {
        type: String,
        required: true,
        trim: true,
        default: "¡Disfruta nuestras velas de temporada!",
      },
    },
    // Banner principal
    banner: {
      imageUrl: {
        type: String,
        trim: true,
      },
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
      },
    },
    // Colección de temporada
    seasonalCollection: seasonalCollectionSchema,
    
    // Sección de inspiración
    inspiration: {
      phrase: {
        type: String,
        trim: true,
        maxLength: 300,
      },
      description: {
        type: String,
        trim: true,
        maxLength: 1000,
      },
    },
    
    // Productos recomendados
    recommendedProducts: {
      name: {
        type: String,
        trim: true,
        default: "Productos recomendados",
        maxLength: 100,
      },
      description: {
        type: String,
        trim: true,
        maxLength: 500,
      },
      products: {
        type: [recommendedProductSchema],
        validate: {
          validator: (arr) => arr.length >= 0 && arr.length <= 4,
          message: "Debes proporcionar entre 0 y 4 productos recomendados",
        },
        default: [],
      },
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Settings", settingsSchema);