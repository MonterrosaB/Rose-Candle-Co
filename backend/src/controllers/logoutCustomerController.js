const logoutCustomerController = {};
 
logoutCustomerController.logout = async (req, res) => {
    res.clearCookie("authToken");
 
    return res.json({message: "Session closed"})
}
 
export default logoutCustomerController;