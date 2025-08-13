import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";
import useShoppingCart from "../../ShoppingCart/hooks/useShoppingCart.jsx"


// AddToCartButton.jsx
const AddToCartButton = ({ product, quantity, selectedVariantIndex }) => {

  const { increaseProduct } = useShoppingCart();

  const handleAddToCart = async () => {
    if (!product || !product._id) {
      console.error("Producto incompleto:", product);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El producto no tiene todos los datos necesarios.",
      });
      return;
    }

    try {
      await increaseProduct(
        product._id,
        quantity,
        selectedVariantIndex
      );

      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: "El producto se agregó al carrito correctamente.",
      });
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el producto al carrito.",
      });
    }
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      whileTap={{ scale: 0.97 }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
        backgroundColor: "#222",
      }}
      transition={{ type: "spring", stiffness: 250 }}
      className="w-full max-w-sm flex items-center justify-center gap-2 bg-black hover:bg-[#222222] text-white px-4 py-4 rounded-2xl font-medium text-sm transition-all duration-200"
    >
      <ShoppingCart size={18} />
      Add to Cart
    </motion.button>
  );
};

export default AddToCartButton;
