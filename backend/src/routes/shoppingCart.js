import express from "express";
import shoppingCartController from "../controllers/shoppingCartController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(auth, shoppingCartController.getCart)
  .post(auth, shoppingCartController.createCart);

router.post("/add", auth, shoppingCartController.addProduct);
router.put("/removeProduct/:productId", auth, shoppingCartController.removeProduct);


router
  .route("/:id")
  .get(auth, shoppingCartController.getCartById)
  //.put(auth, shoppingCartController.updateCart)
  .delete(auth, shoppingCartController.deleteCart);

router.put("/empty/:id", auth, shoppingCartController.emptyCart);

export default router;

