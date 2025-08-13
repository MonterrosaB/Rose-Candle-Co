import express from "express";
import shoppingCartController from "../controllers/shoppingCartController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(auth, shoppingCartController.getCart)
  .post(auth, shoppingCartController.createCart);

router.route("/count").get(shoppingCartController.getAbandonettedCars);

router.post("/add", auth, shoppingCartController.addProduct);
router.put("/removeProduct/:productId", auth, shoppingCartController.removeProduct);

// Rutas específicas
router.route("/restore/:id").put(shoppingCartController.restoreShoppingCart); // restaurar por id

router.put("/empty/:id", auth, shoppingCartController.emptyCart);
// Completar carrito y generar orden automáticamente
router.post("/complete", auth, shoppingCartController.completeCart);

router
  .route("/bestSellingProducts") // productos más vendidos
  .get(shoppingCartController.bestSellingProducts);

router
  .route("/:id")
  .get(auth, shoppingCartController.getCartById)
  //.put(auth, shoppingCartController.updateCart)
  .delete(auth, shoppingCartController.deleteCart);

export default router;
