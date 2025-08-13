import shoppingCartModel from "../models/ShoppingCart.js"; // Modelo de Carrito de Compras
import SalesOrderModel from "../models/SalesOrder.js"; // Modelo de Carrito de Compras
import Product from "../models/Products.js"; // Modelo de Productos
import ShoppingCart from "../models/ShoppingCart.js";

// Controlador con métodos CRUD para Carrito de Compras
const shoppingCartController = {};

// GET - Obtener el carrito del usuario autenticado
shoppingCartController.getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener ID del usuario autenticado desde el middleware de auth

    // Buscar el carrito asociado a ese usuario y popular datos de usuario y productos
    const cart = await shoppingCartModel
      .findOne({ idUser: userId, status: "active" })
      .populate("idUser") // Popular info del usuario
      .populate({
        path: "products",
        populate: [
          {
            path: "idProduct",
          },
        ],
      }); // Popular info de productos dentro del carrito

    if (!cart) {
      // Si no existe carrito para el usuario, responder 404
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    // Enviar carrito encontrado
    res.status(200).json(cart);
  } catch (error) {
    console.log("error " + error);
    // Error inesperado
    res.status(500).json("Internal server error");
  }
};

// GET - Obtener carrito por ID (con seguridad para que sólo el dueño acceda)
shoppingCartController.getCartById = async (req, res) => {
  try {
    const cartId = req.params.id; // Obtener ID del carrito desde la URL

    // Buscar carrito por ID y popular usuario y productos
    const cart = await shoppingCartModel
      .findById(cartId)
      .populate("idUser")
      .populate("products");

    if (!cart) {
      // Si no existe carrito con ese ID, responder 404
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    // Verificar que el carrito pertenezca al usuario autenticado
    if (cart.idUser.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this cart" });
    }

    // Enviar carrito si todo está correcto
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in getCartById:", error);
    res.status(500).json("Internal server error");
  }
};

// POST - Crear un carrito nuevo para el usuario autenticado
shoppingCartController.createCart = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario autenticado

    // Verificar si el usuario ya tiene un carrito existente
    let cart = await shoppingCartModel.findOne({ idUser: userId });

    if (cart) {
      // Si ya tiene carrito, devolverlo sin crear uno nuevo
      return res
        .status(200)
        .json({ message: "Shopping cart already exists", cart });
    }

    // Crear un nuevo carrito vacío para el usuario
    cart = new shoppingCartModel({
      idUser: userId,
      products: [], // Sin productos inicialmente
      total: 0, // Total inicial cero
    });

    // Guardar el carrito en la base de datos
    await cart.save();

    // Responder confirmando creación
    res.status(201).json({ message: "Shopping cart created", cart });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// POST - Agregar un producto al carrito del usuario
shoppingCartController.addProduct = async (req, res) => {

  const userId = req.user.id;
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await shoppingCartModel.findOne({ idUser: userId, status: "active" });

  // Crear nuevo carrito si no existe
  if (!cart) {
    cart = new shoppingCartModel({
      idUser: userId,
      products: [],
      total: 0,
      status: "active"
    });
  }

  // Buscar si el producto ya está en el carrito
  const existingProduct = cart.products.find(p => p.idProduct.toString() === productId);

  // Obtener el precio del producto
  let price = 0;
  if (product.variant && product.variant.length > 0) {
    price = Number(product.variant[0].variantPrice);
  }

  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ message: "Invalid product price" });
  }

  if (existingProduct) {
    // Si ya existe, aumentar cantidad y subtotal
    existingProduct.quantity += 1;
    existingProduct.subtotal = existingProduct.quantity * price;
  } else {
    // Si no existe, agregarlo como nuevo
    cart.products.push({
      idProduct: productId,
      quantity: 1,
      subtotal: price
    });
  }

  // Recalcular total del carrito
  cart.total = cart.products.reduce((sum, p) => sum + p.subtotal, 0);

  await cart.save();
  return res.status(200).json({ message: "Product added", cart });
};

// DELETE - Eliminar el carrito del usuario autenticado
shoppingCartController.deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;

    //Buscar y eliminar carrito del usuario
    const deletedCart = await shoppingCartModel.findOneAndDelete({
      idUser: userId,
    });

    if (!deletedCart) {
      // No existía carrito para ese usuario
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    // Confirmar eliminación
    res.status(200).json({ message: "Shopping cart deleted" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// DELETE - Remover un producto específico del carrito
shoppingCartController.removeProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params; // ID del producto a remover (viene en params)

    // Buscar carrito del usuario
    const cart = await shoppingCartModel.findOne({ idUser: userId });

    if (!cart) {
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    // Buscar índice del producto a remover en el array products
    const indexToRemove = cart.products.findIndex(
      (p) => p.toString() === productId
    );

    if (indexToRemove === -1) {
      // Producto no encontrado en el carrito
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remover producto del array
    cart.products.splice(indexToRemove, 1);

    // Guardar cambios
    await cart.save();

    // Confirmar remoción
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT/POST - Vaciar todos los productos del carrito
shoppingCartController.emptyCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Buscar carrito del usuario
    const cart = await shoppingCartModel.findOne({ idUser: userId });

    if (!cart) {
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    // Vaciar arreglo de productos y resetear total
    cart.products = [];
    cart.total = 0;

    // Guardar cambios en BD
    await cart.save();

    // Confirmar vaciado
    res.status(200).json({ message: "Shopping cart emptied", cart });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

shoppingCartController.restoreShoppingCart = async (req, res) => {
  try {
    const restoreShoppingCart = await shoppingCartModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreShoppingCart) {
      return res
        .status(400)
        .json({ message: "Restore Shopping Cart not found" }); // No encontrada
    }

    res.status(200).json({ message: "Restore Shopping Cart restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

shoppingCartController.getAbandonettedCars = async (req, res) => {
  const stats = await ShoppingCart.aggregate([
    {
      $group: {
        _id: null,
        totalCarts: { $sum: 1 },
        totalPurchases: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        abandonedCartRate: {
          $multiply: [
            { $subtract: [1, { $divide: ["$totalPurchases", "$totalCarts"] }] },
            100,
          ],
        },
      },
    },
  ]);

  res.json(`${stats[0].abandonedCartRate.toFixed(2)}%`);
};

// Exportar controlador para usar en rutas
export default shoppingCartController;
