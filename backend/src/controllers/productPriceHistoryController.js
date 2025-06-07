import productPriceHistoryModel from "../models/ProductPriceHistory.js" // Modelo de ProductPriceHistory

// Array de métodos (CRUD)
const productPriceHistoryController = {};

// GET
productPriceHistoryController.getProductPriceHistory = async (req, res) => {
    try {
        const productPriceHistory = await productPriceHistoryModel.find()
        res.status(200).json(productPriceHistory) // Todo bien
    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// POST
productPriceHistoryController.createProductPriceHistory = async (req, res) => {
    // Obtener datos
    const { idProduct, reason, amountSold } = req.body;

    try {
        // Validaciones
        if( !idProduct || !reason || !amountSold ){
            return res.status(400).json({message: "Please complete all the fields"}) // Error del cliente, campos vacios
        }

        if ( reason.length < 5 ){
            return res.status(400).json({message: "Too short"}) // Error del cliente, longitud del texto muy corta
        }

        if ( amountSold < 0 ){
            return res.status(400).json({message: "The amount can't be less than 0"}) // Error del cliente, el monto no puede ser menor que 0
        }

        // Guardar datos
        const newProductPriceHistory = new productPriceHistoryModel({ idProduct, reason, amountSold });
        await newProductPriceHistory.save()
        res.status(200).json({ message: "Saved Successfull"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// DELETE
productPriceHistoryController.deleteProductPriceHistory = async (req, res) => {
    try {
        const deletedHistory = await productPriceHistoryModel.findOneAndDelete(req.params.id)
        
        if(!deletedHistory){
            return res.status(400).json({message: "History not found"}) // Error del cliente, historial no encontrado
        }

        res.status(200).json({ message: "Deleted Successfull"}) //Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// PUT
productPriceHistoryController.updateProductPriceHistory = async (req, res) => {
    // Obtener datos
    const { idProduct, reason, amountSold } = req.body;

    try {
        // Validaciones
        if ( reason.length < 5 ){
            return res.status(400).json({message: "Too short"}) // Error del cliente, longitud del texto muy corta
        }

        if ( amountSold < 0 ){
            return res.status(400).json({message: "The amount can't be less than 0"}) // Error del cliente, el monto no puede ser menor que 0
        }

        // Guardar datos
        historyUpdated = await productPriceHistoryModel.findByIdAndUpdate(
            req.params.id, 
            {idProduct, reason, amountSold}, 
            {new: true}
        );

        if(!historyUpdated){
            return res.status(400).json({message: "History not found"}) // Error del cliente, historial no encontrado
        }

        res.status(200).json({ message: "Updated Successfull"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    } 
};

// Exportar
export default productPriceHistoryController;