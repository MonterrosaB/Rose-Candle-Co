import settingsModel from "../models/Settings.js"; // Modelo de settings
import { sendEmail, HTMLMail } from "../utils/mailPromotions.js"; // Correo promocional

// Objeto que agrupa los métodos CRUD para Settings
const settingsController = {};

// GET - Obtener la configuración principal
settingsController.getSettings = async (req, res) => {
  try {
    let settings = await settingsModel.findOne();

    if (!settings) {
      // Crear documento por defecto si no existe
      settings = new settingsModel();
      await settings.save();
    }

    res.status(200).json(settings); // todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// PUT - Actualizar todo el documento de configuración
settingsController.updateSettings = async (req, res) => {
  try {
    const updated = await settingsModel.findOneAndUpdate(
      {}, // único documento
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Settings updated", settings: updated }); // todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// PATCH - Actualizar solo el Marquee
settingsController.updateMarquee = async (req, res) => {
  const { marquee } = req.body;
  if (!marquee) return res.status(400).json({ message: "Marquee is required" });

  try {
    const updated = await settingsModel.findOneAndUpdate(
      {},
      { marquee },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Marquee updated", marquee: updated.marquee }); // todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// PATCH - Actualizar solo el Banner
settingsController.updateBanner = async (req, res) => {
  const { title, subtitle, imageUrl } = req.body;

  try {
    const updated = await settingsModel.findOneAndUpdate(
      {},
      { banner: { title, subtitle, imageUrl } },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Banner updated", banner: updated.banner }); // todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// PATCH - Actualizar solo el Email y de paso enviarlo
settingsController.updateEmail = async (req, res) => {
  const { subject, body, recipient, name } = req.body;

  try {
    const updated = await settingsModel.findOneAndUpdate(
      {},
      { email: { subject, body } },
      { new: true, runValidators: true }
    );

    // Enviar correo al actualizar
    if (recipient) {
      const html = HTMLMail(body, subject, name);
      await sendEmail(recipient, subject, html);
    }

    res
      .status(200)
      .json({ message: "Email updated and sent", email: updated.email }); // todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

export default settingsController;
