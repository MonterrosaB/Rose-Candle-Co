import SalesOrderModel from "../models/SalesOrder.js"; // Modelo de Orden de Venta
import Customers from "../models/Customers.js";
import ShoppingCart from "../models/ShoppingCart.js";

// Controlador con métodos CRUD para Ordenes de Venta
const salesOrderController = {};

// GET - Obtener todas las órdenes de venta
salesOrderController.getSalesOrders = async (req, res) => {
  try {
    // Buscar todas las órdenes y popular el campo idShoppingCart con los datos correspondientes
    const orders = await SalesOrderModel.find() // Buscar todas las colecciones, salvo las que no han sido eliminadas
      .populate({
        path: "idShoppingCart",
        populate: [
          { path: "idUser", select: "name" },
          { path: "products.idProduct", select: "name" },
        ],
      });

    // Calcular el total de productos y precio total por cada orden
    const ordersWithTotals = orders.map((order) => {
      const products = order.idShoppingCart?.products || [];
      const totalQuantity = products.length; // número de productos
      const totalPrice = products.reduce((acc, prod) => {
        const price = prod.currentPrice * (1 - (prod.discount || 0) / 100);
        return acc + price;
      }, 0);

      return {
        ...order.toObject(),
        totalQuantity,
        totalPrice: totalPrice.toFixed(2),
      };
    });

    res.json(ordersWithTotals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las órdenes" });
  }
};

// POST - Crear una nueva orden de venta
salesOrderController.createSalesOrder = async (req, res) => {
  // Obtener datos desde el cuerpo de la petición
  const {
    idShoppingCart,
    paymentMethod,
    address,
    saleDate,
    shippingTotal,
    total,
    shippingState,
  } = req.body;

  try {
    // Validaciones básicas para evitar datos incompletos
    if (
      !idShoppingCart ||
      !paymentMethod ||
      !address ||
      !saleDate ||
      !shippingTotal ||
      !total ||
      !shippingState
    ) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" }); // Campos vacíos
    }

    // Validar que la dirección tenga información mínima
    if (address.length < 5) {
      return res
        .status(400)
        .json({ message: "Please provide additional address information" }); // Dirección inválida
    }

    // Validar que el total sea positivo o cero
    if (total < 0) {
      return res
        .status(400)
        .json({ message: "The total can't be less than 0" }); // Total inválido
    }

    // Crear nueva instancia del modelo con los datos recibidos
    const newOrder = new SalesOrderModel({
      idShoppingCart,
      paymentMethod,
      address,
      saleDate,
      shippingTotal,
      total,
      shippingState,
    });

    // Guardar la nueva orden en la base de datos
    await newOrder.save();

    // Responder con mensaje de éxito
    res.status(200).json({ message: "Order saved" }); // Todo bien
  } catch (error) {
    console.log("error " + error);
    // Responder con error de servidor en caso de fallo inesperado
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// ---------------- POST - Crear nueva orden manual ----------------
salesOrderController.createSalesOrderPrivate = async (req, res) => {
  const { name, email, paymentMethod, address, products, total } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    // 1️Crear cliente mínimo

    const customer = await Customers.create({
      name,
      email,
      addresses: [{ address: address, default: true }],
    });

    console.log(req.body);

    //  Crear carrito
    const cart = await ShoppingCart.create({
      idUser: customer._id,
      products,
      total: total,
      status: "active",
    });

    // Crear orden
    const newOrder = await SalesOrderModel.create({
      idShoppingCart: cart._id,
      paymentMethod,
      shippingTotal: 0,
      total: total,
      shippingState: [{ state: "Pendiente" }],
    });

    res.status(200).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT - Actualizar una orden de venta existente por ID
salesOrderController.updateSalesOrder = async (req, res) => {
  // Obtener datos desde el cuerpo de la petición
  const {
    idShoppingCart,
    paymentMethod,
    address,
    saleDate,
    shippingTotal,
    total,
    shippingState,
  } = req.body;

  try {
    // Validaciones similares a la creación para evitar datos inválidos
    if (address.length < 5) {
      return res
        .status(400)
        .json({ message: "Please provide additional address information" }); // Dirección inválida
    }

    if (total < 0) {
      return res
        .status(400)
        .json({ message: "The total can't be less than 0" }); // Total inválido
    }

    // Actualizar la orden en la base de datos, buscando por ID de la URL (req.params.id)
    const orderUpdated = await SalesOrderModel.findByIdAndUpdate(
      req.params.id,
      {
        idShoppingCart,
        paymentMethod,
        address,
        saleDate,
        shippingTotal,
        total,
        shippingState,
      },
      { new: true } // Retornar el documento actualizado
    );

    // Validar si la orden existía
    if (!orderUpdated) {
      return res.status(400).json({ message: "Order not found" }); // Orden no encontrada
    }

    // Responder con mensaje de éxito
    res.status(200).json({ message: "Order updated" }); // Todo bien
  } catch (error) {
    // Capturar error y responder con mensaje y detalle
    res.status(400).json({ message: "Error updating sales order", error });
  }
};

// DELETE - Eliminar una orden de venta por ID
salesOrderController.deleteSalesOrder = async (req, res) => {
  try {
    const deletedOrder = await SalesOrderModel.findByIdAndUpdate(
      req.params.id,
      { deleted: true }, // Se marca como "eliminada"
      { new: true }
    ); // Eliminar por ID

    // Validar si la orden existía
    if (!deletedOrder) {
      return res.status(400).json({ message: "Order not found" }); // Orden no encontrada
    }

    // Responder con mensaje de éxito
    res.status(200).json({ message: "Order deleted" }); // Todo bien
  } catch (error) {
    console.log("error " + error);
    // Responder con error de servidor si ocurre un problema inesperado
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// PUT - Restaurar orden eliminada
salesOrderController.restoreSalesOrder = async (req, res) => {
  try {
    const restoreSalesOrder = await SalesOrderModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreSalesOrder) {
      return res.status(400).json({ message: "Restore Sales order not found" }); // No encontrada
    }

    res.status(200).json({ message: "Restore Sales Order restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// REPORTES
// CONTAR CANTIDAD DE PEDIDOS
salesOrderController.countSalesOrderAndTotal = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), 1)
    );
    const startOfNextMonth = new Date(
      Date.UTC(now.getFullYear(), now.getMonth() + 1, 1)
    );

    const result = await SalesOrderModel.aggregate([
      {
        $match: {
          saleDate: {
            $gte: startOfMonth,
            $lt: startOfNextMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalVentas: { $sum: "$total" },
          cantidadPedidos: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalVentas: 1,
          cantidadPedidos: 1,
          averageOrderValue: {
            $cond: [
              { $eq: ["$cantidadPedidos", 0] },
              0,
              { $divide: ["$totalVentas", "$cantidadPedidos"] },
            ],
          },
        },
      },
    ]);

    return res.json(
      result[0] || {
        totalVentas: 0,
        cantidadPedidos: 0,
        averageOrderValue: 0,
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET POR CATEGORÍAS
salesOrderController.getProductByCategory = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), 1)
    );
    const startOfNextMonth = new Date(
      Date.UTC(now.getFullYear(), now.getMonth() + 1, 1)
    );

    const result = await SalesOrderModel.aggregate([
      // 1. Lookup al carrito de compras
      {
        $lookup: {
          from: "shoppingcarts",
          localField: "idShoppingCart",
          foreignField: "_id",
          as: "shoppingCart",
        },
      },
      { $unwind: "$shoppingCart" },

      // 2. Lookup a los productos del carrito
      {
        $lookup: {
          from: "products",
          localField: "shoppingCart.products",
          foreignField: "_id",
          as: "products",
        },
      },

      // 3. Lookup a las categorías de los productos
      {
        $lookup: {
          from: "productcategories",
          localField: "products.idProductCategory",
          foreignField: "_id",
          as: "categories",
        },
      },

      // 4. Extraer solo los nombres de categoría únicos por orden
      {
        $project: {
          categorias: {
            $setUnion: "$categories.name",
          },
        },
      },

      // 5. Descomponer por categoría
      {
        $unwind: "$categorias",
      },

      // 6. Agrupar por categoría y contar órdenes
      {
        $group: {
          _id: "$categorias",
          totalVentas: { $sum: 1 },
        },
      },

      // 7. Calcular total global de órdenes
      {
        $group: {
          _id: null,
          categorias: {
            $push: {
              nombre: "$_id",
              totalVentas: "$totalVentas",
            },
          },
          totalGlobal: { $sum: "$totalVentas" },
        },
      },

      // 8. Calcular porcentaje
      {
        $unwind: "$categorias",
      },
      {
        $project: {
          _id: 0,
          categoria: "$categorias.nombre",
          totalVentas: "$categorias.totalVentas",
          porcentaje: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$categorias.totalVentas", "$totalGlobal"] },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },
    ]);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Cantidad de pedidos en general, y del mes actual
salesOrderController.countOrdersGeneralAndMonthly = async (req, res) => {
  try {
    const now = new Date(); // Obtener fecha
    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1) // Inicio
    );
    const startOfNextMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1) // Fin de mes
    );

    // Total de pedidos (sin filtro de fecha)
    const totalOrders = await SalesOrderModel.countDocuments();

    // Pedidos del mes actual
    const currentMonthOrders = await SalesOrderModel.countDocuments({
      saleDate: {
        $gte: startOfMonth,
        $lt: startOfNextMonth,
      },
    });

    res.status(200).json({
      // todo bien, responde con ambas cantidades
      totalOrders,
      currentMonthOrders,
    });
  } catch (error) {
    console.error("Error al contar pedidos:", error);
    res.status(500).json({ message: "Error interno del servidor" }); // Error
  }
};

// GET DE INGRESOS TOTALES
salesOrderController.totalEarnings = async (req, res) => {
  try {
    // fecha
    const now = new Date();
    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1) // Inicio
    );
    const startOfNextMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1) // Fin de mes
    );

    // Total general (sin filtro de fecha)
    const totalEarningsResult = await SalesOrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$total" },
        },
      },
    ]);

    const totalEarnings = totalEarningsResult[0]?.totalEarnings || 0;

    // Total del mes actual
    const monthlyEarningsResult = await SalesOrderModel.aggregate([
      {
        $match: {
          saleDate: {
            $gte: startOfMonth,
            $lt: startOfNextMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          monthlyEarnings: { $sum: "$total" },
        },
      },
    ]);

    const monthlyEarnings = monthlyEarningsResult[0]?.monthlyEarnings || 0;

    res.status(200).json({
      // todo bien
      totalEarnings,
      monthlyEarnings,
    });
  } catch (error) {
    console.error("Error al obtener ingresos:", error);
    res.status(500).json({ message: "Internal server error" }); // error
  }
};

