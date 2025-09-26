import Settings from "../models/Settings.js"; // Modelo de Settings
import { config } from "../config.js"; // Configuración general
import { v2 as cloudinary } from "cloudinary"; // Cloudinary para imágenes

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Array de funciones (vacío)
const settingsController = {};

// GET - Método para obtener todos los ajustes
settingsController.getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    res.status(200).json(settings); // Todo bien
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// GET (POR ID) - Método para obtener un ajuste por su id
settingsController.getSettingById = async (req, res) => {
  try {
    const setting = await Settings.findById(req.params.id);
    if (!setting) {
      return res.status(404).json({ error: "Setting not found" }); // Si no encuentra el ajuste
    }
    res.status(200).json(setting); // Todo bien
  } catch (error) {
    res.status(500).json({ error: "Error, couldn't find the setting" }); // Error al buscar el ajuste
  }
};

// POST - Método para crear un nuevo ajuste
settingsController.createSetting = async (req, res) => {
  try {
    const { name, value, type, description, imageUrl } = req.body;

    // Validaciones básicas
    if (!name || !value || !type) {
      return res.status(400).json({ message: "Please complete all the fields" });
    }

    let imageUrlCloudinary = imageUrl;

    // Subir imagen a Cloudinary si se proporcionó
    if (req.files && req.files.length > 0) {
      const result = await cloudinary.uploader.upload(req.files[0].path, {
        folder: "public/settings",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      imageUrlCloudinary = result.secure_url;
    }

    // Crear el nuevo ajuste
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
    res.status(500).json("Internal server error"); // Error al guardar el ajuste
  }
};

// PUT - Método para actualizar un ajuste por su id
settingsController.updateSetting = async (req, res) => {
  try {
    const { name, value, type, description, imageUrl } = req.body;
    let imageUrlCloudinary = imageUrl;

    // Subir imagen a Cloudinary si se proporcionó
    if (req.files && req.files.length > 0) {
      const result = await cloudinary.uploader.upload(req.files[0].path, {
        folder: "public/settings",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      imageUrlCloudinary = result.secure_url;
    }

    // Buscar el ajuste original
    const settingOriginal = await Settings.findById(req.params.id);
    if (!settingOriginal) {
      return res.status(404).json({ message: "Setting not found" }); // Si no se encuentra el ajuste
    }

    // Actualizar solo los campos proporcionados
    const updatedSetting = await Settings.findByIdAndUpdate(
      req.params.id,
      {
        name,
        value,
        type,
        description,
        imageUrl: imageUrlCloudinary || settingOriginal.imageUrl, // Mantener la imagen si no hay nueva
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

// DELETE - Método para eliminar un ajuste por su id
settingsController.deleteSetting = async (req, res) => {
  try {
    const deletedSetting = await Settings.findByIdAndDelete(req.params.id);
    if (!deletedSetting) {
      return res.status(404).json({ message: "Setting not found" }); // Si no se encuentra el ajuste
    }
    res.status(200).json({ message: "Setting deleted successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json("Internal server error");
  }
};

// RESTORE - Método para restaurar un ajuste (si es necesario)
settingsController.restoreSetting = async (req, res) => {
  try {
    const restoreSetting = await Settings.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Marcar como no eliminado
      { new: true }
    );
    if (!restoreSetting) {
      return res.status(400).json({ message: "Setting not found" });
    }
    res.status(200).json({ message: "Setting restored successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json("Internal server error");
  }
};

// PATCH - Actualizar el campo "marquee" del ajuste
settingsController.updateMarquee = async (req, res) => {
  try {
    const { marqueeText } = req.body;

    if (!marqueeText) {
      return res.status(400).json({ message: "Marquee text is required" });
    }

    const updatedSetting = await Settings.findOneAndUpdate(
      { name: "marquee" }, // Suponiendo que el ajuste de marquee es único
      { value: marqueeText }, // Actualiza solo el valor de marquee
      { new: true }
    );

    if (!updatedSetting) {
      return res.status(404).json({ message: "Marquee setting not found" });
    }

    res.status(200).json({
      message: "Marquee updated successfully",
      setting: updatedSetting,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH - Actualizar el campo "banner" del ajuste, con carga de imagen en Cloudinary
settingsController.updateBanner = async (req, res) => {
  try {
    // Verificamos si la imagen viene en el cuerpo de la solicitud
    const { bannerUrl, bannerImage } = req.body;

    if (bannerImage) {
      // Si recibimos una imagen base64, la subimos a Cloudinary
      cloudinary.uploader.upload(bannerImage, { folder: "banners" }, async (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error uploading image to Cloudinary", error: err });
        }

        // Si la imagen se sube correctamente, obtenemos la URL y la actualizamos en la base de datos
        const updatedSetting = await Settings.findOneAndUpdate(
          { name: "banner" },
          { value: result.secure_url }, // Usamos la URL segura proporcionada por Cloudinary
          { new: true }
        );

        if (!updatedSetting) {
          return res.status(404).json({ message: "Banner setting not found" });
        }

        return res.status(200).json({
          message: "Banner updated successfully",
          setting: updatedSetting,
        });
      });
    } else if (bannerUrl) {
      // Si solo se recibe una URL (sin imagen), actualizamos directamente
      const updatedSetting = await Settings.findOneAndUpdate(
        { name: "banner" },
        { value: bannerUrl },
        { new: true }
      );

      if (!updatedSetting) {
        return res.status(404).json({ message: "Banner setting not found" });
      }

      res.status(200).json({
        message: "Banner updated successfully",
        setting: updatedSetting,
      });
    } else {
      return res.status(400).json({ message: "Either bannerUrl or bannerImage is required" });
    }

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH - Actualizar el campo "email" del ajuste
settingsController.updateEmail = async (req, res) => {
  const { subject, body, recipient, name } = req.body;

  try {
    const updated = await settingsModel.findOneAndUpdate(
      {},
      { email: { subject, body } },
      { new: true, runValidators: true }
    );

    // Enviar correo si hay destinatario
    if (recipient) {
      const htmlContent = HTMLMail(body, subject, name);
      await sendEmail(recipient, subject, htmlContent); // ahora usa Brevo
    }

    res.status(200).json({
      message: "Email updated successfully",
      setting: updatedSetting,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default settingsController;
