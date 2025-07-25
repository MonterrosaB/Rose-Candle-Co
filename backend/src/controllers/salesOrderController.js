import SalesOrderModel from "../models/SalesOrder.js"; // Modelo de Orden de Venta

// Controlador con métodos CRUD para Ordenes de Venta
const salesOrderController = {};

// GET - Obtener todas las órdenes de venta
salesOrderController.getSalesOrders = async (req, res) => {
  try {
    // Buscar todas las órdenes y popular el campo idShoppingCart con los datos correspondientes
    const orders = await SalesOrderModel.find().populate("idShoppingCart");
    // Enviar las órdenes encontradas al cliente con status 200
    res.status(200).json(orders); // Todo bien
  } catch (error) {
    console.log("error " + error);
    // En caso de error inesperado, responder con error 500
    res.status(500).json("Internal server error"); // Error del servidor
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
    // Buscar y eliminar orden por ID recibido en URL
    const deletedOrder = await SalesOrderModel.findByIdAndDelete(req.params.id);

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

// Exportar controlador para usarlo en rutas
export default salesOrderController;
