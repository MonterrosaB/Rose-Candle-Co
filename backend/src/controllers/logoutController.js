const logoutController = {};
 
logoutController.logout = async (req, res) => {
    res.clearCookie("authToken");
 
    return res.json({message: "Session closed"})
}
 
export default logoutController;