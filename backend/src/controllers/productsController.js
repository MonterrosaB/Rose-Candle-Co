import productsModel from "../models/Products.js"; // Modelo de productos
import SalesOrder from "../models/SalesOrder.js";
import ProductionCostHistory from "../models/ProductionCostHistory.js";
import { config } from "../config.js"; // Archivo config
import { v2 as cloudinary } from "cloudinary"; // Cloudinary
import RawMaterials from "../models/RawMaterials.js";
import Products from "../models/Products.js";
import { createProductPriceHistory } from "../utils/createProductPriceHistorial.js";
import { createProductionCostHistory } from "../utils/createProducctionCostHistorial.js";
import { mapComponentsToHistoryFormat } from "../utils/mapComponents.js";
import { createLog } from "../utils/logger.js";

// Configuración de cloudinary (servidor de imagenes)
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Array de funciones (vacío)
const productsController = {};

// GET - Método para obtener todos los productos
productsController.getproducts = async (req, res) => {
  try {
    const products = await productsModel
      .find()
      .populate({
        path: "variant.components.idComponent", // populate componentes de cada variante
        select: "name currentPrice",
        strictPopulate: false, // evita errores si algo no coincide
      })
      .populate("idProductCategory")
      .populate("idCollection");

    res.status(200).json(products); // Todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// GET - Método para obtener los productos disponibles
productsController.getAvailableProducts = async (req, res) => {
  try {
    const products = await productsModel
      .find({ availability: true })
      .populate({
        path: "variant.components.idComponent", // populate componentes de cada variante
        select: "name currentPrice",
        strictPopulate: false, // evita errores si algo no coincide
      })
      .populate("idProductCategory")
      .populate("idCollection");

    res.status(200).json(products); // Todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// GET (POR ID) - Método para traer un producto por su id
productsController.getProductById = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id).populate({
      path: "variant.components.idComponent",
      select: "name idRawMaterialCategory",
      populate: {
        path: "idRawMaterialCategory",
        select: "name",
      },
      strictPopulate: false,
    });
    if (!product) return res.status(404).json({ error: "Producto not found" }); // si el producto no se encuentra
    res.status(200).json(product); // todo bien
  } catch (error) {
    res.status(500).json({ error: "Error, couldnt found the product" }); // Error del servidor
  }
};

productsController.getProductsForOrders = async (req, res) => {
  try {
    const products = await productsModel
      .find(
        { availability: true },
        {
          name: 1,
          variant: 1,
          images: { $slice: 1 }, // devuelve solo el primer elemento del array
        }
      )
      .populate({
        path: "variant.components.idComponent", // populate componentes de cada variante
        select: "name currentPrice unit",
        strictPopulate: false, // evita errores si algo no coincide
      }); // Buscar todas las colecciones
    res.status(200).json(products); // Todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// POST - Método para insertar un producto
productsController.createProduct = async (req, res) => {
  const changedBy = req.user.id;
  console.log("Body", req.body);

  let {
    name,
    description,
    recipe,
    availability,
    useForm,
    variant,
    idProductCategory,
    idCollection,
  } = req.body;

  let imagesURL = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "public/products",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      imagesURL.push(result.secure_url);
    }
  }

  try {
    // Parsear campos
    if (typeof recipe === "string") recipe = JSON.parse(recipe);
    if (typeof useForm === "string") useForm = JSON.parse(useForm);
    if (typeof variant === "string") variant = JSON.parse(variant);
    availability = availability === "true";

    // Validaciones
    if (
      !name ||
      !description ||
      imagesURL.length < 1 ||
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
      recipe,
      availability,
      useForm,
      variant,
      idProductCategory,
      idCollection,
    });

    const savedProduct = await newProduct.save();

    // Crear ProductionCostHistory
    const variantsWithCost = [];

    for (const v of variant) {
      const rawMaterialsUsed = [];

      for (const c of v.components) {
        const material = await RawMaterials.findById(c.idComponent);
        if (!material)
          throw new Error(`Materia prima no encontrada: ${c.idComponent}`);
        const amount = parseFloat(c.amount);
        if (isNaN(amount))
          throw new Error(`Cantidad inválida: ${c.idComponent}`);

        rawMaterialsUsed.push({
          idRawMaterial: material._id,
          amount,
          unit: material.unit,
          unitPrice: material.currentPrice,
          subtotal: +(amount * material.currentPrice).toFixed(2),
        });
      }

      const totalProductionCost = rawMaterialsUsed.reduce(
        (acc, rm) => acc + rm.subtotal,
        0
      );

      // Guardar historial de precios (uno por variante)
      await createProductPriceHistory({
        idProduct: savedProduct._id,
        variantName: v.variant,
        unitPrice: parseFloat(v.variantPrice),
        reference: "Registro Inicial", // o algo dinámico
        changedBy,
      });

      variantsWithCost.push({
        variantName: v.variant,
        amount: 1,
        unitPrice: parseFloat(v.variantPrice),
        productionCost: totalProductionCost,
        rawMaterialUsed: rawMaterialsUsed,
      });
    }

    // Crear registro en ProductionCostHistory
    const productionRecord = new ProductionCostHistory({
      idProduct: savedProduct._id,
      variants: variantsWithCost,
    });

    await productionRecord.save();

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "create",
      collectionAffected: "Products",
      targetId: newProduct._id,
      description: `Product ${newProduct.name} created`,
    });

    res.status(200).json({
      message: "Product, price history and cost history saved successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json("Internal server error");
  }
};

