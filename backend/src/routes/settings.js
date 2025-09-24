import express from "express";
import multer from "multer";
import settingsController from "../controllers/settingsController.js";

const router = express.Router();

const upload = multer({ dest: "public/" });

// Obtener configuración completa
router.get("/", settingsController.getSettings);

// Agregar
router.post("/", settingsController.createSetting);

// Actualizar todo el documento
router.put("/", settingsController.updateSetting);

// Actualizar secciones individualmente
router.patch("/marquee", settingsController.updateMarquee);
router.patch("/banner", settingsController.updateBanner);
router.patch("/email", settingsController.updateEmail);

export default router;
