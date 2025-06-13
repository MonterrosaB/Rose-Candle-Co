import productsModel from "../models/Products.js";

const productsController = {};

// GET
productsController.getproducts = async (req, res) => {
  try {
    const product = await productsModel.find().populate("idProductCategory");
    res.status(200).json(product); // Todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// POST
productsController.createProduct = async (req, res) => {
  // Obtener datos
  const {
    name,
    description,
    images,
    components,
    recipe,
    availability,
    useForm,
    currentPrice,
    idProductCategory,
  } = req.body;

  try {
    // Validaciones
    if (
      !name ||
      !description ||
      !images ||
      !components ||
      !recipe ||
      !availability ||
      !useForm ||
      !currentPrice ||
      !idProductCategory
    ) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" }); // Error del cliente, campos vacios
    }

    if (name.length < 3) {
      return res.status(400).json({ message: "Too short" }); // Error del cliente, longitud del texto muy corta
    }

    if (name.length > 70) {
      return res.status(400).json({ message: "Too long" }); // Error del cliente, longitud del texto muy larga
    }

    if (description.length < 15) {
      return res.status(400).json({ message: "Too short" }); // Error del cliente, longitud del texto muy corta
    }

    if (images.minItems > 1) {
      return res.status(400).json({ message: "Agrega al menos una imagen" }); // Error del cliente, longitud del texto muy larga
    }

    if (images.maxItems > 4) {
      return res
        .status(400).json({ message: "No puedes poner mas de cuatro imagenes" }); // Error del cliente, longitud del texto muy larga
    }

    if (availability.enum != true || availability.enum != false) {
        return res
          .status(400).json({ message: "La disponibilidad debe ser true or false" }); // Error del cliente, longitud del texto muy larga
      }

    // Guardar datos
    const newProduct = new productsModel({
      name,
      description,
      images,
      components,
      recipe,
      availability,
      useForm,
      currentPrice,
      idProductCategory,
    });
    await newProduct.save();
    res.status(200).json({ message: "Saved Successfull" }); // Todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// DELETE
productsController.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await productsModel.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
      return res.status(400).json({ message: "Product not found" }); // Error del cliente, categoria no encontrado
    }
    res.status(200).json({ message: "Deleted Successfull" }); //Todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// PUT
productsController.updateProduct = async (req, res) => {
  // Obtener datos
  const {
    name,
    description,
    images,
    components,
    recipe,
    availability,
    useForm,
    currentPrice,
    idProductCategory,
  } = req.body;

  try {
    // Validaciones
    if (name.length < 3) {
      return res.status(400).json({ message: "Too short" }); // Error del cliente, longitud del texto muy corta
    }

    if (name.length > 70) {
      return res.status(400).json({ message: "Too long" }); // Error del cliente, longitud del texto muy larga
    }

    if (description.length < 15) {
      return res.status(400).json({ message: "Too short" }); // Error del cliente, longitud del texto muy corta
    }

    if (images.minItems > 1) {
      return res.status(400).json({ message: "Agrega al menos una imagen" }); // Error del cliente, longitud del texto muy larga
    }

    if (images.maxItems > 4) {
      return res
        .status(400)
        .json({ message: "No puedes poner mas de cuatro imagenes" }); // Error del cliente, longitud del texto muy larga
    }

    // Guardar datos
    const productUpdated = await productsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        images,
        components,
        recipe,
        availability,
        useForm,
        currentPrice,
        idProductCategory,
      },
      { new: true }
    );

    if (!productUpdated) {
      return res.status(400).json({ message: "Product not found" }); // Error del cliente, categoria no encontrado
    }

    res.status(200).json({ message: "Updated Successfull" }); // Todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

export default productsController;
