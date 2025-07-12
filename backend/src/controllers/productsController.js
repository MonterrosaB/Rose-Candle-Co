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
    const product = await productsModel
      .find()
      .populate({
        path: "components.idComponent",
        select: "name", // traer solo el campo nombre del componente
      })
      .populate("idProductCategory")
      .populate("idCollection");
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
  console.log("Body", req.body);

  let {
    name,
    description,
    components,
    recipe,
    availability,
    useForm,
    variant,
    idProductCategory,
    idCollection,
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
    // Parsear campos
    if (typeof components === "string") components = JSON.parse(components);
    if (typeof recipe === "string") recipe = JSON.parse(recipe);
    if (typeof useForm === "string") useForm = JSON.parse(useForm);
    if (typeof variant === "string") variant = JSON.parse(variant);
    availability = availability === "true";

    // Validaciones
    if (
      !name ||
      !description ||
      imagesURL.length < 1 ||
      !components ||
      components.length < 1 ||
      !recipe ||
      recipe.length < 1 ||
      availability === undefined ||
      !useForm ||
      useForm.length < 1 ||
      !variant ||
      variant.length < 1 ||
      !idProductCategory
    ) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" });
    }

    if (imagesURL.length > 8) {
      return res.status(400).json({ message: "Max 8 images allowed" });
    }

    // Crear producto
    const newProduct = new productsModel({
      name,
      description,
      images: imagesURL,
      components,
      recipe,
      availability,
      useForm,
      variant,
      idProductCategory,
      idCollection,
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
  console.log("Body", req.body);

  let {
    name,
    description,
    components,
    recipe,
    availability,
    useForm,
    variant,
    idProductCategory,
    idCollection,
  } = req.body;

  let imagesURL = [];

  // Subida de imágenes a Cloudinary
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
    // Parsear arrays si vienen como strings
    if (typeof components === "string") components = JSON.parse(components);
    if (typeof recipe === "string") recipe = JSON.parse(recipe);
    if (typeof useForm === "string") useForm = JSON.parse(useForm);
    if (typeof variant === "string") variant = JSON.parse(variant);
    availability = availability === "true";

    // Validaciones básicas
    if (!name || name.length < 3)
      return res.status(400).json({ message: "Name too short" });

    if (!description || description.length < 5)
      return res.status(400).json({ message: "Description too short" });

    if (imagesURL.length > 8)
      return res.status(400).json({ message: "Max 8 images allowed" });

    if (
      !components ||
      !Array.isArray(components) ||
      components.length < 1 ||
      !recipe ||
      !Array.isArray(recipe) ||
      recipe.length < 1 ||
      !useForm ||
      !Array.isArray(useForm) ||
      useForm.length < 1 ||
      !variant ||
      !Array.isArray(variant) ||
      variant.length < 1
    ) {
      return res.status(400).json({ message: "All fields must be complete" });
    }

    // Buscar producto original
    const productOriginal = await productsModel.findById(req.params.id);
    if (!productOriginal)
      return res.status(404).json({ message: "Product not found" });

    // Si no se subieron nuevas imágenes, conservar las anteriores
    if (imagesURL.length === 0) {
      imagesURL = productOriginal.images;
    }

    // Actualización
    const updatedProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        images: imagesURL,
        components,
        recipe,
        availability,
        useForm,
        variant,
        idProductCategory,
        idCollection,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default productsController;
