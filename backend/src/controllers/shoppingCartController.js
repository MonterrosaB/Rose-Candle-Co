import shoppingCartModel from "../models/ShoppingCart.js" // Modelo de Carrito de Compras

// Array de métodos (CRUD)
const shoppingCartController = {};

// GET
shoppingCartController.getCart = async (req, res) => {
    try {
        const shoppingCart = await shoppingCartModel.find().populate("idUser").populate("products")
        res.status().json(shoppingCart) // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
}
 
// POST
shoppingCartController.createCart = async (req, res) => {
    //Obtener datos
    const{idUser, creationDate, products, total} = req.body;

    try {
        // Validaciones
        if( !idUser || !creationDate || !products || !total ){
            return res.status(400).json({message: "Please complete all the fields"}) // Error del cliente, campos vacios
        }

        if(total < 0){
            return res.status(400).json({message: "The total can't be less than 0"}) // Error del cliente, el total no puede ser menor a 0
        }

        // Guardar datos
        const newCart = new shoppingCartModel ({idUser, creationDate, products, total});
        await newCart.save()
        res.status(200).json({ message : "Shopping cart saved "}); // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
}
 
// DELETE
shoppingCartController.deleteCart = async (req, res) => {
    try {
        const deletedCart = await shoppingCartModel.findOneAndDelete(req.params.id)
        
        if(!deletedCart){
            return res.status(400).json({message: "Shopping Cart not found"}) // Error del cliente, no se encontró el carrito
        }

        res.status(200).json({message:"Shopping cart deleted"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
}

// PUT
shoppingCartController.updateCart = async (req, res) => {
    // Obtener datos
    const {idUser, creationDate, products, total} = req.body;

    try {
        // Validaciones
        if(total < 0){
            return res.status(400).json({message: "The total can't be less than 0"}) // Error del cliente, el total no puede ser menor a 0
        }

        // Guardar datos
        const updatedCart = await shoppingCartModel.findByIdAndUpdate(
            req.params.id,
            {idUser, creationDate, products, total},
            {new: true}
        );

        if(!updatedCart){
            return res.status(400).json({message: "Shopping Cart not found"}) // Error del cliente, no se encontró el carrito
        }

        res.status(200).json({ message: "Shopping cart uptated"}); // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// Exportar
export default shoppingCartController;