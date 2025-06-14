import historyRawMaterialsModel from "../models/HistoryRawMaterials.js" // Modelo de Historial de precios de materia prima

// Array de métodos (CRUD)
const historyRawMaterialsController = {};

// GET
historyRawMaterialsController.getHistoriRawMaterials = async (req, res) => {
    try {
        const historyRawMaterials = await historyRawMaterialsModel.find()
        res.status(200).json(historyRawMaterials) // Todo bien
    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// POST
historyRawMaterialsController.createHistoriRawMaterials = async (req, res) => {
    // Obtener datos
    const { price, idRawMateria } = req.body;

    try {
        // Validaciones
        if( !price || !idRawMateria){
            return res.status(400).json({message: "Please complete all the fields"}) // Error del cliente, campos vacios
        }

        if ( price < 0){
            return res.status(400).json({message: "The price can't be less than 0"}) // Error del cliente, el precio no puede ser menor que 0
        }

        // Guardar datos
        const newHistoryRawMaterial = new historyRawMaterialsModel({ price, idRawMateria });
        await newHistoryRawMaterial.save()
        res.status(200).json({ message: "Saved Successfully"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// DELETE
historyRawMaterialsController.deleteHistoriRawMaterials = async (req, res) => {
    try {
        const deletedHistory = await historyRawMaterialsModel.findOneAndDelete(req.params.id)

        if(!deletedHistory){
            return res.status(400).json({message: "History not found"}) // Error del cliente, historial no encontrado
        }

        res.status(200).json({ message: "Deleted Successfully"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// PUT
historyRawMaterialsController.updateHistoriRawMaterials = async (req, res) => {
    // Obtener datos
    const { price, idRawMateria } = req.body;

    try {
        // Validaciones
        if ( price < 0){
            return res.status(400).json({message: "The price can't be less than 0"}) // Error del cliente, el precio no puede ser menor que 0
        }

        // Guardar datos
        historyUpdated = await historyRawMaterialsModel.findByIdAndUpdate(
            req.params.id, 
            { price, idRawMateria },
            { new: true }
        );

        if(!historyUpdated){
            return res.status(400).json({message: "History not found"}) // Error del cliente, historial no encontrado
        }
    
        res.status(200).json({ message: "Updated Successfully"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        return res.status(500).json("Internal server error") // Error del servidor
    }
};

// Exportar
export default historyRawMaterialsController;