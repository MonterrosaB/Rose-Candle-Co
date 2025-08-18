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
        deleted           - Eliminación lógica (true = eliminado)
*/
import { Schema, model } from "mongoose";

// Subesquema: Componentes (materias primas) usados en el producto
const componentSchema = new Schema(
  {
    idComponent: {
      type: Schema.Types.ObjectId,
      ref: "RawMaterial", // Relación con la materia prima usada
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1, // Al menos 1 unidad
      max: 500, // Máximo 100 unidades por componente
      trim: true,
    },
  },
  { _id: false } // No se genera _id para cada componente
);

// Subesquema: Variantes del producto (ej. tamaño, fragancia)
const variantSchema = new Schema(
  {
    variant: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    variantPrice: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    // cada variante puede tener sus propios componentes
    components: {
      type: [componentSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100,
        message: "Cada variante debe tener entre 1 y 100 componentes",
      },
    },
  },
  { _id: false }
);

// Subesquema: Pasos de elaboración (receta)
const recipeSchema = new Schema(
  {
    step: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      trim: true,
    },
  },
  { _id: false }
);

// Subesquema: Instrucciones de uso del producto
const useFormSchema = new Schema(
  {
    instruction: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      trim: true,
    },
  },
  { _id: false }
);

// Esquema principal: Productos
const productsSchema = new Schema(
  {
    // Nombre del producto
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

    // Descripción del producto
    description: {
      type: String,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;!?'"()-]+$/,
        "La descripción solo puede contener letras, espacios y signos de puntuación básicos",
      ],
      minLength: 3,
      maxLength: 1000,
      trim: true,
    },

    // Arreglo de imágenes del producto (mín. 1, máx. 8)
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length >= 1 && arr.length <= 8;
        },
        message: "Debes subir entre 1 y 8 imágenes",
      },
    },

    // Receta o pasos de elaboración del producto
    recipe: {
      type: [recipeSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100,
        message: "Debes proporcionar entre 1 y 100 pasos de receta",
      },
    },

    // Variantes del producto (ej. tamaños o estilos diferentes)
    variant: {
      type: [variantSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 10,
        message: "Debes proporcionar entre 1 y 10 variantes del producto",
      },
    },

    // Disponibilidad del producto (true = activo)
    availability: {
      type: Boolean,
      required: true,
    },

    // Instrucciones de uso del producto
    useForm: {
      type: [useFormSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100,
        message: "Debes proporcionar entre 1 y 100 instrucciones de uso",
      },
    },

    // Relación con la categoría a la que pertenece el producto
    idProductCategory: {
      type: Schema.Types.ObjectId,
      ref: "productCategories",
      required: true,
    },

    // Relación con la colección a la que pertenece el producto
    idCollection: {
      type: Schema.Types.ObjectId,
      ref: "Collections",
      required: true,
    },

    // Campo para eliminación lógica del producto
    deleted: {
      type: Boolean, // Tipo booleano
      default: false, // Por defecto no eliminado
    },
  },
  {
    timestamps: true, // createdAt y updatedAt automáticos
    strict: false, // Permite almacenar campos adicionales no definidos
  }
);

// Exporto el modelo para usar en otras partes de la aplicación
export default model("Products", productsSchema);
