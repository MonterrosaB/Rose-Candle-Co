import shoppingCartModel from "../models/ShoppingCart.js"; // Modelo de Carrito de Compras
import Product from "../models/Products.js"; // Asegúrate que tu modelo se llame así

// Array de métodos (CRUD)
const shoppingCartController = {};

// GET todos los carritos
shoppingCartController.getCart = async (req, res) => {
  try {
    const userId = req.user.id; // El id real del usuario logueado

    const cart = await shoppingCartModel
      .findOne({ idUser: userId })
      .populate("idUser")
      .populate("products");

    if (!cart) {
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// GET carrito por ID (SEGURO)
shoppingCartController.getCartById = async (req, res) => {
  try {
    const cartId = req.params.id;

    const cart = await shoppingCartModel
      .findById(cartId)
      .populate("idUser")
      .populate("products");

    if (!cart) {
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    // Verificar propiedad del carrito
    if (cart.idUser.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this cart" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in getCartById:", error);
    res.status(500).json("Internal server error");
  }
};

// POST crear carrito
shoppingCartController.createCart = async (req, res) => {
  try {
    const userId = req.user.id; // Ahora sí existe porque auth lo pone

    let cart = await shoppingCartModel.findOne({ idUser: userId });

    if (cart) {
      return res
        .status(200)
        .json({ message: "Shopping cart already exists", cart });
    }

    cart = new shoppingCartModel({
      idUser: userId,
      products: [],
      total: 0,
    });

    await cart.save();

    res.status(201).json({ message: "Shopping cart created", cart });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

shoppingCartController.addProduct = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await shoppingCartModel.findOne({ idUser: userId });

  if (!cart) {
    cart = new shoppingCartModel({
      idUser: userId,
      products: [],
      total: 0,
    });
  }

  cart.products.push(productId);

  const productCount = {};
  for (const pid of cart.products) {
    productCount[pid.toString()] = (productCount[pid.toString()] || 0) + 1;
  }

  const uniqueProductIds = [...new Set(cart.products.map((p) => p.toString()))];
  const productsData = await Product.find({ _id: { $in: uniqueProductIds } });

  let total = 0;
  for (const p of productsData) {
    const count = productCount[p._id.toString()] || 0;

    // Obtener el precio desde la primera variante
    let price = 0;
    if (p.variant && p.variant.length > 0) {
      price = Number(p.variant[0].variantPrice); // convertir string a número
    }

    if (!isNaN(price) && price > 0) {
      total += price * count;
    } else {
      console.warn(
        `Producto con precio inválido: ${p._id}, variantePrecio: ${p.variant?.[0]?.variantPrice}`
      );
    }
  }

  cart.total = total;
  await cart.save();

  res.status(200).json({ message: "Product added", cart });
};

shoppingCartController.deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedCart = await shoppingCartModel.findOneAndDelete({
      idUser: userId,
    });

    if (!deletedCart) {
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    res.status(200).json({ message: "Shopping cart deleted" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};


shoppingCartController.removeProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params; // ✔️ Ahora lo tomas de los params

    const cart = await shoppingCartModel.findOne({ idUser: userId });

    if (!cart) {
      return res.status(404).json({ message: "Shopping cart not found" });
    }
    const indexToRemove = cart.products.findIndex(
      (p) => p.toString() === productId
    );

    if (indexToRemove === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products.splice(indexToRemove, 1);

    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



shoppingCartController.emptyCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await shoppingCartModel.findOne({ idUser: userId });

    if (!cart) {
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    cart.products = [];
    cart.total = 0;

    await cart.save();

    res.status(200).json({ message: "Shopping cart emptied", cart });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// Exportar
export default shoppingCartController;
