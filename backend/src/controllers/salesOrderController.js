import SalesOrderModel from "../models/SalesOrder.js"; // Modelo de Orden

// Array de métodos (CRUD)
const salesOrderController = {};

// GET 
salesOrderController.getSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrderModel.find().populate("idShoppingCart");
    res.status(200).json(orders); // Todo bien
  } catch (error) {
      console.log("error "+error)
      res.status(500).json("Internal server error") // Error del servidor
  }
};

// POST 
salesOrderController.createSalesOrder = async (req, res) => {
  // Obtener datos
  const { idShoppingCart, paymentMethod, address, saleDate, shippingTotal, total, shippingState} = req.body;

  try {
    // Validaciones
    if( !idShoppingCart || !paymentMethod || !address || !saleDate || !shippingTotal || !total || !shippingState ){
        return res.status(400).json({message: "Please complete all the fields"}) // Error del cliente, campos vacios
    }

    if( address.length < 5 ){
        return res.status(400).json({message: "Please an extra address information"}) // Error del cliente, dirección incorrecta
    }

    if(total < 0){
        return res.status(400).json({message: "The total can't be less than 0"}) // Error del cliente, el total no puede ser menor a 0
    }

    // Guardar datos
    const newOrder = new SalesOrderModel({ idShoppingCart, paymentMethod, address, saleDate, shippingTotal, total, shippingState});
    await newOrder.save();
    res.status(200).json({ message: "Order saved" }); // Todo bien

  } catch (error) {
        console.log("error "+error)
        return res.status(500).json("Internal server error") // Error del servidor
  }
};

// PUT
salesOrderController.updateSalesOrder = async (req, res) => {
  // Obtener datos
  const { idShoppingCart, paymentMethod, address, saleDate, shippingTotal, total, shippingState} = req.body;

  try {
      // Validaciones
      if( address.length < 5 ){
          return res.status(400).json({message: "Please an extra address information"}) // Error del cliente, dirección incorrecta
      }

      if(total < 0){
          return res.status(400).json({message: "The total can't be less than 0"}) // Error del cliente, el total no puede ser menor a 0
      }

      // Guardar datos
      orderUpdated = await SalesOrderModel.findByIdAndUpdate(
        req.params.id,
        {idShoppingCart, paymentMethod, address, saleDate, shippingTotal, total, shippingState},
        { new: true }
      );

      if(!orderUpdated){
          return res.status(400).json({message: "Order not found"}) // Error del cliente, orden no encontrada
      }  

      res.status(200).json({ message: "Order updated" }); // Todo bien

  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la orden de venta", error });
  }
};

// DELETE 
salesOrderController.deleteSalesOrder = async (req, res) => {
  try {
      const deletedOrder = await SalesOrderModel.findByIdAndDelete(req.params.id);

      if(!deletedOrder){
          return res.status(400).json({message: "Order not found"}) // Error del cliente, orden no encontrada
      } 

      res.status(200).json({ message: "Order deleted" }); // Todo bien
      
  } catch (error) {
      console.log("error "+error)
      return res.status(500).json("Internal server error") // Error del servidor  
  }
};

// Exportar
export default salesOrderController;