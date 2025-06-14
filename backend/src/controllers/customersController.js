import customersModel from "../models/Customers.js" // Modelo de Clientes

// Array de métodos (CRUD)
const customersController = {};

// GET
customersController.getCustomers = async (req, res) => {
    try {
        const customers = await customersModel.find()
        res.status(200).json(customers) // Todo bien
    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// POST
customersController.createCustomers = async (req, res) => {
    // Obtener datos
    const { name, surnames, email, password, user, phone } = req.body;

    try {
        // Validaciones
        if( !name || !surnames || !email || !phone || !password || !user ){
            return res.status(400).json({message: "Please complete all the fields"}) // Error del cliente, campos vacios
        }

        if ( name.length < 3 || surnames.length < 3 || phone.length < 9 || password.length < 8){
            return res.status(400).json({message: "Too short"}) // Error del cliente, longitud del texto muy corta
        }

        if ( name.length > 100 || surnames.length > 100){
            return res.status(400).json({message: "Too large"}) // Error del cliente, longitud del texto muy larga
        }

        // Guardar datos
        const newCustomer = new customersModel({ name, surnames, email, password, user, phone });
        await newCustomer.save()
        res.status(200).json({ message: "Customer saved"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        return res.status(500).json("Internal server error") // Error del servidor
    }
};

// DELETE
customersController.deleteCustomers = async (req, res) => {
    try {
        const deletedCustomer = await customersModel.findOneAndDelete(req.params.id)

        if(!deletedCustomer){
            return res.status(400).json({message: "Customer not found"}) // Error del cliente, cliente no encontrado
        }

        res.status(200).json({ message: "Customer deleted"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        return res.status(500).json("Internal server error") // Error del servidor
    }
};

// PUT
customersController.updateCustomers = async (req, res) => {
    // Obtener datos
    const { name, surnames, email, password, user, phone } = req.body;

    try {
        // Validaciones
        if ( name.length < 3 || surnames.length < 3 || phone.length < 9 || password.length < 8){
            return res.status(400).json({message: "Too short"}) // Error del cliente, longitud del texto muy corta
        }

        if ( name.length > 100 || surnames.length > 100){
            return res.status(400).json({message: "Too large"}) // Error del cliente, longitud del texto muy larga
        }

        // Guardar datos
        customerUpdated = await customersModel.findByIdAndUpdate(
            req.params.id,
            { name, surnames, email, password, user, phone },
            {new: true}
        );

        if(!customerUpdated){
            return res.status(400).json({message: "Customer not found"}) // Error del cliente, cliente no encontrado
        }    

        res.status(200).json({ message: "Customer updated"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        return res.status(500).json("Internal server error") // Error del servidor
    }
};

// Exportar
export default customersController;