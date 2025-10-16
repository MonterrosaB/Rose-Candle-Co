import Logs from "../models/Logs.js";

// Controlador con métodos CRUD para proveedores
const logsControllers = {};

// GET - Obtener todos los proveedores
logsControllers.getLogs = async (req, res) => {
  try {
    // Buscar todos los documentos de proveedores en la colección
    // Obtiene los logs, ordenados por 'createdAt' de forma descendente (-1)
    const logs = await Logs.find().sort({ createdAt: -1 }).populate({
      path: "user", // El campo en el esquema Logs que contiene el ObjectId a la colección Employees
      select: "name surnames", // Los campos del documento Employees que deseas traer
    });
    // Enviar listado completo de proveedores con código 200
    res.status(200).json(logs);
  } catch (error) {
    // Mostrar error en consola y enviar respuesta 500
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

export default logsControllers;
