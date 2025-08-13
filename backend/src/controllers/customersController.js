import customersModel from "../models/Customers.js"; // Modelo de Clientes

// Objeto que agrupa los métodos CRUD para clientes
const customersController = {};

// GET - Obtener todos los clientes
customersController.getCustomers = async (req, res) => {
  try {
    const customers = await customersModel.find({ deleted: false }); // Buscar todas las colecciones, salvo las que no han sido eliminadas
    res.status(200).json(customers); // Respuesta exitosa
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// DELETE - Eliminar un cliente por ID
customersController.deleteCustomers = async (req, res) => {
  try {
    const deletedCustomer = await customersModel.findByIdAndUpdate(
      req.params.id,
      { deleted: true }, // Se marca como "eliminada"
      { new: true }
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
customersController.restoreCustomers = async (req, res) => {
  try {
    const restoredcustomers = await customersModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoredcustomers) {
      return res.status(400).json({ message: "Customers not found" }); // No encontrada
    }

    res.status(200).json({ message: "Customers restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// REPORTES
// GET - USUARIOS TOTALES
customersController.countCustomers = async (req, res) => {
  try {
    const count = await customersModel.countDocuments(); // Contar documentos en la colección
    res.status(200).json({ count }); // Responder con la cantidad
  } catch (error) {
    console.error("Error al contar usuarios:", error); // Log de error
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// GET - USUARIOS TOTALES EL ÚLTIMO MES
customersController.countCustomersByMonth = async (req, res) => {
  try {
    // Obtener la fecha del mes actual
    const now = new Date();

    // Inicio del mes actual
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Inicio del mes siguiente
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Consulta con rango
    const count = await customersModel.countDocuments({
      createdAt: {
        $gte: startOfMonth,
        $lt: startOfNextMonth,
      },
    });

    res.status(200).json({ count }); // Responder con el conteo
  } catch (error) {
    console.error("Error al contar usuarios:", error);
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// Exportar el controlador
export default customersController;
