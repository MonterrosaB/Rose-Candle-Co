import express from "express";
import settingsController from "../controllers/settingsController.js";

const router = express.Router();

// Obtener configuración completa
router.get("/", settingsController.getSettings);

// Actualizar todo el documento
router.put("/", settingsController.updateSettings);

// Actualizar secciones individualmente
router.patch("/marquee", settingsController.updateMarquee);
router.patch("/banner", settingsController.updateBanner);
router.patch("/email", settingsController.updateEmail);

export default router;
