import productsModel from "../models/Products.js";

import { config } from "../config.js";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.CLOUDINARY.cloudinary_name,
  api_key: config.CLOUDINARY.cloudinary_api_key,
  api_secret: config.CLOUDINARY.cloudinary_api_secret,
});

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
  console.log(req.body); // Verifica qué contiene req.body

  // Obtener datos
  const {
    name,
    description,
    components,
    recipe,
    availability,
    useForm,
    currentPrice,
    idProductCategory,
  } = req.body;

  let imagesURL = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "public",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      imagesURL.push(result.secure_url);
    }
  }

  try {
    // Validaciones
    if (
      !name ||
      !description ||
      !imagesURL || imagesURL.length < 1 ||
      !components || components.length < 1 ||
      !recipe || recipe.length < 1 ||
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

    if (description.length < 5) {
      return res.status(400).json({ message: "Too short" }); // Error del cliente, longitud del texto muy corta
    }

    if (imagesURL.length < 1) {
      return res.status(400).json({ message: "Agrega al menos una imagen" });
    }

    if (imagesURL.length > 4) {
      return res
        .status(400)
        .json({ message: "No puedes subir más de cuatro imágenes" });
    }

    //if (availability !== true && availability !== false) {
    //  return res
    //  .status(400)
    //.json({ message: "La disponibilidad debe ser true o false" }); // Error de validación
    //}

    // Guardar datos
    const newProduct = new productsModel({
      name,
      description,
      images: imagesURL,
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

  let imagesURL = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "public",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      imagesURL.push(result.secure_url);
    }
  }

  try {
    // Validaciones
    if (name.length < 3) {
      return res.status(400).json({ message: "Too short" }); // Error del cliente, longitud del texto muy corta
    }

    if (name.length > 70) {
      return res.status(400).json({ message: "Too long" }); // Error del cliente, longitud del texto muy larga
    }

    if (description.length < 5) {
      return res.status(400).json({ message: "Too short" }); // Error del cliente, longitud del texto muy corta
    }

    if (imagesURL.length < 1) {
      return res.status(400).json({ message: "Agrega al menos una imagen" });
    }

    if (imagesURL.length > 4) {
      return res
        .status(400)
        .json({ message: "No puedes poner más de cuatro imágenes" });
    }
    // Guardar datos
    const productUpdated = await productsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        images: imagesURL,
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
