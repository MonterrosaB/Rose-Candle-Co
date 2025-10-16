import express from "express";
import multer from "multer";
import settingsController from "../controllers/settingsController.js";

const router = express.Router();

const upload = multer({ dest: "public/" });

// RUTAS GENERALES

// Obtener configuración completa
router.get("/", settingsController.getSettings);

// Obtener configuración por ID
router.get("/:id", settingsController.getSettingById);

// Crear nueva configuración
router.post("/", upload.array("images", 8), settingsController.createSetting);

// Actualizar todo el documento
router.put("/:id", upload.array("images", 8), settingsController.updateSetting);

// Eliminar configuración
router.delete("/:id", settingsController.deleteSetting);

// Restaurar configuración
router.patch("/:id/restore", settingsController.restoreSetting);


// RUTAS PARA SECCIONES ESPECÍFICAS

// Actualizar marquee
router.patch("/marquee", settingsController.updateMarquee);

// Actualizar banner
router.patch("/banner", settingsController.updateBanner);

// Actualizar email
router.patch("/email", settingsController.updateEmail);

// Actualizar colección de temporada
router.patch("/seasonal-collection", upload.single("image"), settingsController.updateSeasonalCollection);

// Actualizar sección de inspiración
router.patch("/inspiration", settingsController.updateInspiration);


// RUTAS PARA PRODUCTOS RECOMENDADOS

// Obtener solo productos recomendados
router.get("/recommended-products/list", settingsController.getRecommendedProducts);

// Actualizar productos recomendados completos
router.patch("/recommended-products", settingsController.updateRecommendedProducts);

// Eliminar un producto específico de recomendados
router.delete("/recommended-products/:productId", settingsController.removeRecommendedProduct);

export default router;