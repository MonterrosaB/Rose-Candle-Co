import SalesOrderModel from "../models/SalesOrder.js"; // Modelo de Orden de Venta
import Customers from "../models/Customers.js";
import ShoppingCart from "../models/ShoppingCart.js";
import ProductsModel from "../models/Products.js";
import RawMaterialModel from "../models/RawMaterials.js";
import MaterialBalanceModel from "../models/MaterialBalance.js";
import ProductionCostHistory from "../models/ProductionCostHistory.js";

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
          { path: "idUser", select: "name email" },
          { path: "products.idProduct", select: "name" },
        ],
      })
      .sort({ saleDate: -1 }); // Ordenar por fecha descendente (más nuevo primero)

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
  const {
    idShoppingCart,
    paymentMethod,
    address,
    saleDate,
    total,
    shippingState,
  } = req.body;

  try {
    // Validaciones básicas
    if (
      !idShoppingCart ||
      !paymentMethod ||
      !address ||
      !saleDate ||
      !total ||
      !shippingState
    ) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" });
    }

    if (!address.firstName || !address.lastName || !address.address) {
      return res.status(400).json({
        message: "Please provide first name, last name, and address",
      });
    }

    if (total < 0) {
      return res
        .status(400)
        .json({ message: "The total can't be less than 0" });
    }

    // 1️⃣ Crear la orden
    const newOrder = new SalesOrderModel({
      idShoppingCart,
      paymentMethod,
      address,
      saleDate,
      total,
      shippingState,
    });

    await newOrder.save();

    // 2️⃣ Actualizar el carrito como completed
    const updatedCart = await ShoppingCart.findByIdAndUpdate(
      idShoppingCart,
      { status: "completed" },
      { new: true }
    );

    // 3️⃣ Responder con éxito y detalles de la orden y carrito
    res.status(200).json({
      message: "Order saved and cart updated",
      order: newOrder,
      cart: updatedCart,
    });
  } catch (error) {
    console.log("Error creating order:", error);
    return res.status(500).json("Internal server error");
  }
};

// ---------------- POST - Crear nueva orden manual ----------------
salesOrderController.createSalesOrderPrivate = async (req, res) => {
  try {
    const { name, email, paymentMethod, products, total, addresses } = req.body;

    // 1️⃣ Validar campos requeridos
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Products array is required and cannot be empty",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method is required",
      });
    }

    if (!addresses || !Array.isArray(addresses) || addresses.length === 0) {
      return res.status(400).json({
        message: "At least one address is required",
      });
    }

    // 2️⃣ Verificar si el cliente ya existe o crearlo
    let customer = await Customers.findOne({ email });

    if (!customer) {
      customer = await Customers.create({
        name,
        email,
        addresses, // ✅ ahora guardamos el array completo
      });
    } else {
      // Si el cliente existe, aseguramos que no pierda sus direcciones
      customer.addresses.push(...addresses); // spread porque addresses es un array
      await customer.save();
    }

    // 3️⃣ Crear carrito
    const cart = await ShoppingCart.create({
      idUser: customer._id,
      products,
      total,
      status: "completed",
    });

    // 4️⃣ Crear orden (usa addresses array)
    const newOrder = await SalesOrderModel.create({
      idShoppingCart: cart._id,
      paymentMethod,
      shippingTotal: 0,
      total,
      shippingState: [{ state: "Pendiente" }],
      address: addresses[0], //  guardamos array en SalesOrder
    });

    return res.status(201).json({
      message: "Sales order created successfully",
      order: newOrder,
      customerId: customer._id,
    });
  } catch (error) {
    console.error("Error creating sales order:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// PUT - Actualizar una orden de venta existente por ID
salesOrderController.updateSalesOrder = async (req, res) => {
  const { shippingState } = req.body;

  try {
    // Actualizar la orden agregando el nuevo estado
    const orderUpdated = await SalesOrderModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          shippingState: { state: shippingState },
        },
      },
      { new: true }
    );

    if (!orderUpdated) {
      return res.status(400).json({ message: "Order not found" });
    }

    // Si el estado es "completado", descontar materias primas y registrar balance
    if (shippingState.toLowerCase() === "completado") {
      const cart = await ShoppingCart.findById(orderUpdated.idShoppingCart);
      if (!cart)
        return res.status(400).json({ message: "Shopping cart not found" });

      for (const cartItem of cart.products) {
        const product = await ProductsModel.findById(cartItem.idProduct);
        if (!product) continue;

        const variant = product.variant[cartItem.selectedVariantIndex];

        for (const comp of variant.components) {
          // Descontar stock de materia prima
          const material = await RawMaterialModel.findByIdAndUpdate(
            comp.idComponent,
            { $inc: { currentStock: -comp.amount * cartItem.quantity } },
            { new: true }
          );

          if (material) {
            // Registrar movimiento en MaterialBalance
            await MaterialBalanceModel.create({
              idMaterial: material._id,
              movement: "salida",
              amount: comp.amount * cartItem.quantity,
              unitPrice: material.unitPrice || 0, // tomar precio unitario actual
              reference: `Orden de venta ${orderUpdated._id}`,
            });
          }
        }
      }
    }

    res.status(200).json({ message: "Order updated" });
  } catch (error) {
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
    const orders = await SalesOrderModel.aggregate([
      { $sort: { saleDate: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "shoppingcarts",
          localField: "idShoppingCart",
          foreignField: "_id",
          as: "cart",
        },
      },
      { $unwind: "$cart" },
      {
        $lookup: {
          from: "customers",
          localField: "cart.idUser",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $addFields: {
          itemsOrdered: { $sum: "$cart.products.quantity" },
        },
      },
      {
        $project: {
          _id: 1,
          customerName: "$user.name",
          purchaseDate: "$saleDate",
          shippingAddress: "$address.address",
          itemsOrdered: 1,
          totalAmount: "$total",
        },
      },
    ]);

    res.status(200).json(orders); // todo bien
  } catch (error) {
    console.error("Error al obtener últimos pedidos:", error);
    res.status(500).json({ message: "Internal server error" }); // error
  }
};

