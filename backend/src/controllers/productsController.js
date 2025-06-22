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

productsController.getProductById = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id); // o tu método según cómo lo traes
    if (!product) return res.status(404).json({ error: "Producto not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error, couldnt found the product" });
  }
};

// POST
productsController.createProduct = async (req, res) => {
  console.log(req.body); // Verifica qué contiene req.body

  // Obtener datos
  let {
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

  // Subir imágenes con Cloudinary
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
    // Si los campos vienen como string JSON (form-data), los parseamos
    if (typeof components === "string") components = JSON.parse(components);
    if (typeof recipe === "string") recipe = JSON.parse(recipe);
    if (typeof useForm === "string") useForm = JSON.parse(useForm);
    if (typeof currentPrice === "string") currentPrice = parseFloat(currentPrice);

    // Validaciones
    if (
      !name ||
      !description ||
      imagesURL.length < 1 ||
      !components || components.length < 1 ||
      !recipe || recipe.length < 1 ||
      availability === undefined ||
      !useForm || useForm.length < 1 ||
      !currentPrice ||
      !idProductCategory
    ) {
      return res.status(400).json({ message: "Please complete all the fields" });
    }

    if (name.length < 3 || name.length > 70) {
      return res.status(400).json({ message: "Invalid name length" });
    }

    if (description.length < 5) {
      return res.status(400).json({ message: "Description too short" });
    }

    if (imagesURL.length > 4) {
      return res.status(400).json({ message: "Max 4 images allowed" });
    }

    // Crear nuevo producto
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
    res.status(200).json({ message: "Saved successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json("Internal server error");
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
