import employeesModel from "../models/Employees.js";

// CRUD controller para empleados
const employeesController = {};

// GET - obtener todos los empleados
employeesController.getEmployees = async (req, res) => {
  try {
    const employees = await employeesModel.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE - eliminar un empleado por ID
employeesController.deleteEmployees = async (req, res) => {
  try {
    const deletedEmployee = await employeesModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT - actualizar un empleado por ID
employeesController.updateEmployees = async (req, res) => {
  const { name, surnames, email, phone, dui, user, role } = req.body;

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

    const employeeUpdated = await employeesModel.findByIdAndUpdate(
      req.params.id,
      { name, surnames, email, phone, dui, user, role },
      { new: true }
    );

    if (!employeeUpdated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee updated", employee: employeeUpdated });
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET - contar número total de empleados
employeesController.countEmployees = async (req, res) => {
  try {
    const count = await employeesModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error al contar empleados:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default employeesController;