// GET - Obtener carrito activo de un usuario y sus productos
salesOrderController.getUserCartWithProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    // Buscar todas las órdenes y poblar solo los carritos que pertenecen a este usuario
    const order = await SalesOrderModel.find().populate({
      path: "idShoppingCart",
      match: { idUser: userId }, // filtra carritos por usuario
      populate: [
        { path: "idUser", select: "name" },
        { path: "products.idProduct", select: "name images" },
      ],
    });

    // Opcional: filtrar en el resultado los que no tengan carrito coincidente
    const filteredOrder = order.filter((o) => o.idShoppingCart !== null);

    return res.status(200).json(filteredOrder);
  } catch (error) {
    console.error("Error al obtener la orden con carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

salesOrderController.getSalesEvolution = async (req, res) => {
  const salesEvolution = await SalesOrderModel.aggregate([
    // Traer el carrito asociado
    {
      $lookup: {
        from: "shoppingcarts",
        localField: "idShoppingCart",
        foreignField: "_id",
        as: "cart",
      },
    },
    { $unwind: "$cart" },

    // Desglosar productos del carrito
    { $unwind: "$cart.products" },

    {
      $group: {
        _id: {
          year: { $year: "$saleDate" },
          month: { $month: "$saleDate" },
        },
        totalSales: { $sum: "$total" }, // total en $
        totalOrders: { $addToSet: "$_id" }, // evitar duplicados de orden
        totalProducts: { $sum: "$cart.products.quantity" }, // productos vendidos
      },
    },
    {
      $project: {
        year: "$_id.year",
        month: "$_id.month",
        totalSales: 1,
        totalOrders: { $size: "$totalOrders" },
        totalProducts: 1,
        _id: 0,
      },
    },
    { $sort: { year: 1, month: 1 } },
  ]);

  return res.status(200).json(salesEvolution); // Aquí `shippingStates` ya va incluido
};

salesOrderController.getTotalSalesAndProfit = async (req, res) => {
  try {
    const result = await SalesOrderModel.aggregate([
      // 1️⃣ Filtrar órdenes válidas
      {
        $match: {
          "shippingState.state": { $ne: "cancelado" },
        },
      },
      // 2️⃣ Traer carrito
      {
        $lookup: {
          from: "shoppingcarts",
          localField: "idShoppingCart",
          foreignField: "_id",
          as: "cart",
        },
      },
      { $unwind: "$cart" },
      { $unwind: "$cart.products" }, // Cada producto por fila

      // 3️⃣ Traer historial de costos de producción
      {
        $lookup: {
          from: "productioncosthistories",
          let: { productId: "$cart.products.idProduct" },
          pipeline: [
            { $match: { $expr: { $eq: ["$idProduct", "$$productId"] } } },
            { $sort: { date: -1 } }, // Último costo
            { $limit: 1 },
          ],
          as: "costHistory",
        },
      },
      { $unwind: { path: "$costHistory", preserveNullAndEmptyArrays: true } },

      // 4️⃣ Tomar la variante correspondiente
      {
        $addFields: {
          variantCost: {
            $arrayElemAt: [
              { $ifNull: ["$costHistory.variants", []] },
              "$cart.products.selectedVariantIndex",
            ],
          },
        },
      },

      // 5️⃣ Calcular costo y ganancia
      {
        $addFields: {
          productCost: { $ifNull: ["$variantCost.productionCost", 0] },
          quantity: "$cart.products.quantity",
          productSubtotal: "$cart.products.subtotal",
          profit: {
            $subtract: [
              "$cart.products.subtotal",
              {
                $multiply: [
                  { $ifNull: ["$variantCost.productionCost", 0] },
                  "$cart.products.quantity",
                ],
              },
            ],
          },
        },
      },

      // 6️⃣ Sumarizar ventas y ganancias totales
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$productSubtotal" },
          totalProfit: { $sum: "$profit" },
        },
      },
    ]);

    res.json(result[0] || { totalSales: 0, totalProfit: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al calcular ventas y ganancias" });
  }
};

salesOrderController.getSalesAndProfitSummary = async (req, res) => {
  try {
    const now = new Date();
    const monthsArray = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = d.toISOString().slice(0, 7); // YYYY-MM
      return { month: monthStr, totalSales: 0, totalProfit: 0 };
    });

    const result = await SalesOrderModel.aggregate([
      // 1️⃣ Filtrar órdenes válidas
      {
        $match: {
          "shippingState.state": { $ne: "cancelado" },
        },
      },
      // 2️⃣ Traer carrito
      {
        $lookup: {
          from: "shoppingcarts",
          localField: "idShoppingCart",
          foreignField: "_id",
          as: "cart",
        },
      },
      { $unwind: "$cart" },
      { $unwind: "$cart.products" },

      // 3️⃣ Traer historial de costos de producción
      {
        $lookup: {
          from: "productioncosthistories",
          let: { productId: "$cart.products.idProduct" },
          pipeline: [
            { $match: { $expr: { $eq: ["$idProduct", "$$productId"] } } },
            { $sort: { date: -1 } }, // último costo
            { $limit: 1 },
          ],
          as: "costHistory",
        },
      },
      { $unwind: { path: "$costHistory", preserveNullAndEmptyArrays: true } },

      // 4️⃣ Tomar la variante correspondiente
      {
        $addFields: {
          variantCost: {
            $arrayElemAt: [
              { $ifNull: ["$costHistory.variants", []] },
              "$cart.products.selectedVariantIndex",
            ],
          },
        },
      },

      // 5️⃣ Calcular costo y ganancia
      {
        $addFields: {
          productCost: { $ifNull: ["$variantCost.productionCost", 0] },
          quantity: "$cart.products.quantity",
          productSubtotal: "$cart.products.subtotal",
          profit: {
            $subtract: [
              "$cart.products.subtotal",
              {
                $multiply: [
                  { $ifNull: ["$variantCost.productionCost", 0] },
                  "$cart.products.quantity",
                ],
              },
            ],
          },
          saleDate: "$saleDate",
        },
      },

      // 6️⃣ Agrupar por periodos
      {
        $facet: {
          daily: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$saleDate" },
                },
                totalSales: { $sum: "$productSubtotal" },
                totalProfit: { $sum: "$profit" },
              },
            },
            { $sort: { _id: 1 } },
          ],
          monthly: [
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$saleDate" } },
                totalSales: { $sum: "$productSubtotal" },
                totalProfit: { $sum: "$profit" },
              },
            },
            { $sort: { _id: 1 } },
          ],
          last6Months: [
            {
              $match: {
                saleDate: {
                  $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1),
                },
              },
            },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$saleDate" } },
                totalSales: { $sum: "$productSubtotal" },
                totalProfit: { $sum: "$profit" },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);

    // Mapear meses con datos reales
    const fillMonths = (data) => {
      return monthsArray
        .map((m) => {
          const found = data.find((d) => d._id === m.month);
          return found
            ? {
                _id: m.month,
                totalSales: found.totalSales,
                totalProfit: found.totalProfit,
              }
            : { _id: m.month, totalSales: 0, totalProfit: 0 };
        })
        .reverse(); // Para ordenar cronológicamente del más antiguo al más reciente
    };

    const stats = result[0] || { daily: [], monthly: [], last6Months: [] };
    stats.last6Months = fillMonths(stats.last6Months);

    res.json(stats);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al calcular estadísticas de ventas y ganancias" });
  }
};

// Exportar controlador para usarlo en rutas
export default salesOrderController;
