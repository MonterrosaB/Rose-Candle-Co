import customersModel from "../models/Customers.js"; // Modelo de Clientes

// Objeto que agrupa los métodos CRUD para clientes
const customersController = {};

// GET - Obtener todos los clientes
customersController.getCustomers = async (req, res) => {
  try {
    const customers = await customersModel.find(); // Buscar todos los clientes
    res.status(200).json(customers); // Respuesta exitosa
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// DELETE - Eliminar un cliente por ID
customersController.deleteCustomers = async (req, res) => {
  try {
    const deletedCustomer = await customersModel.findOneAndDelete(
      req.params.id
    ); // Eliminar por ID

    if (!deletedCustomer) {
      return res.status(400).json({ message: "Customer not found" }); // Cliente no encontrado
    }

    res.status(200).json({ message: "Customer deleted" }); // Eliminación exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// PUT - Actualizar un cliente por ID
customersController.updateCustomers = async (req, res) => {
  // Obtener datos del cuerpo de la solicitud
  const { name, surnames, email, password, user, phone } = req.body;

  try {
    // Validaciones de longitud mínima
    if (
      name.length < 3 ||
      surnames.length < 3 ||
      phone.length < 9 ||
      password.length < 8
    ) {
      return res.status(400).json({ message: "Too short" }); // Datos demasiado cortos
    }

    // Validaciones de longitud máxima
    if (name.length > 100 || surnames.length > 100) {
      return res.status(400).json({ message: "Too large" }); // Datos demasiado largos
    }

    // Actualizar cliente en base de datos
    customerUpdated = await customersModel.findByIdAndUpdate(
      req.params.id,
      { name, surnames, email, password, user, phone },
      { new: true } // Retornar documento actualizado
    );

    if (!customerUpdated) {
      return res.status(400).json({ message: "Customer not found" }); // Cliente no encontrado
    }

    res.status(200).json({ message: "Customer updated" }); // Actualización exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// Exportar el controlador
export default customersController;