// DELETE - Método para eliminar un producto por su id
productsController.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      { deleted: true }, // Se marca como "eliminada"
      { new: true }
    ); // Eliminar por ID

    if (!deleteProduct) {
      // Si no se elimina nada (porque no se encuentra)
      return res.status(400).json({ message: "Product not found" }); // Error del cliente, categoria no encontrado
    }
    res.status(200).json({ message: "Deleted Successfull" }); //Todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// PUT - Método para actualizar un producto por su id
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
        folder: "public/products",
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

    // Validaciones
    if (!name || name.length < 3)
      return res.status(400).json({ message: "Name too short" });
    if (!description || description.length < 5)
      return res.status(400).json({ message: "Description too short" });
    if (imagesURL.length > 8)
      return res.status(400).json({ message: "Max 8 images allowed" });

    // Buscar producto original
    const productOriginal = await productsModel.findById(req.params.id);
    if (!productOriginal)
      return res.status(404).json({ message: "Product not found" });

    // Conservar imágenes si no se subieron nuevas
    if (imagesURL.length === 0) {
      imagesURL = productOriginal.images;
    }

    /* ------------------------------------------------
       1. Detectar cambios en VARIANTES → PriceHistory
    ------------------------------------------------ */

    if (Array.isArray(variant)) {
      for (const newVar of variant) {
        const oldVar = productOriginal.variant.find(
          (v) => v.variant === newVar.variant
        );

        if (oldVar && oldVar.variantPrice !== newVar.variantPrice) {
          await createProductPriceHistory({
            idProduct: productOriginal._id,
            variantName: newVar.variant,
            unitPrice: newVar.variantPrice,
            reference: "Price updated",
            changedBy: req.user?.id || "system", // depende de tu auth
          });
        }
      }
    }

    /* --------------------------------------------------------
       2. Detectar cambios en RECIPE (materias primas usadas)
    -------------------------------------------------------- */

    if (Array.isArray(variant)) {
      for (const newVar of variant) {
        const oldVar = productOriginal.variant.find(
          (v) => v.variant === newVar.variant
        );

        const mappedComponents = mapComponentsToHistoryFormat(
          newVar.components
        );

        // Si la variante no existía antes → registrar como nueva
        if (!oldVar) {
          await createProductionCostHistory({
            idProduct: productOriginal._id,
            variants: [
              {
                variantName: newVar.variant,
                amount: newVar.amount,
                unitPrice: newVar.variantPrice,
                rawMaterialUsed: mappedComponents,
              },
            ],
          });
          continue;
        }

        // 🔎 Comparar arrays de componentes
        const normalize = (arr) =>
          arr
            .map((c) => ({
              id: c.idComponent?._id?.toString() || c.idComponent.toString(),
              amount: Number(c.amount),
              unitPrice: Number(c.unitPrice),
            }))
            .sort((a, b) => a.id.localeCompare(b.id));

        const oldComponents = normalize(oldVar.components);
        const newComponents = normalize(newVar.components);

        const componentsChanged =
          JSON.stringify(oldComponents) !== JSON.stringify(newComponents);

        if (componentsChanged) {
          await createProductionCostHistory({
            idProduct: productOriginal._id,
            variants: [
              {
                variantName: newVar.variant,
                amount: newVar.amount,
                unitPrice: newVar.variantPrice,
                rawMaterialUsed: mappedComponents,
              },
            ],
          });
        }
      }
    }

    /* ------------------------
       3. Actualizar producto
    ------------------------- */
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

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "update",
      collectionAffected: "Products",
      targetId: updatedProduct._id,
      description: `Product ${updatedProduct.name} updated`,
    });

    res.status(200).json({
      message: "Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

productsController.restoreProduct = async (req, res) => {
  try {
    const restoreProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreProduct) {
      return res
        .status(400)
        .json({ message: "Product Price History not found" }); // No encontrada
    }

    res.status(200).json({ message: "Product Price History restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// -- Reportes --

// GET POR CATEGORÍAS
productsController.getProductByCategory = async (req, res) => {
  try {
    const result = await SalesOrder.aggregate([
      // 1. Lookup al carrito de compras
      {
        $lookup: {
          from: "shoppingcarts",
          localField: "idShoppingCart",
          foreignField: "_id",
          as: "shoppingCart",
        },
      },
      { $unwind: "$shoppingCart" },

      // 2. Lookup a los productos del carrito (por idProduct)
      {
        $lookup: {
          from: "products",
          localField: "shoppingCart.products.idProduct",
          foreignField: "_id",
          as: "products",
        },
      },

      // 3. Lookup a las categorías de los productos
      {
        $lookup: {
          from: "productcategories",
          localField: "products.idProductCategory",
          foreignField: "_id",
          as: "categories",
        },
      },

      // 4. Extraer solo los nombres de categoría únicos por orden
      {
        $project: {
          categorias: { $setUnion: "$categories.name" },
        },
      },

      // 5. Descomponer por categoría
      { $unwind: "$categorias" },

      // 6. Agrupar por categoría y contar órdenes
      {
        $group: {
          _id: "$categorias",
          totalVentas: { $sum: 1 },
        },
      },

      // 7. Calcular total global de órdenes
      {
        $group: {
          _id: null,
          categorias: {
            $push: {
              nombre: "$_id",
              totalVentas: "$totalVentas",
            },
          },
          totalGlobal: { $sum: "$totalVentas" },
        },
      },

      // 8. Calcular porcentaje
      { $unwind: "$categorias" },
      {
        $project: {
          _id: 0,
          categoria: "$categorias.nombre",
          totalVentas: "$categorias.totalVentas",
          porcentaje: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$categorias.totalVentas", "$totalGlobal"] },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },
    ]);

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

//GET - Producto más vendido
productsController.getBestSellers = async (req, res) => {
  try {
    const topProducts = await SalesOrder.aggregate([
      // Unir con shoppingcarts
      {
        $lookup: {
          from: "shoppingcarts",
          localField: "idShoppingCart",
          foreignField: "_id",
          as: "cart",
        },
      },
      { $unwind: "$cart" },

      // Desglosar productos del carrito
      { $unwind: "$cart.products" },

      // Agrupar por producto + variante
      {
        $group: {
          _id: {
            productId: "$cart.products.idProduct",
            variantIndex: "$cart.products.selectedVariantIndex",
          },
          totalQuantity: { $sum: "$cart.products.quantity" },
        },
      },

      // Traer info del producto
      {
        $lookup: {
          from: "products",
          localField: "_id.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },

      // Calcular el precio de la variante seleccionada
      {
        $addFields: {
          variant: { $arrayElemAt: ["$product.variant", "$_id.variantIndex"] },
        },
      },

      // Proyectar solo lo necesario
      {
        $project: {
          _id: 0,
          productId: "$product._id",
          name: "$product.name",
          variant: "$variant.variant",
          variantPrice: "$variant.variantPrice",
          totalQuantity: 1,
          totalRevenue: {
            $multiply: ["$variant.variantPrice", "$totalQuantity"],
          },
        },
      },

      // Ordenar por más vendidos
      { $sort: { totalQuantity: -1 } },

      // Limitar al top 10
      { $limit: 10 },
    ]);

    return res.status(200).json(topProducts);
  } catch (error) {
    console.error("Error al obtener los más vendidos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

//GET - Producto menos vendido
productsController.getWorstSellers = async (req, res) => {
  try {
    const worstSellers = await Products.aggregate([
      // Unir cada producto con los carritos que lo contienen
      {
        $lookup: {
          from: "shoppingcarts",
          localField: "_id",
          foreignField: "products.idProduct",
          as: "carts",
        },
      },

      // Calcular cantidad total vendida por producto/variante
      {
        $addFields: {
          variants: {
            $map: {
              input: { $range: [0, { $size: "$variant" }] },
              as: "idx",
              in: {
                variant: { $arrayElemAt: ["$variant.variant", "$$idx"] },
                variantPrice: {
                  $arrayElemAt: ["$variant.variantPrice", "$$idx"],
                },
                totalQuantity: {
                  $sum: {
                    $map: {
                      input: "$carts",
                      as: "cart",
                      in: {
                        $sum: {
                          $map: {
                            input: {
                              $filter: {
                                input: "$$cart.products",
                                as: "p",
                                cond: {
                                  $and: [
                                    { $eq: ["$$p.idProduct", "$_id"] },
                                    {
                                      $eq: [
                                        "$$p.selectedVariantIndex",
                                        "$$idx",
                                      ],
                                    },
                                  ],
                                },
                              },
                            },
                            as: "filtered",
                            in: "$$filtered.quantity",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      // Desglosar por variante
      { $unwind: "$variants" },

      // Calcular revenue
      {
        $addFields: {
          totalRevenue: {
            $multiply: ["$variants.totalQuantity", "$variants.variantPrice"],
          },
        },
      },

      // Proyectar
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: "$name",
          variant: "$variants.variant",
          variantPrice: "$variants.variantPrice",
          totalQuantity: "$variants.totalQuantity",
          totalRevenue: 1,
        },
      },

      // Ordenar por menos vendidos
      { $sort: { totalQuantity: 1 } },

      // Limitar al top 10
      { $limit: 10 },
    ]);

    return res.status(200).json(worstSellers);
  } catch (error) {
    console.error("Error al obtener los menos vendidos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

productsController.calculateProduction = async (req, res) => {
  try {
    const productId = req.params.id;

    // Buscar producto
    const product = await Products.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    let result = [];

    // Recorremos cada variante del producto
    for (const variant of product.variant) {
      let unitsPossible = Infinity;

      for (const comp of variant.components) {
        const rawMaterial = await RawMaterials.findById(
          comp.idComponent
        ).lean();

        if (!rawMaterial) {
          unitsPossible = 0; // No existe la materia prima
          break;
        }

        // Calcular cuántas unidades se pueden producir con este componente
        const possible = Math.floor(rawMaterial.currentStock / comp.amount);

        // El mínimo entre todos los componentes define el límite
        unitsPossible = Math.min(unitsPossible, possible);
      }

      result.push({
        variant: variant.variant,
        maxProduction: unitsPossible,
      });
    }

    return res.json({
      product: product.name,
      productionCapacity: result,
    });
  } catch (error) {
    console.error("Error en cálculo de producción:", error);
    res.status(500).json({ message: "Error al calcular producción", error });
  }
};

// Exportar
export default productsController;
