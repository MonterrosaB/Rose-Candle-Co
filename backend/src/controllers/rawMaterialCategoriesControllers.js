import rawMaterialCategoriesModel from "../models/RawMaterialCategories.js"; // Importar modelo de categorías de materia prima

// Controlador con métodos CRUD para categorías de materia prima
const rawMaterialCategoriesControllers = {};

// GET - Obtener todas las categorías de materia prima
rawMaterialCategoriesControllers.getCategories = async (req, res) => {
  try {
    // Buscar todas las categorías en la base de datos
    const categories = await rawMaterialCategoriesModel.find();
    // Enviar respuesta con código 200 y lista de categorías
    res.status(200).json(categories);
  } catch (error) {
    // En caso de error, mostrar en consola y responder con código 500
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// GET - Obtener una categoría por su ID
rawMaterialCategoriesControllers.getCategoryById = async (req, res) => {
  try {
    // Buscar categoría por ID recibido en los parámetros de la petición
    const category = await rawMaterialCategoriesModel.findById(req.params.id);

    // Validar si la categoría existe
    if (!category) {
      // Responder con error 404 si no se encuentra la categoría
      return res.status(404).json({ message: "Category not found" });
    }

    // Responder con éxito y enviar la categoría encontrada
    res.status(200).json({
      message: "Success",
      data: category,
    });
  } catch (error) {
    // Capturar error, mostrarlo en consola y responder con error 500
    console.log("error " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST - Crear una nueva categoría de materia prima
rawMaterialCategoriesControllers.createCategory = async (req, res) => {
  const { name } = req.body; // Obtener nombre de la categoría del cuerpo de la petición

  try {
    // Validaciones de entrada
    if (!name) {
      // Validar que el campo nombre esté presente
      return res.status(400).json({ message: "Please provide the name field" });
    }

    if (name.length < 3 || name.length > 100) {
      // Validar longitud mínima y máxima del nombre
      return res.status(400).json({ message: "Name length is invalid" });
    }

    // Crear nueva instancia del modelo con el nombre validado
    const newCategory = new rawMaterialCategoriesModel({ name });
    // Guardar en la base de datos
    await newCategory.save();
    // Responder con éxito
    res.status(200).json({ message: "Category saved" });
  } catch (error) {
    // Capturar error, mostrarlo en consola y responder con error 500
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// DELETE - Eliminar categoría por ID
rawMaterialCategoriesControllers.deleteCategory = async (req, res) => {
  try {
    // Buscar y eliminar categoría por ID recibido en los parámetros
    const deletedCategory = await rawMaterialCategoriesModel.findByIdAndDelete(
      req.params.id
    );

    // Validar si la categoría existía para ser eliminada
    if (!deletedCategory) {
      // Responder con error 400 si no se encontró la categoría
      return res.status(400).json({ message: "Category not found" });
    }

    // Responder con éxito
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    // Capturar error, mostrarlo en consola y responder con error 500
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// PUT - Actualizar categoría existente por ID
rawMaterialCategoriesControllers.updateCategory = async (req, res) => {
  const { name } = req.body; // Obtener nuevo nombre desde el cuerpo de la petición

  try {
    // Validaciones de entrada
    if (!name) {
      // Validar que el nombre esté presente
      return res.status(400).json({ message: "Please provide the name field" });
    }

    if (name.length < 3 || name.length > 100) {
      // Validar longitud del nombre
      return res.status(400).json({ message: "Name length is invalid" });
    }

    // Buscar categoría por ID y actualizar con nuevo nombre, devolver documento actualizado
    const updatedCategory = await rawMaterialCategoriesModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    // Validar si la categoría fue encontrada para actualizar
    if (!updatedCategory) {
      // Responder con error 400 si no se encontró la categoría
      return res.status(400).json({ message: "Category not found" });
    }

    // Responder con éxito
    res.status(200).json({ message: "Category updated" });
  } catch (error) {
    // Capturar error, mostrarlo en consola y responder con error 500
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// Exportar controlador para usarlo en rutas
export default rawMaterialCategoriesControllers;
