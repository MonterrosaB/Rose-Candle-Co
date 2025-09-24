import collectionModel from "../models/Collections.js"; // Modelo de colecciones

// Objeto que agrupa los métodos CRUD para colecciones
const collectionsController = {};

// GET - Obtener todas las colecciones
collectionsController.getCollections = async (req, res) => {
  try {
    const collections = await collectionModel.find({ deleted: false }); // Buscar todas las colecciones, salvo las que no han sido eliminadas

    // Normalizar estructura de respuesta
    const normalized = collections.map((c) => ({
      _id: c._id,
      name: c.name || c.collection || "", // Compatibilidad con campos antiguos
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));

    res.status(200).json(normalized); // Respuesta exitosa
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// GET - Obtener una colección por ID
collectionsController.getCollectionById = async (req, res) => {
  try {
    const collection = await collectionModel.findById(req.params.id); // Buscar por ID

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" }); // No encontrada
    }

    // Normalizar respuesta
    const normalized = {
      _id: collection._id,
      name: collection.name || collection.collection || "",
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    };

    res.status(200).json(normalized); // Respuesta exitosa
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// POST - Crear una nueva colección
collectionsController.createCollection = async (req, res) => {
  const { name } = req.body; // Obtener campo desde el cuerpo

  try {
    // Validación: campo vacío
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" });
    }

    // Validación: mínimo de caracteres
    if (name.length < 3) {
      return res.status(400).json({ message: "Too short" });
    }

    // Validación: máximo de caracteres
    if (name.length > 100) {
      return res.status(400).json({ message: "Too large" });
    }

    // Crear y guardar nueva colección
    const newCollection = new collectionModel({ name });
    await newCollection.save();

    res.status(200).json({ message: "Collection saved" }); // Creación exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// PUT - Actualizar una colección por ID
collectionsController.updateCollection = async (req, res) => {
  const { name } = req.body; // Obtener campo del cuerpo

  try {
    // Validación de campo
    if (!name || typeof name !== "string" || name.length < 3) {
      return res.status(400).json({ message: "Too short" });
    }

    if (name.length > 100) {
      return res.status(400).json({ message: "Too large" });
    }

    // Actualizar colección en base de datos
    const updatedCollection = await collectionModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true } // Retornar el documento actualizado
    );

    if (!updatedCollection) {
      return res.status(400).json({ message: "Collection not found" }); // No se encontró la colección
    }

    res.status(200).json({ message: "Collection updated" }); // Actualización exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// DELETE - Eliminar una colección por ID (con soft delete)
collectionsController.deleteCollection = async (req, res) => {
  try {
    const deletedCollection = await collectionModel.findByIdAndUpdate(
      req.params.id,
      { deleted: true }, // Se marca como "eliminada"
      { new: true }
    ); // Eliminar por ID

    if (!deletedCollection) {
      return res.status(400).json({ message: "Collection not found" }); // No encontrada
    }

    res.status(200).json({ message: "Collection deleted" }); // Eliminación exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// RESTAURAR una colección eliminada
collectionsController.restoreCollection = async (req, res) => {
  try {
    const restoredCollection = await collectionModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoredCollection) {
      return res.status(400).json({ message: "Collection not found" }); // No encontrada
    }

    res.status(200).json({ message: "Collection restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// Exportar el controlador
export default collectionsController;
