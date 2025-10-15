import collectionModel from "../models/Collections.js"; // Modelo de colecciones
import { createLog } from "../utils/logger.js";

// Objeto que agrupa los métodos CRUD para colecciones
const collectionsController = {};

// GET - Obtener todas las colecciones
collectionsController.getCollections = async (req, res) => {
  try {
    const collections = await collectionModel.find().sort({ deleted: 1 }); // Ascendente: false primero

    // Normalizar estructura de respuesta
    const normalized = collections.map((c) => ({
      _id: c._id,
      name: c.name,
      description: c.description,
      deleted: c.deleted,
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
      name: collection.name,
      description: c.description,
      deleted: c.deleted,
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
  const { name, description } = req.body; // Obtener campo desde el cuerpo

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

    // Validar que exista
    if (!description || typeof description !== "string") {
      return res.status(400).json({
        message: "La descripción es obligatoria y debe ser texto",
      });
    }

    // Validar longitud mínima y máxima
    const trimmedDescription = description.trim();
    if (trimmedDescription.length < 10 || trimmedDescription.length > 255) {
      return res.status(400).json({
        message: "La descripción debe tener entre 10 y 255 caracteres",
      });
    }

    // Crear y guardar nueva colección
    const newCollection = new collectionModel({ name, description });
    await newCollection.save();

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "create",
      collectionAffected: "Collections",
      targetId: newCollection._id,
      description: `Collection ${newCollection.name} created`,
    });

    res.status(200).json({ message: "Collection saved" }); // Creación exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// PUT - Actualizar una colección por ID
collectionsController.updateCollection = async (req, res) => {
  const { name, description } = req.body; // Obtener campo del cuerpo

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

    // Validar que exista
    if (!description || typeof description !== "string") {
      return res.status(400).json({
        message: "La descripción es obligatoria y debe ser texto",
      });
    }

    // Validar longitud mínima y máxima
    const trimmedDescription = description.trim();
    if (trimmedDescription.length < 10 || trimmedDescription.length > 255) {
      return res.status(400).json({
        message: "La descripción debe tener entre 10 y 255 caracteres",
      });
    }

    // Actualizar colección en base de datos
    const updatedCollection = await collectionModel.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true } // Retornar el documento actualizado
    );

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "update",
      collectionAffected: "Collections",
      targetId: updatedCollection._id,
      description: `Collection ${updatedCollection.name} updated`,
    });

    if (!updatedCollection) {
      return res.status(400).json({ message: "Collection not found" }); // No se encontró la colección
    }

    res.status(200).json({ message: "Collection updated" }); // Actualización exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// DELETE - Permanently delete a collection by ID
collectionsController.hardDeleteCollection = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedCollection = await collectionModel.findByIdAndDelete(id);

    if (!deletedCollection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Log the deletion
    await createLog({
      userId: req.user.id,
      action: "delete",
      collectionAffected: "Collections",
      targetId: id,
      description: `Collection "${deletedCollection.name}" was permanently deleted.`,
    });

    return res.status(200).json({ message: "Collection permanently deleted" });
  } catch (error) {
    console.error("Hard delete error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE - Eliminar una colección por ID (con soft delete)
collectionsController.softDeleteCollection = async (req, res) => {
  try {
    const id = req.params.id;

    const collection = await collectionModel.findById(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const deletedCollection = await collectionModel.findByIdAndUpdate(
      id,
      { deleted: true }, // Se marca como "eliminada"
      { new: true }
    ); // Eliminar por ID

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "archiving",
      collectionAffected: "Collections",
      targetId: id,
      description: `Collection ${collection.name} was archived`,
    });

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
    const id = req.params.id;

    const restoredCollection = await collectionModel.findByIdAndUpdate(
      id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoredCollection) {
      return res.status(400).json({ message: "Collection not found" }); // No encontrada
    }

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "restore",
      collectionAffected: "Collections",
      targetId: id,
      description: `Collection ${restoredCollection.name} restored`,
    });

    res.status(200).json({ message: "Collection restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// Exportar el controlador
export default collectionsController;
