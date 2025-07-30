import shoppingCartModel from "../models/ShoppingCart.js"; // Modelo de Carrito de Compras
import Product from "../models/Products.js"; // Modelo de Productos

// Controlador con métodos CRUD para Carrito de Compras
const shoppingCartController = {};

// GET - Obtener el carrito del usuario autenticado
shoppingCartController.getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener ID del usuario autenticado desde el middleware de auth

    // Buscar el carrito asociado a ese usuario y popular datos de usuario y productos
    const cart = await shoppingCartModel
      .findOne({ idUser: userId })
      .populate("idUser") // Popular info del usuario
      .populate("products"); // Popular info de productos dentro del carrito

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
  const userId = req.user.id; // ID del usuario autenticado
  const { productId } = req.body; // ID del producto a agregar

  // Buscar el producto para verificar que exista
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Buscar carrito del usuario
  let cart = await shoppingCartModel.findOne({ idUser: userId });

  // Si no existe carrito, crear uno vacío para el usuario
  if (!cart) {
    cart = new shoppingCartModel({
      idUser: userId,
      products: [],
      total: 0,
    });
  }

  // Agregar el producto (su ID) al arreglo de productos del carrito
  cart.products.push(productId);

  // Contar cuántas veces aparece cada producto en el carrito (para calcular total)
  const productCount = {};
  for (const pid of cart.products) {
    productCount[pid.toString()] = (productCount[pid.toString()] || 0) + 1;
  }

  // Obtener lista de IDs únicos de productos para hacer una consulta eficiente
  const uniqueProductIds = [...new Set(cart.products.map((p) => p.toString()))];

  // Buscar los datos completos de los productos para calcular total
  const productsData = await Product.find({ _id: { $in: uniqueProductIds } });

  // Calcular el total acumulando el precio * cantidad por producto
  let total = 0;
  for (const p of productsData) {
    const count = productCount[p._id.toString()] || 0;

    // Obtener el precio de la primera variante (asumiendo estructura variante)
    let price = 0;
    if (p.variant && p.variant.length > 0) {
      price = Number(p.variant[0].variantPrice); // Convertir a número
    }

    if (!isNaN(price) && price > 0) {
      total += price * count;
    } else {
      // Avisar en consola si el producto tiene precio inválido
      console.warn(
        `Producto con precio inválido: ${p._id}, variantePrecio: ${p.variant?.[0]?.variantPrice}`
      );
    }
  }

  // Actualizar total del carrito
  cart.total = total;

  // Guardar carrito actualizado en BD
  await cart.save();

  // Responder con carrito actualizado
  res.status(200).json({ message: "Product added", cart });
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


shoppingCartController.restoreShoppingCart= async (req, res) => {
  try {
    const restoreShoppingCart = await shoppingCartModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreShoppingCart) {
      return res.status(400).json({ message: "Restore Shopping Cart not found" }); // No encontrada
    }

    res.status(200).json({ message: "Restore Shopping Cart restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};


// Exportar controlador para usar en rutas
export default shoppingCartController;
