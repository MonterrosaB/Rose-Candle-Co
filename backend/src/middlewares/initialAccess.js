import employeesModel from "../models/Employees.js";
import authEmployee from "./authEmployees.js"; // Asegúrate de que la ruta de importación sea correcta

// Este middleware permite el paso si NO hay usuarios, o aplica la autenticación normal
export const initialAccessCheck = async (req, res, next) => {
  try {
    const employeeCount = await employeesModel.countDocuments();

    if (employeeCount === 0) {
      // Caso 1: ¡No hay usuarios! Es el primer registro.
      // Permitimos el paso directamente al controlador de registro.
      console.log(
        "ACCESO INICIAL: Base de datos vacía. Se permite el registro sin autenticación."
      );
      // Pasa al siguiente middleware/controlador
      return next();
    } else {
      // Caso 2: Ya hay usuarios. Se requiere autenticación.
      console.log(
        "ACCESO NORMAL: Ya hay usuarios. Se aplica el control de autenticación."
      );
      // Aplicamos la lógica de autenticación (authEmployee) directamente.
      // Si authEmployee es exitoso, llama a next() y continúa.
      // Si falla, authEmployee enviará un 401 y detendrá la ejecución.
      return authEmployee(req, res, next);
    }
  } catch (error) {
    console.error("Error al verificar el conteo de empleados:", error);
    return res.status(500).json({
      message: "Error interno del servidor en la verificación inicial.",
    });
  }
};
