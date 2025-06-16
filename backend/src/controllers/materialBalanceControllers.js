import materialBalanceModel from "../models/materialBalance.js"; // Modelo de colecciones

// Array de métodos (CRUD)
const materialBalanceControllers = {};

// GET
materialBalanceControllers.getMaterialBalance = async (req, res) => {
    try {
        const MaterialBalance = await materialBalanceModel.find();
        res.status(200).json(MaterialBalance); // Todo bien
    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// POST
materialBalanceControllers.createMaterialBalance = async (req, res) => {
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

      if ( name.length > 100){
          return res.status(400).json({message: "Too large"}) // Error del cliente, longitud del texto muy larga
      }

      // Guardar datos
      const newMaterialBalance = new materialBalanceModel({ name });
      await newMaterialBalance.save();
      res.status(200).json({ message: "MaterialBalance saved" }); // Todo bien

  } catch (error) {
      console.log("error "+error)
      return res.status(500).json("Internal server error") // Error del servidor
  }
};

// PUT
materialBalanceControllers.updateMaterialBalance = async (req, res) => {
  // Obtener datos
  const { name } = req.body;

  try {
    // Validaciones
    if ( name.length < 3){
        return res.status(400).json({message: "Too short"}) // Error del cliente, longitud del texto muy corta
    }

    if ( name.length > 100){
        return res.status(400).json({message: "Too large"}) // Error del cliente, longitud del texto muy larga
    }

    // Guardar datos
    updatedMaterialBalance = await materialBalanceModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if(!updatedMaterialBalance){
        return res.status(400).json({message: "MaterialBalance not found"}) // Error del cliente, coleccion no encontrada
    }

    res.status(200).json({ message: "MaterialBalance updated" }); // Todo bien

  } catch (error) {
      console.log("error "+error)
      return res.status(500).json("Internal server error") // Error del servidor
  }
};

// DELETE
materialBalanceControllers.deleteMaterialBalance = async (req, res) => {
  try {
    const deletedMaterialBalance = await materialBalanceModel.findByIdAndDelete(req.params.id);

    if(!deletedMaterialBalance){
        return res.status(400).json({message: "MaterialBalance not found"}) // Error del cliente, coleccion no encontrada
    }

    res.status(200).json({ message: "MaterialBalance deleted" }); // Todo bien

  } catch (error) {
      console.log("error "+error)
      return res.status(500).json("Internal server error") // Error del servidor
  }
};

// Exportar
export default materialBalanceControllers;