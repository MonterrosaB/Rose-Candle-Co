import employeesModel from "../models/Employees.js";

// Este middleware permite el paso si NO hay usuarios, o pasa el control al siguiente middleware (authMiddleware)
export const initialAccessCheck = async (req, res, next) => {
  try {
    const employeeCount = await employeesModel.countDocuments();

    if (employeeCount === 0) {
      // Caso 1: ¡No hay usuarios! Es el primer registro.
      // Permitimos el paso para crear el Super Admin.
      // El controlador de registro (registerEmployee) DEBE forzar el rol 'super_admin'.
      console.log(
        "ACCESO INICIAL: Base de datos vacía. Se permite el registro sin autenticación."
      );
      return next();
    } else {
      // Caso 2: Ya hay usuarios. Se requiere autenticación.
      // Pasamos el control al siguiente middleware en la cadena (que debe ser el authMiddleware).
      return next();
    }
  } catch (error) {
    console.error("Error al verificar el conteo de empleados:", error);
    return res
      .status(500)
      .json({
        message: "Error interno del servidor en la verificación inicial.",
      });
  }
};
