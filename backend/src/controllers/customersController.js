// Array de métodos (CRUD)
const customersController = {};
import customersModel from "../models/Customers.js"

// GET
customersController.getCustomers = async (req, res) => {
    const customers = await customersModel.find()
    res.json(customers)
};

// POST
customersController.createCustomers = async (req, res) => {
    const { name, surnames, email, password, user, phone } = req.body;
    const newCustomer = new customersModel({ name, surnames, email, password, user, phone });
    await newCustomer.save()
    res.json({ message: "Customer saved"})
};

// DELETE
customersController.deleteCustomers = async (req, res) => {
    await customersModel.findOneAndDelete(req.params.id)
    res.json({ message: "Customer deleted"})
};

// PUT
customersController.updateCustomers = async (req, res) => {
    const { name, surnames, email, password, user, phone } = req.body;
    await customersModel.findByIdAndUpdate(req.params.id, {
        name, 
        surnames, 
        email, 
        password, 
        user,
        phone
    }, {new: true}
    );

    res.json({ message: "Customer updated"})
};

export default customersController;