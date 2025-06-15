import rawMaterialCategoriesModel from "../models/RawMaterialCategories.js"; // Modelo de Categorías de Materia Prima

// Array de métodos (CRUD)
const rawMaterialCategoriesControllers = {};

// GET - Obtener todas las categorías
rawMaterialCategoriesControllers.getCategories = async (req, res) => {
  try {
    const categories = await rawMaterialCategoriesModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};{}

// POST - Crear categoría
rawMaterialCategoriesControllers.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    // Validaciones
    if (!name) {
      return res.status(400).json({ message: "Please provide the name field" });
    }

    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: "Name length is invalid" });
    }

    const newCategory = new rawMaterialCategoriesModel({ name });
    await newCategory.save();
    res.status(200).json({ message: "Category saved" });

  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// DELETE - Eliminar categoría
rawMaterialCategoriesControllers.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await rawMaterialCategoriesModel.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });

  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// PUT - Actualizar categoría
rawMaterialCategoriesControllers.updateCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Please provide the name field" });
    }

    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: "Name length is invalid" });
    }

    const updatedCategory = await rawMaterialCategoriesModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated" });

  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// Exportar
export default rawMaterialCategoriesControllers;
