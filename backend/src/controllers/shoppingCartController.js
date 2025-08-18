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
shoppingCartController.increaseProduct = async (req, res) => {
  const userId = req.user.id;
  const { cartId, productId, quantityVariant, indexVariant } = req.body;

  try {
    // Buscar carrito activo del usuario
    let cart = await shoppingCartModel.findOne({
      _id: cartId,
      idUser: userId,
      status: "active",
    });
    if (!cart) {
      // Crear carrito si no existe
      cart = new shoppingCartModel({
        idUser: userId,
        products: [],
        total: 0,
        status: "active",
      });
    }

    // Buscar producto en DB
    const productDB = await Product.findById(productId);
    if (!productDB)
      return res.status(404).json({ message: "Producto no encontrado" });

    // Obtener precio de la variante seleccionada
    let price = 0;
    if (productDB.variant && productDB.variant.length > 0) {
      price = Number(
        productDB.variant[indexVariant]?.variantPrice ||
          productDB.variant[0].variantPrice
      );
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: "Precio del producto inválido" });
    }

    // Buscar item en carrito considerando la variante
    const item = cart.products.find(
      (p) =>
        p.idProduct.toString() === productId &&
        p.selectedVariantIndex === indexVariant
    );

    if (item) {
      // Ya existe → aumentar cantidad
      item.quantity += quantityVariant || 1;
      item.subtotal = item.quantity * price;
    } else {
      // Nuevo item con la variante seleccionada
      cart.products.push({
        idProduct: productId,
        quantity: quantityVariant || 1,
        selectedVariantIndex: indexVariant || 0,
        subtotal: (quantityVariant || 1) * price,
      });
    }

    // Recalcular total
    cart.total = cart.products.reduce((sum, p) => sum + p.subtotal, 0);

    await cart.save();

    return res.status(200).json({ message: "Producto agregado", cart });
  } catch (error) {
    console.error("Error al agregar producto:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

shoppingCartController.decreaseProduct = async (req, res) => {
  const userId = req.user.id;
  const { cartId, index } = req.body;

  try {
    const cart = await shoppingCartModel.findOne({
      _id: cartId,
      idUser: userId,
      status: "active",
    });
    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });

    const item = cart.products[index];
    if (!item)
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });

    // Obtener precio desde la variante
    const productDB = await Product.findById(item.idProduct);
    const price = Number(
      productDB.variant[item.selectedVariantIndex]?.variantPrice || 0
    );
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.subtotal = item.quantity * price;
    } else {
      cart.products.splice(index, 1);
    }

    cart.total = cart.products.reduce((sum, p) => sum + p.subtotal, 0);
    await cart.save();

    res.status(200).json({ message: "Producto actualizado", cart });
  } catch (error) {
    console.error("Error al disminuir cantidad:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// POST - Completar carrito y generar orden automáticamente
shoppingCartController.completeCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Buscar carrito del usuario
    const cart = await shoppingCartModel
      .findOne({ idUser: userId })
      .populate("idUser")
      .populate("products");

    if (!cart || cart.products.length === 0) {
      return res
        .status(404)
        .json({ message: "Shopping cart is empty or not found" });
    }

    // Marcar carrito como completado
    cart.status = "completed";
    await cart.save();

    // Crear nueva orden de venta
    const newOrder = new SalesOrderModel({
      idShoppingCart: cart._id,
      paymentMethod: req.body.paymentMethod || "paypal",
      address: req.body.address || "Sin dirección",
      saleDate: new Date(),
      shippingTotal: req.body.shippingTotal || 5.75,
      total: cart.total + (req.body.shippingTotal || 5.75),
      shippingState: [{ state: "Pedido recibido", fecha: new Date() }],
    });

    await newOrder.save();

    // Responder con la orden generada
    res.status(201).json({
      message: "Cart completed and order created",
      order: await newOrder.populate({
        path: "idShoppingCart",
        populate: [{ path: "idUser" }, { path: "products" }],
      }),
    });
  } catch (error) {
    console.error("Error completing cart:", error);
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
    const cartId = req.params.idCart;

    const cart = await shoppingCartModel.findOne({
      _id: cartId,
      idUser: userId,
      status: "active",
    });
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
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

// REPORTES
// Obtener productos más vendidos
shoppingCartController.bestSellingProducts = async (req, res) => {
  try {
    const resultado = await shoppingCartModel.aggregate([
      // Descomponer productos
      { $unwind: "$products" },

      // Agrupar por idProduct y sumar la cantidad
      {
        $group: {
          _id: "$products.idProduct",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },

      // Ordenar de mayor a menor
      { $sort: { totalQuantity: -1 } },

      // Limitar a los 3 más vendidos
      { $limit: 3 },

      // Hacer lookup en la colección Products
      {
        $lookup: {
          from: "products", // nombre de la colección
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },

      // Desenrollar el arreglo productInfo
      { $unwind: "$productInfo" },

      // Proyectar solo los campos deseados
      {
        $project: {
          _id: 1,
          totalQuantity: 1,
          productName: "$productInfo.name",
          productPrice: "$productInfo.price",
        },
      },
    ]);

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error fetching best selling products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Exportar controlador para usar en rutas
export default shoppingCartController;
