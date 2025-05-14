// Array de métodos (CRUD)
const employeesController = {};
import employeesModel from "../models/Employees.js"

// GET
employeesController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find()
    res.json(employees)
};

// POST
employeesController.createEmployees = async (req, res) => {
    const { name, surnames, email, phone, dui, password, user, isActive } = req.body;
    const newEmployee = new employeesModel({ name, surnames, email, phone, dui, password, user, isActive });
    await newEmployee.save()
    res.json({ message: "Employee saved"})
};

// DELETE
employeesController.deleteEmployees = async (req, res) => {
    await employeesModel.findOneAndDelete(req.params.id)
    res.json({ message: "Employee deleted"})
};

// PUT
employeesController.updateEmployees = async (req, res) => {
    const { name, surnames, email, phone, dui, password, user, isActive } = req.body;
    await employeesModel.findByIdAndUpdate(req.params.id, {
        name, 
        surnames, 
        email, 
        phone, 
        dui, 
        password, 
        user,
        isActive
    }, {new: true}
    );

    res.json({ message: "Employee updated"})
};

export default employeesController;