import employeesModel from "../models/Employees.js" // Modelo de empleados

// Array de métodos (CRUD)
const employeesController = {};

// GET
employeesController.getEmployees = async (req, res) => {
    try {
        const employees = await employeesModel.find()
        res.status(200).json(employees) // Todo bien
    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// POST
employeesController.createEmployees = async (req, res) => {
    // Obtener datos
    const { name, surnames, email, phone, dui, password, user, isActive } = req.body;

    try {
        // Validaciones
        if( !name || !surnames || !email || !phone || !dui || !password || !user || !isActive ){
            return res.status(400).json({message: "Please complete all the fields"}) // Error del cliente, campos vacios
        }
        
        if ( name.length < 3 || surnames.length < 3 || phone.length < 9 || dui.length < 10 || password.length < 8){
            return res.status(400).json({message: "Too short"}) // Error del cliente, longitud del texto muy corta
        }

        if ( name.length > 100 || surnames.length > 100){
            return res.status(400).json({message: "Too large"}) // Error del cliente, longitud del texto muy larga
        }

        // Guardar datos
        const newEmployee = new employeesModel({ name, surnames, email, phone, dui, password, user, isActive });
        await newEmployee.save()
        res.status(200).json({ message: "Employee saved"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        return res.status(500).json("Internal server error") // Error del servidor
    }
};

// DELETE
employeesController.deleteEmployees = async (req, res) => {
    try {
        const deletedEmployee = await employeesModel.findOneAndDelete(req.params.id)

        if(!deletedEmployee){
            return res.status(400).json({message: "Employee not found"}) // Error del cliente, empleado no encontrado
        }

        res.status(200).json({ message: "Employee deleted"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        return res.status(500).json("Internal server error") // Error del servidor
    }
};

// PUT
employeesController.updateEmployees = async (req, res) => {
    // Obtener datos
    const { name, surnames, email, phone, dui, password, user, isActive } = req.body;

    try {
        // Validaciones
        if ( name.length < 3 || surnames.length < 3 || phone.length < 9 || dui.length < 10 || password.length < 8){
            return res.status(400).json({message: "Too short"}) // Error del cliente, longitud del texto muy corta
        }

        if ( name.length > 100 || surnames.length > 100){
            return res.status(400).json({message: "Too large"}) // Error del cliente, longitud del texto muy larga
        }

        // Guardar datos
        employeeUpdated = await employeesModel.findByIdAndUpdate(
            req.params.id, 
            { name, surnames, email, phone, dui, password, user, isActive},
            {new: true}
        );

        if(!employeeUpdated){
            return res.status(400).json({message: "Employee not found"}) // Error del cliente, empleado no encontrado
        }

        res.status(200).json({message: "Employee updated"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        return res.status(500).json("Internal server error") // Error del servidor
    }
};

// Exportar controlador
export default employeesController;