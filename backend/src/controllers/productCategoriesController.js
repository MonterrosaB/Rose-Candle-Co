import productCategories from "../models/ProductCategories.js"; // Importar modelo de categorías de productos

const productCategoriesController = {};

// GET - obtener todas las categorías de productos
productCategoriesController.getproductCategories = async (req, res) => {
  try {
    // Buscar todas las categorías en la base de datos
    const productCategory = await productCategories.find({ deleted: false }); // Buscar todas las colecciones, salvo las que no han sido eliminadas
    // Enviar respuesta con el listado de categorías
    res.status(200).json(productCategory); // Respuesta exitosa
  } catch (error) {
    // Manejo de errores en servidor
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// GET por ID - obtener una categoría específica por su ID
productCategoriesController.getProductCategoryById = async (req, res) => {
  try {
    // Buscar categoría por ID enviado en parámetros
    const category = await productCategories.findById(req.params.id);

    // Validar si la categoría existe
    if (!category) {
      return res.status(404).json({ message: "Category not found" }); // No encontrada
    }

    // Enviar la categoría encontrada
    res.status(200).json(category);
  } catch (error) {
    // Manejo de errores en servidor
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// POST - crear una nueva categoría de producto
productCategoriesController.createProductCategory = async (req, res) => {
  // Extraer 'name' desde el cuerpo de la petición
  const { name } = req.body;

  try {
    // Validar que el campo 'name' no esté vacío
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" }); // Validación: campo vacío
    }

    // Validar longitud mínima del nombre
    if (name.length < 3) {
      return res.status(400).json({ message: "Too short" }); // Validación: nombre muy corto
    }

    // Validar longitud máxima del nombre
    if (name.length > 50) {
      return res.status(400).json({ message: "Too long" }); // Validación: nombre muy largo
    }

    // Crear nueva categoría y guardarla en la base de datos
    const newProductCategory = new productCategories({ name });
    await newProductCategory.save();

    // Responder con mensaje de éxito
    res.status(200).json({ message: "Saved Successfull" });
  } catch (error) {
    // Capturar errores del servidor
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// DELETE - eliminar una categoría por ID
productCategoriesController.deleteProductCategory = async (req, res) => {
 try {
       const deleteProductCategory = await productCategories.findByIdAndUpdate(
             req.params.id,
             { deleted: true }, // Se marca como "eliminada"
             { new: true }
           ); // Eliminar por ID

    // Validar si la categoría fue encontrada y eliminada
    if (!deleteProductCategory) {
      return res.status(400).json({ message: "Category not found" }); // No encontrada
    }

    // Responder con mensaje de éxito
    res.status(200).json({ message: "Deleted Successfull" });
  } catch (error) {
    // Manejo de errores del servidor
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// PUT - actualizar una categoría existente por ID
productCategoriesController.updateProductCategory = async (req, res) => {
  // Extraer 'name' desde el cuerpo de la petición
  const { name } = req.body;

  try {
    // Validar longitud mínima de nombre
    if (name.length < 3) {
      return res.status(400).json({ message: "Too short" }); // Validación: texto muy corto
    }

    // Validar longitud máxima de nombre
    if (name.length > 50) {
      return res.status(400).json({ message: "Too long" }); // Validación: texto muy largo
    }

    // Buscar por ID y actualizar la categoría con el nuevo nombre
    const categoryUpdated = await productCategories.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true } // Devuelve el documento actualizado
    );

    // Validar si la categoría existe
    if (!categoryUpdated) {
      return res.status(400).json({ message: "Category not found" }); // No encontrada
    }

    // Responder con mensaje de éxito
    res.status(200).json({ message: "Updated Successfull" });
  } catch (error) {
    // Capturar errores del servidor
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

productCategoriesController.restoreCategory = async (req, res) => {
  try {
    const restoreCategory = await productCategories.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreCategory) {
      return res.status(400).json({ message: "Category product not found" }); // No encontrada
    }

    res.status(200).json({ message: "Category product restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};
export default productCategoriesController; // Exportar controlador
