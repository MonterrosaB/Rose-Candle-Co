// Controlador para cerrar sesión
const logoutController = {};

// Método para cerrar sesión del usuario
logoutController.logout = async (req, res) => {
  // Eliminar la cookie que contiene el token de autenticación
  res.clearCookie("authToken");

  // Eliminar segunda cookie
  res.clearCookie("authTokenR", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    path: "/",
  });

  // Responder con mensaje de confirmación
  return res.json({ message: "Session closed" });
};

// Exportar controlador
export default logoutController;
