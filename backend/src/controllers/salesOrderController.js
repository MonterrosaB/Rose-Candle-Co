// Importación del modelo
import SalesOrderModel from "../models/SalesOrder.js";


const salesOrderController = {};

// GET 
salesOrderController.getSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrderModel.find().populate("idShoppingCart");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las órdenes de venta", error });
  }
};

// POST 
salesOrderController.createSalesOrder = async (req, res) => {
  try {
    const {
      idShoppingCart,
      paymentMethod,
      adress,
      saleDate,
      shippingTotal,
      Total,
      shippingState
    } = req.body;

    const newOrder = new SalesOrderModel({
      idShoppingCart,
      paymentMethod,
      adress,
      saleDate,
      shippingTotal,
      Total,
      shippingState
    });

    await newOrder.save();
    res.json({ message: "Orden de venta guardada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar la orden de venta", error });
  }
};

// PUT
salesOrderController.updateSalesOrder = async (req, res) => {
  try {
    const {
      idShoppingCart,
      paymentMethod,
      adress,
      saleDate,
      shippingTotal,
      Total,
      shippingState
    } = req.body;

    await SalesOrderModel.findByIdAndUpdate(
      req.params.id,
      {
        idShoppingCart,
        paymentMethod,
        adress,
        saleDate,
        shippingTotal,
        Total,
        shippingState
      },
      { new: true }
    );

    res.json({ message: "Orden de venta actualizada" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la orden de venta", error });
  }
};

// DELETE 
salesOrderController.deleteSalesOrder = async (req, res) => {
  try {
    await SalesOrderModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Orden de venta eliminada" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar la orden de venta", error });
  }
};

export default salesOrderController;
