import collectionModel from "../models/Collections.js"; // Modelo de colecciones

// Array de métodos (CRUD)
const collectionsController = {};

// GET
collectionsController.getCollections = async (req, res) => {
    try {
        const collections = await collectionModel.find();
        res.status(200).json(collections); // Todo bien
    } catch (error) {
        console.log("error "+error)
        res.status(500).json("Internal server error") // Error del servidor
    }
};

// POST
collectionsController.createCollection = async (req, res) => {
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
      const newCollection = new collectionModel({ name });
      await newCollection.save();
      res.status(200).json({ message: "Collection saved" }); // Todo bien

  } catch (error) {
      console.log("error "+error)
      return res.status(500).json("Internal server error") // Error del servidor
  }
};

// PUT
collectionsController.updateCollection = async (req, res) => {
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
    updatedCollection = await collectionModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if(!updatedCollection){
        return res.status(400).json({message: "Collection not found"}) // Error del cliente, coleccion no encontrada
    }

    res.status(200).json({ message: "Collection updated" }); // Todo bien

  } catch (error) {
      console.log("error "+error)
      return res.status(500).json("Internal server error") // Error del servidor
  }
};

// DELETE
collectionsController.deleteCollection = async (req, res) => {
  try {
    const deletedCollection = await collectionModel.findByIdAndDelete(req.params.id);

    if(!deletedCollection){
        return res.status(400).json({message: "Collection not found"}) // Error del cliente, coleccion no encontrada
    }

    res.status(200).json({ message: "Collection deleted" }); // Todo bien

  } catch (error) {
      console.log("error "+error)
      return res.status(500).json("Internal server error") // Error del servidor
  }
};

// Exportar
export default collectionsController;