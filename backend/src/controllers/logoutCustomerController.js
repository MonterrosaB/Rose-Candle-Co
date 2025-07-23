// Controlador para cerrar sesión de clientes
const logoutCustomerController = {};

// Método para cerrar sesión del cliente
logoutCustomerController.logout = async (req, res) => {
  // Eliminar la cookie "authToken" con opciones de seguridad
  res.clearCookie("authToken", {
    httpOnly: true, // Protege la cookie para que no sea accesible desde JavaScript del cliente
    secure: true, // Solo enviar cookie en conexiones HTTPS
    sameSite: "strict", // Restringe la cookie para que solo se envíe en el mismo sitio
  });

  // Responder con estado 200 y mensaje de confirmación
  return res.status(200).json({ message: "Session closed" });
};

// Exportar controlador
export default logoutCustomerController;
