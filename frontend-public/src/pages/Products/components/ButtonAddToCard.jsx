import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";

const AddToCartButton = ({ product}) => {
  const cartId = "68588b74f122918fbd7edda5";
  const userId = "665d3836f3c56f70bdc308c5";

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
      const res = await fetch(`http://localhost:4000/api/cart/${cartId}`);

      if (res.status === 404) {
        const createRes = await fetch("http://localhost:4000/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUser: userId,
            creationDate: new Date(),
            products: [],
            total: 0,
          }),
        });

        if (!createRes.ok) throw new Error(await createRes.text());

        cart = await createRes.json();
      } else if (!res.ok) {
        throw new Error(await res.text());
      } else {
        cart = await res.json();
      }

      const updatedProducts = [...cart.products, productId];
      const updatedTotal = Number(cart.total || 0) + productPrice;

      const updateResponse = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      alert("Producto agregado al carrito correctamente");
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el producto al carrito",
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
