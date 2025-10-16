import employeesModel from "../models/Employees.js"; // Modelo de empleados
import bcrypt from "bcryptjs"; // para encriptar
import { createLog } from "../utils/logger.js";

// CRUD controller para empleados
const employeesController = {};

// GET - obtener todos los empleados
employeesController.getEmployees = async (req, res) => {
  try {
    const employees = await employeesModel.find({ deleted: false }); // Buscar todas las colecciones, salvo las que no han sido eliminadas
    res.status(200).json(employees); // Responder con los empleados encontrados
  } catch (error) {
    console.error("Error al obtener empleados:", error); // Log de error en consola
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// GET - obtener un empleado por ID
employeesController.getEmployeesById = async (req, res) => {
  try {
    const employee = await employeesModel.findById(req.params.id);

    if (!employee || employee.deleted) {
      return res.status(404).json({ message: "Employee not found" }); // no encontrado
    }

    res.status(200).json(employee); // Responder con el empleado encontrado
  } catch (error) {
    console.error("Error al obtener empleado:", error);
    res.status(500).json({ message: "Internal server error" }); // error
  }
};

// SOFTDELETE - eliminar un empleado por ID
employeesController.softDeleteEmployees = async (req, res) => {
  try {
    const deletedEmployee = await employeesModel.findByIdAndUpdate(
      req.params.id,
      { deleted: true }, // Se marca como "eliminada"
      { new: true }
    ); // Eliminar por ID

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" }); // Empleado no encontrado
    }

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "archive",
      collectionAffected: "Employees",
      targetId: deletedEmployee._id,
      description: `Employee ${deletedEmployee.name} ${deletedEmployee.surnames} archived`,
    });

    res.status(200).json({ message: "Employee deleted" }); // Eliminación exitosa
  } catch (error) {
    console.error("Error al eliminar empleado:", error); // Log de error
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// DELETE - eliminar un empleado por ID
employeesController.hardDeleteEmployees = async (req, res) => {
  try {
    const deletedEmployee = await employeesModel.findByIdAndDelete(
      req.params.id
    ); // Eliminar por ID

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" }); // Empleado no encontrado
    }

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "delete",
      collectionAffected: "Employees",
      targetId: deletedEmployee._id,
      description: `Employee ${deletedEmployee.name} ${deletedEmployee.surnames} was deleted`,
    });

    res.status(200).json({ message: "Employee deleted" }); // Eliminación exitosa
  } catch (error) {
    console.error("Error al eliminar empleado:", error); // Log de error
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// PUT - actualizar un empleado por ID
employeesController.updateEmployees = async (req, res) => {
  const { name, surnames, email, phone, dui, user, role, password, isActive } =
    req.body;

  console.log(req.body);

  try {
    // Validaciones básicas
    if (
      !name ||
      name.length < 2 ||
      !surnames ||
      surnames.length < 2 ||
      !phone ||
      phone.length < 9 ||
      !dui ||
      dui.length < 10
    ) {
      return res.status(400).json({ message: "Campos inválidos o muy cortos" });
    }

    if (name.length > 100 || surnames.length > 100) {
      return res.status(400).json({ message: "Campos demasiado largos" });
    }

    // Objeto con datos a actualizar
    const updateData = {
      name,
      surnames,
      email,
      phone,
      dui,
      user,
      role,
      isActive,
    };

    // Si viene contraseña, encriptarla antes de guardar
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const employeeUpdated = await employeesModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!employeeUpdated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "update",
      collectionAffected: "Employees",
      targetId: employeeUpdated._id,
      description: `Employee ${employeeUpdated.name} ${employeeUpdated.surnames} was updated`,
    });

    res.status(200).json({
      message: "Employee updated",
    });
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Restaurar empleado "eliminado"
employeesController.restoreEmployees = async (req, res) => {
  try {
    const restoreEmployees = await employeesModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreEmployees) {
      return res.status(400).json({ message: "Employees not found" }); // No encontrada
    }

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "restore",
      collectionAffected: "Employees",
      targetId: restoreEmployees._id,
      description: `Employee ${restoreEmployees.name} ${restoreEmployees.surnames} archived`,
    });

    res.status(200).json({ message: "Customers restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// GET - contar número total de empleados
employeesController.countEmployees = async (req, res) => {
  try {
    const count = await employeesModel.countDocuments({ deleted: false }); // Contar documentos en la colección
    res.status(200).json({ count }); // Responder con la cantidad
  } catch (error) {
    console.error("Error al contar empleados:", error); // Log de error
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

export default employeesController; // Exportar el controlador
