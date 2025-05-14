// Array de métodos (CRUD)
const productPriceHistoryController = {};
import productPriceHistoryModel from "../models/ProductPriceHistory.js"

// GET
productPriceHistoryController.getProductPriceHistory = async (req, res) => {
    const productPriceHistory = await productPriceHistoryModel.find()
    res.json(productPriceHistory)
};

// POST
productPriceHistoryController.createProductPriceHistory = async (req, res) => {
    const { idProduct, reason, amountSold } = req.body;
    const newProductPriceHistory = new productPriceHistoryModel({ idProduct, reason, amountSold });
    await newProductPriceHistory.save()
    res.json({ message: "Saved Successfull"})
};

// DELETE
productPriceHistoryController.deleteProductPriceHistory = async (req, res) => {
    await productPriceHistoryModel.findOneAndDelete(req.params.id)
    res.json({ message: "Deleted Successfull"})
};

// PUT
productPriceHistoryController.updateProductPriceHistory = async (req, res) => {
    const { idProduct, reason, amountSold } = req.body;
    await productPriceHistoryModel.findByIdAndUpdate(req.params.id, {
        idProduct, 
        reason, 
        amountSold
    }, {new: true}
    );

    res.json({ message: "Updated Successfull"})
};

export default productPriceHistoryController;