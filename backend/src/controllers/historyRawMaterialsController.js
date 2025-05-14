// Array de métodos (CRUD)
const historyRawMaterialsController = {};
import historyRawMaterialsModel from "../models/HistoryRawMaterials.js"

// GET
historyRawMaterialsController.getHistoriRawMaterials = async (req, res) => {
    const historyRawMaterials = await historyRawMaterialsModel.find()
    res.json(historyRawMaterials)
};

// POST
historyRawMaterialsController.createHistoriRawMaterials = async (req, res) => {
    const { price, idRawMateria } = req.body;
    const newHistoryRawMaterial = new historyRawMaterialsModel({ price, idRawMateria });
    await newHistoryRawMaterial.save()
    res.json({ message: "Saved Successfully"})
};

// DELETE
historyRawMaterialsController.deleteHistoriRawMaterials = async (req, res) => {
    await historyRawMaterialsModel.findOneAndDelete(req.params.id)
    res.json({ message: "Deleted Successfully"})
};

// PUT
historyRawMaterialsController.updateHistoriRawMaterials = async (req, res) => {
    const { price, idRawMateria } = req.body;
    await historyRawMaterialsModel.findByIdAndUpdate(req.params.id, {
        price, 
        idRawMateria
    }, {new: true}
    );

    res.json({ message: "Updated Successfully"})
};

export default historyRawMaterialsController;