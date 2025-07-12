const logoutCustomerController = {};
 
logoutCustomerController.logout = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true, // o true si usas HTTPS
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Session closed" });
};

 
export default logoutCustomerController;