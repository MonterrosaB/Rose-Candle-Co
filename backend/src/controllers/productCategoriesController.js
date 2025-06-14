import productCategories from "../models/ProductCategories.js";

const productCategoriesController = {};

// GET
productCategoriesController.getproductCategories = async (req, res) => {
    try {
        const productCategory = await productCategories.find()
        res.status(200).json(productCategory) // Todo bien
    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};


// POST
productCategoriesController.createProductCategory = async (req, res) => {
    // Obtener datos
    const { name } = req.body;

    try {
        // Validaciones
        if( !name){
            return res.status(400).json({message: "Please complete all the fields"}) // Error del cliente, campos vacios
        }

        if ( name.length < 3){
            return res.status(400).json({message: "Too short"}) // Error del cliente, longitud del texto muy corta
        }

        if ( name.length > 50){
            return res.status(400).json({message: "Too long"}) // Error del cliente, longitud del texto muy larga
        }

        // Guardar datos
        const newProductCategory = new productCategories({name});
        await newProductCategory.save()
        res.status(200).json({ message: "Saved Successfull"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// DELETE
productCategoriesController.deleteProductCategory = async (req, res) => {
    try {
        const deleteProductCategory = await productCategories.findByIdAndDelete(req.params.id)
        
        if(!deleteProductCategory){
            return res.status(400).json({message: "Category not found"}) // Error del cliente, categoria no encontrado
        }

        res.status(200).json({ message: "Deleted Successfull"}) //Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// PUT
productCategoriesController.updateProductCategory = async (req, res) => {
    // Obtener datos
    const { name } = req.body;

    try {
        // Validaciones
        if ( name.length < 3){
            return res.status(400).json({message: "Too short"}) // Error del cliente, longitud del texto muy corta
        }

        if ( name.length > 50){
            return res.status(400).json({message: "Too long"}) // Error del cliente, longitud del texto muy larga
        }

        // Guardar datos
        const categoryUpdated = await productCategories.findByIdAndUpdate(
            req.params.id, 
            {name}, 
            {new: true}
        );

        if(!categoryUpdated){
            return res.status(400).json({message: "Category not found"}) // Error del cliente, categoria no encontrado
        }

        res.status(200).json({ message: "Updated Successfull"}) // Todo bien

    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    } 
};

export default productCategoriesController;