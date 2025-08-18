import customersModel from "../models/Customers.js"; // Modelo de Clientes
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

// GET - obtener un cliente por ID
customersController.getCustomersById = async (req, res) => {
  try {
    const customer = await customersModel.findById(req.params.id);

    if (!customer || customer.deleted) {
      return res.status(404).json({ message: "Customer not found" }); // no encontrado
    }

    res.status(200).json(customer); // Responder con el cliente encontrado
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ message: "Internal server error" }); // error
  }
};

// Obtener direcciones del usuario
customersController.getCustomersAddress = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    // Decodificar token para obtener el ID del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    // Buscar solo direcciones del usuario
    const customer = await customersModel.findOne(
      { _id: userID, deleted: false },
      { addresses: 1 } // solo obtener el campo addresses
    );

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json(customer.addresses || []);
  } catch (error) {
    console.error("Error obteniendo direcciones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
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
  const { name, surnames, email, phone } = req.body;

  try {
    // Validaciones de longitud mínima
    if (
      name.length < 3 ||
      surnames.length < 3 ||
      phone.length < 9
    ) {
      return res.status(400).json({ message: "Too short" }); // Datos demasiado cortos
    }

    // Validaciones de longitud máxima
    if (name.length > 100 || surnames.length > 100) {
      return res.status(400).json({ message: "Too large" }); // Datos demasiado largos
    }

    // Actualizar cliente en base de datos
    const customerUpdated = await customersModel.findByIdAndUpdate(
      req.params.id,
      { name, surnames, email, phone },
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

// Restaurar cliente eliminado
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
    const count = await customersModel.countDocuments({ deleted: false }); // Contar documentos en la colección, solo los que estén activos
    res.status(200).json({ count }); // Responder con la cantidad
  } catch (error) {
    console.error("Error al contar usuarios:", error); // Log de error
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// GET - USUARIOS TOTALES EL ÚLTIMO MES
customersController.countCustomersByMonth = async (req, res) => {
  try {
    const now = new Date();

    // Inicio del mes actual
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Inicio del mes siguiente
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Consulta con filtros
    const count = await customersModel.countDocuments({
      createdAt: {
        $gte: startOfMonth,
        $lt: startOfNextMonth,
      },
      deleted: false, // Solo las cuentas activas
    });

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error al contar usuarios:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Obtener direcciones de un cliente
customersController.getAddresses = async (req, res) => {
  try {
    const customer = await customersModel.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json(customer.addresses || []);
  } catch (error) {
    console.error("Error al obtener direcciones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Agregar una dirección al cliente
customersController.addAddress = async (req, res) => {
  const { firstName, lastName, state, city, zipCode, phone, address } =
    req.body;

  try {
    const customer = await customersModel.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    customer.addresses.push({
      firstName,
      lastName,
      state,
      city,
      zipCode,
      phone,
      address,
      type,
    });

    await customer.save();
    res
      .status(201)
      .json({ message: "Dirección agregada", addresses: customer.addresses });
  } catch (error) {
    console.error("Error al agregar dirección:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar una dirección específica por su _id
customersController.deleteAddress = async (req, res) => {
  const { id, addressId } = req.params;

  try {
    const customer = await customersModel.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    customer.addresses = customer.addresses.filter(
      (addr) => addr._id.toString() !== addressId
    );

    await customer.save();
    res
      .status(200)
      .json({ message: "Dirección eliminada", addresses: customer.addresses });
  } catch (error) {
    console.error("Error al eliminar dirección:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Editar una dirección específica
customersController.updateAddress = async (req, res) => {
  const { id, addressId } = req.params;
  const { firstName, lastName, state, city, zipCode, phone, address } =
    req.body;

  try {
    const customer = await customersModel.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const addr = customer.addresses.id(addressId);
    if (!addr) {
      return res.status(404).json({ message: "Dirección no encontrada" });
    }

    // Actualizar todos los campos si vienen en el body
    addr.firstName = firstName ?? addr.firstName;
    addr.lastName = lastName ?? addr.lastName;
    addr.state = state ?? addr.state;
    addr.city = city ?? addr.city;
    addr.zipCode = zipCode ?? addr.zipCode;
    addr.phone = phone ?? addr.phone;
    addr.address = address ?? addr.address;

    await customer.save();

    res.status(200).json({
      message: "Dirección actualizada",
      addresses: customer.addresses,
    });
  } catch (error) {
    console.error("Error al actualizar dirección:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar contraseña
customersController.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.params;

  try {
    const customer = await customersModel.findById(id);
    if (!customer) return res.status(404).json({ message: "Cliente no encontrado" });

    // Comparar contraseña actual con la guardada (hashed)
    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    // Hashear la nueva contraseña
    customer.password = await bcrypt.hash(newPassword, 10);
    await customer.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Exportar el controlador
export default customersController;
