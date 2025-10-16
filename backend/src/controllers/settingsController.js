import Settings from "../models/Settings.js";
import { config } from "../config.js";
import { v2 as cloudinary } from "cloudinary";
import Products from "../models/Products.js"; // Importar modelo de productos

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const settingsController = {};

// GET - Obtener todos los ajustes
settingsController.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne()
      .populate('seasonalCollection.idCollection')
      .populate({
        path: 'recommendedProducts.products.idProduct',
        select: 'name description images variant availability'
      });
    
    res.status(200).json(settings);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET (POR ID) - Obtener un ajuste por su id
settingsController.getSettingById = async (req, res) => {
  try {
    const setting = await Settings.findById(req.params.id)
      .populate('seasonalCollection.idCollection')
      .populate({
        path: 'recommendedProducts.products.idProduct',
        select: 'name description images variant availability'
      });
    
    if (!setting) {
      return res.status(404).json({ error: "Setting not found" });
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ error: "Error, couldn't find the setting" });
  }
};

// POST - Crear un nuevo ajuste
settingsController.createSetting = async (req, res) => {
  try {
    const { name, value, type, description, imageUrl } = req.body;

    if (!name || !value || !type) {
      return res.status(400).json({ message: "Please complete all the fields" });
    }

    let imageUrlCloudinary = imageUrl;

    if (req.files && req.files.length > 0) {
      const result = await cloudinary.uploader.upload(req.files[0].path, {
        folder: "public/settings",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      imageUrlCloudinary = result.secure_url;
    }

    const newSetting = new Settings({
      name,
      value,
      type,
      description,
      imageUrl: imageUrlCloudinary,
    });

    const savedSetting = await newSetting.save();
    res.status(200).json({
      message: "Setting saved successfully",
      setting: savedSetting,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT - Actualizar un ajuste por su id
settingsController.updateSetting = async (req, res) => {
  try {
    const { name, value, type, description, imageUrl } = req.body;
    let imageUrlCloudinary = imageUrl;

    if (req.files && req.files.length > 0) {
      const result = await cloudinary.uploader.upload(req.files[0].path, {
        folder: "public/settings",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      imageUrlCloudinary = result.secure_url;
    }

    const settingOriginal = await Settings.findById(req.params.id);
    if (!settingOriginal) {
      return res.status(404).json({ message: "Setting not found" });
    }

    const updatedSetting = await Settings.findByIdAndUpdate(
      req.params.id,
      {
        name,
        value,
        type,
        description,
        imageUrl: imageUrlCloudinary || settingOriginal.imageUrl,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Setting updated successfully",
      setting: updatedSetting,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE - Eliminar un ajuste por su id
settingsController.deleteSetting = async (req, res) => {
  try {
    const deletedSetting = await Settings.findByIdAndDelete(req.params.id);
    if (!deletedSetting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json({ message: "Setting deleted successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// RESTORE - Restaurar un ajuste
settingsController.restoreSetting = async (req, res) => {
  try {
    const restoreSetting = await Settings.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );
    if (!restoreSetting) {
      return res.status(400).json({ message: "Setting not found" });
    }
    res.status(200).json({ message: "Setting restored successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH - Actualizar el campo "marquee"
settingsController.updateMarquee = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Marquee name is required" });
    }

    const updatedSetting = await Settings.findOneAndUpdate(
      {},
      { "marquee.name": name },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Marquee updated successfully",
      setting: updatedSetting,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH - Actualizar la colección de temporada
settingsController.updateSeasonalCollection = async (req, res) => {
  try { 
    const { idCollection, name, description, availableUntil, isConstant } = req.body;

    if (!idCollection || !name) {
      return res.status(400).json({
        message: "Collection ID and name are required",
      });
    }

    const updateFields = {
      "seasonalCollection.idCollection": idCollection,
      "seasonalCollection.name": name,
      "seasonalCollection.description": description || "",
      "seasonalCollection.date": Date.now(),
    };

    // Subir imagen a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public/seasonal-collections",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      updateFields["seasonalCollection.image"] = result.secure_url;
    }

    // Manejar isConstant
    const isConstantBool = isConstant === 'true' || isConstant === true;
    updateFields["seasonalCollection.isConstant"] = isConstantBool;

    // Manejar availableUntil
    if (!isConstantBool && availableUntil && availableUntil !== '' && availableUntil !== 'undefined') {
      updateFields["seasonalCollection.availableUntil"] = availableUntil;
    } else if (isConstantBool) {
      updateFields["seasonalCollection.availableUntil"] = '';
    }

    const updatedSetting = await Settings.findOneAndUpdate(
      {},
      updateFields,
      { new: true, upsert: true }
    ).populate('seasonalCollection.idCollection');

    res.status(200).json({
      message: "Seasonal collection updated successfully",
      setting: updatedSetting,
    });
  } catch (error) {
    console.log("Error completo:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// PATCH - Actualizar la sección de inspiración
settingsController.updateInspiration = async (req, res) => {
  try {
    const { phrase, description } = req.body;

    if (!phrase && !description) {
      return res.status(400).json({
        message: "At least one field (phrase or description) is required",
      });
    }

    const updateFields = {};
    if (phrase) updateFields["inspiration.phrase"] = phrase;
    if (description) updateFields["inspiration.description"] = description;

    const updatedSetting = await Settings.findOneAndUpdate(
      {},
      updateFields,
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Inspiration section updated successfully",
      setting: updatedSetting,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH - Actualizar productos recomendados
settingsController.updateRecommendedProducts = async (req, res) => {
  try {
    const { name, description, products } = req.body;

    // Validar que products sea un array
    if (products && !Array.isArray(products)) {
      return res.status(400).json({
        message: "Products must be an array",
      });
    }

    // Validar máximo 4 productos
    if (products && products.length > 4) {
      return res.status(400).json({
        message: "Maximum 4 recommended products allowed",
      });
    }

    // Validar que todos los productos existan
    if (products && products.length > 0) {
      const productIds = products.map(p => p.idProduct || p);
      const existingProducts = await Products.find({
        _id: { $in: productIds },
        deleted: false,
        availability: true
      });

      if (existingProducts.length !== productIds.length) {
        return res.status(400).json({
          message: "One or more products not found or not available",
        });
      }
    }

    // Construir objeto de actualización
    const updateFields = {};
    if (name) updateFields["recommendedProducts.name"] = name;
    if (description !== undefined) updateFields["recommendedProducts.description"] = description;
    if (products) {
      updateFields["recommendedProducts.products"] = products.map(p => ({
        idProduct: p.idProduct || p
      }));
    }

    const updatedSetting = await Settings.findOneAndUpdate(
      {},
      updateFields,
      { new: true, upsert: true, runValidators: true }
    ).populate({
      path: 'recommendedProducts.products.idProduct',
      select: 'name description images variant availability'
    });

    res.status(200).json({
      message: "Recommended products updated successfully",
      setting: updatedSetting,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET - Obtener solo productos recomendados
settingsController.getRecommendedProducts = async (req, res) => {
  try {
    const settings = await Settings.findOne()
      .select('recommendedProducts')
      .populate({
        path: 'recommendedProducts.products.idProduct',
        match: { deleted: false, availability: true },
        select: 'name description images variant availability'
      });

    if (!settings) {
      return res.status(404).json({
        message: "Settings not found",
      });
    }

    res.status(200).json({
      recommendedProducts: settings.recommendedProducts,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE - Eliminar un producto específico de recomendados
settingsController.removeRecommendedProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const updatedSetting = await Settings.findOneAndUpdate(
      {},
      {
        $pull: {
          "recommendedProducts.products": { idProduct: productId }
        }
      },
      { new: true }
    ).populate({
      path: 'recommendedProducts.products.idProduct',
      select: 'name description images variant availability'
    });

    if (!updatedSetting) {
      return res.status(404).json({
        message: "Settings not found",
      });
    }

    res.status(200).json({
      message: "Product removed from recommended products",
      setting: updatedSetting,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default settingsController;