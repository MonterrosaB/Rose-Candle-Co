import shoppingCartModel from "../models/ShoppingCart.js"; // Modelo de Carrito de Compras

// Array de métodos (CRUD)
const shoppingCartController = {};

// GET todos los carritos
shoppingCartController.getCart = async (req, res) => {
    try {
        const shoppingCart = await shoppingCartModel.find().populate("idUser").populate("products");
        res.status(200).json(shoppingCart); // Todo bien
    } catch (error) {
        console.log("error " + error);
        res.status(500).json("Internal server error"); // Error del servidor
    }
};

// GET carrito por ID (nuevo método)
shoppingCartController.getCartById = async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await shoppingCartModel.findById(cartId).populate("idUser").populate("products");

        if (!cart) {
            return res.status(404).json({ message: "Shopping cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.log("error " + error);
        res.status(500).json("Internal server error"); // Error del servidor
    }
};

// POST crear carrito
shoppingCartController.createCart = async (req, res) => {
    // Obtener datos
    const { idUser, creationDate, products, total } = req.body;

    try {
        // Validaciones
        if (!idUser || !creationDate || !products || !total) {
            return res.status(400).json({ message: "Please complete all the fields" }); // Error cliente
        }

        if (total < 0) {
            return res.status(400).json({ message: "The total can't be less than 0" }); // Error cliente
        }

        // Guardar datos
        const newCart = new shoppingCartModel({ idUser, creationDate, products, total });
        await newCart.save();
        res.status(200).json({ message: "Shopping cart saved" }); // Todo bien
    } catch (error) {
        console.log("error " + error);
        res.status(500).json("Internal server error"); // Error servidor
    }
};

// DELETE carrito
shoppingCartController.deleteCart = async (req, res) => {
    try {
        const deletedCart = await shoppingCartModel.findOneAndDelete(req.params.id);

        if (!deletedCart) {
            return res.status(400).json({ message: "Shopping Cart not found" }); // Error cliente
        }

        res.status(200).json({ message: "Shopping cart deleted" }); // Todo bien
    } catch (error) {
        console.log("error " + error);
        res.status(500).json("Internal server error"); // Error servidor
    }
};

// PUT actualizar carrito
shoppingCartController.updateCart = async (req, res) => {
    // Obtener datos
    const { idUser, creationDate, products, total } = req.body;

    try {
        // Validaciones
        if (total < 0) {
            return res.status(400).json({ message: "The total can't be less than 0" }); // Error cliente
        }

        // Guardar datos
        const updatedCart = await shoppingCartModel.findByIdAndUpdate(
            req.params.id,
            { idUser, creationDate, products, total },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(400).json({ message: "Shopping Cart not found" }); // Error cliente
        }

        res.status(200).json({ message: "Shopping cart updated" }); // Todo bien
    } catch (error) {
        console.log("error " + error);
        res.status(500).json("Internal server error"); // Error servidor
    }
};

// Exportar
export default shoppingCartController;
