/*
    fields for products
    
    Campos:
        name              - Nombre del producto
        description       - Descripción detallada del producto
        images            - URLs de imágenes del producto
        components        - Componentes o materias primas que conforman el producto
        recipe            - Pasos para la elaboración o receta
        variant           - Variantes del producto (ej. tamaños, sabores)
        availability      - Disponibilidad del producto (true = disponible)
        useForm           - Instrucciones de uso
        idProductCategory - Referencia a la categoría del producto
        idCollection      - Referencia a la colección a la que pertenece el producto
*/

import { Schema, model } from "mongoose";

// Subesquema: Componentes del producto, vinculados a materias primas
const componentSchema = new Schema(
  {
    idComponent: {
      type: Schema.Types.ObjectId,
      ref: "RawMaterial", // Referencia al modelo de materias primas
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1, // Mínimo 1 unidad de la materia prima
      max: 100, // Máximo 100 unidades por componente
      trim: true, // Limpia espacios, aunque no afecta números
    },
  },
  { _id: false } // No se genera un _id para cada componente
);

// Subesquema: Pasos de la receta para la elaboración del producto
const recipeSchema = new Schema(
  {
    step: {
      type: String,
      required: true,
      minLength: 3, // Paso con descripción mínima de 3 caracteres
      maxLength: 200, // Máximo 200 caracteres por paso
      trim: true,
    },
  },
  { _id: false } // No se genera _id para cada paso
);

// Subesquema: Variantes del producto (ej. tamaño, sabor)
const variantSchema = new Schema(
  {
    variant: {
      type: String,
      required: true,
      minLength: 1, // Nombre mínimo de 1 carácter
      maxLength: 200, // Máximo 200 caracteres para la variante
    },
    variantPrice: {
      type: Number,
      required: true,
      min: 1, // Precio mínimo 1
      max: 100, // Precio máximo 100 (ajustable según necesidad)
    },
  },
  { _id: false } // No genera _id para cada variante
);

// Subesquema: Instrucciones de uso del producto
const useFormSchema = new Schema(
  {
    instruction: {
      type: String,
      required: true,
      minLength: 3, // Instrucción mínima de 3 caracteres
      maxLength: 200, // Máximo 200 caracteres por instrucción
      trim: true,
    },
  },
  { _id: false } // No genera _id para cada instrucción
);

// Esquema principal: Productos
const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios",
      ],
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/,
        "La descripción solo puede contener letras, espacios y signos de puntuación básicos",
      ],
      minLength: 3,
      maxLength: 1000,
      trim: true,
    },
    images: {
      type: [String], // Array de URLs o paths de imágenes
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length >= 1 && arr.length <= 8; // Entre 1 y 8 imágenes
        },
        message: "Debes subir entre 1 y 8 imágenes",
      },
    },
    components: {
      type: [componentSchema], // Array de componentes (materias primas)
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100, // Entre 1 y 100 componentes
        message: "Debes proporcionar entre 1 y 100 componentes",
      },
    },
    recipe: {
      type: [recipeSchema], // Array de pasos de receta
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100, // Entre 1 y 100 pasos
        message: "Debes proporcionar entre 1 y 100 pasos de receta",
      },
    },
    variant: {
      type: [variantSchema], // Array de variantes del producto
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 10, // Entre 1 y 10 variantes (corregí de 100 a 10)
        message: "Debes proporcionar entre 1 y 10 variantes del producto",
      },
    },
    availability: {
      type: Boolean, // Disponibilidad del producto (true = disponible)
      required: true,
    },
    useForm: {
      type: [useFormSchema], // Array de instrucciones de uso
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100, // Entre 1 y 100 instrucciones
        message: "Debes proporcionar entre 1 y 100 instrucciones de uso",
      },
    },
    idProductCategory: {
      type: Schema.Types.ObjectId,
      ref: "productCategories", // Referencia a la categoría del producto
      required: true,
    },
    idCollection: {
      type: Schema.Types.ObjectId,
      ref: "Collections", // Referencia a la colección del producto
      required: true,
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
    strict: false, // Permite campos adicionales no definidos en el esquema
  }
);

// Exporto el modelo para usar en otras partes de la aplicación
export default model("Products", productsSchema);
