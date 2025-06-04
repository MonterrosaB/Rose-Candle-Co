// Array de métodos ( C R U D)
const shoppingCartController = {};


import shoppingCartModel from "../models/ShoppingCart.js"
 
//GET
shoppingCartController.getCart = async (req, res) => {
const shoppingCart = await shoppingCartModel.find().populate("idUser").populate("products")
res.json(shoppingCart)
}
 
// POST
shoppingCartController.createCart = async (req, res) => {
    const{idUser, creationDate, products, total} = req.body;
    const newCart = new shoppingCartModel ({idUser, creationDate, products, total});
    await newCart.save()
    res.json({ message : "Shopping cart saved "});
}
 
//DELETE-
shoppingCartController.deleteCart = async (req, res) => {
await shoppingCartModel.findOneAndDelete(req.params.id)
res.json({message:"Shopping cart deleted"})
}

//PUT
shoppingCartController.updateCart = async (req, res) => {
    const {idUser, creationDate, products, total} = req.body;
    await shoppingCartModel.findByIdAndUpdate(req.params.id,{
        idUser,
        creationDate,
        products,
        total
    },{new: true}
);
res.json({ message: "Shopping cart uptated"});
};

export default shoppingCartController;