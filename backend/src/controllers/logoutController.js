// Controlador para cerrar sesión
const logoutController = {};

// Método para cerrar sesión del usuario
logoutController.logout = async (req, res) => {
  // Eliminar la cookie que contiene el token de autenticación
  res.clearCookie("authTokenR");

  // Responder con mensaje de confirmación
  return res.status(200).json({ message: "Session closed" });
};

// Exportar controlador
export default logoutController;