// Obtener los últimos pedidos
salesOrderController.getLatestOrders = async (req, res) => {
  try {
    // Buscar las últimas 10 órdenes (ordenadas por fecha descendente)
    const orders = await SalesOrderModel.find()
      .sort({ saleDate: -1 })
      .limit(10)
      .populate({
        path: "idShoppingCart",
        populate: { path: "idUser", select: "name" },
      });

    // Formatear los datos con los campos requeridos
    const formattedOrders = orders.map((order) => {
      return {
        Nombre: order.idShoppingCart?.idUser?.name || "Desconocido",
        "Fecha Pedido": order.saleDate,
        Ubicación: order.address,
        "Productos Totales": order.idShoppingCart?.products?.length || 0,
      };
    });

    res.status(200).json(formattedOrders); // todo bien
  } catch (error) {
    console.error("Error al obtener últimos pedidos:", error);
    res.status(500).json({ message: "Internal server error" }); // error
  }
};


// GET - Obtener carrito activo de un usuario y sus productos
salesOrderController.getUserCartWithProducts = async (req, res) => {
  const { userId } = req.params.userId;

  try {
    // Buscamos la orden cuyo carrito activo corresponde al usuario
    const order = await SalesOrderModel.find({ "idShoppingCart.idUser": userId })
      .populate({
        path: "idShoppingCart",
        populate: [
          { path: "idUser", select: "name" },
          {
            path: "products.idProduct",
            select: "name images",
          },
        ],
      });

    return res.status(200).json(order); // Aquí `shippingStates` ya va incluido
  } catch (error) {
    console.error("Error al obtener la orden con carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Exportar controlador para usarlo en rutas
export default salesOrderController;
