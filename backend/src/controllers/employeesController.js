import employeesModel from "../models/Employees.js"; // Modelo de empleados

// CRUD controller para empleados
const employeesController = {};

// GET - obtener todos los empleados
employeesController.getEmployees = async (req, res) => {
  try {
    const employees = await employeesModel.find(); // Buscar todos los empleados en la base de datos
    res.status(200).json(employees); // Responder con los empleados encontrados
  } catch (error) {
    console.error("Error al obtener empleados:", error); // Log de error en consola
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// DELETE - eliminar un empleado por ID
employeesController.deleteEmployees = async (req, res) => {
  try {
    const deletedEmployee = await employeesModel.findOneAndDelete({
      _id: req.params.id, // Buscar y eliminar por ID recibido en la URL
    });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" }); // Empleado no encontrado
    }

    res.status(200).json({ message: "Employee deleted" }); // Eliminación exitosa
  } catch (error) {
    console.error("Error al eliminar empleado:", error); // Log de error
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// PUT - actualizar un empleado por ID
employeesController.updateEmployees = async (req, res) => {
  // Extraer campos del cuerpo de la solicitud
  const { name, surnames, email, phone, dui, user, role } = req.body;

  console.log(req.body); // Mostrar contenido recibido

  try {
    // Validaciones básicas: campos requeridos y longitud mínima
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

    // Validaciones de longitud máxima
    if (name.length > 100 || surnames.length > 100) {
      return res.status(400).json({ message: "Campos demasiado largos" });
    }

    // Actualizar el empleado en la base de datos
    const employeeUpdated = await employeesModel.findByIdAndUpdate(
      req.params.id, // ID del empleado
      { name, surnames, email, phone, dui, user, role }, // Campos actualizados
      { new: true } // Retornar el documento actualizado
    );

    if (!employeeUpdated) {
      return res.status(404).json({ message: "Employee not found" }); // Empleado no encontrado
    }

    res
      .status(200)
      .json({ message: "Employee updated", employee: employeeUpdated }); // Actualización exitosa
  } catch (error) {
    console.error("Error al actualizar empleado:", error); // Log de error
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

// GET - contar número total de empleados
employeesController.countEmployees = async (req, res) => {
  try {
    const count = await employeesModel.countDocuments(); // Contar documentos en la colección
    res.status(200).json({ count }); // Responder con la cantidad
  } catch (error) {
    console.error("Error al contar empleados:", error); // Log de error
    res.status(500).json({ message: "Internal server error" }); // Error del servidor
  }
};

export default employeesController; // Exportar el controlador
