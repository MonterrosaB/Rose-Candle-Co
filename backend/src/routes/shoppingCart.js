import express from "express";
import shoppingCartController from "../controllers/shoppingCartController.js";
import auth from "../middlewares/authCustomers.js";

const router = express.Router();

router
  .route("/")
  .get(auth, shoppingCartController.getCart)
  .post(auth, shoppingCartController.createCart);

router.route("/count").get(shoppingCartController.getAbandonettedCars);

router.put("/increase", auth, shoppingCartController.increaseProduct);

// Disminuir cantidad
router.put("/decrease", auth, shoppingCartController.decreaseProduct);
router.put(
  "/removeProduct/:productId",
  auth,
  shoppingCartController.removeProduct
);

// Rutas específicas
router.patch("/empty/:idCart", auth, shoppingCartController.emptyCart);
// Completar carrito y generar orden automáticamente
router.post("/complete", auth, shoppingCartController.completeCart);

router
  .route("/bestSellingProducts") // productos más vendidos
  .get(shoppingCartController.bestSellingProducts);

export default router;
