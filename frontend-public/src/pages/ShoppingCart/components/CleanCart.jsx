import React from "react";

const ClearButton = ({ cartId, onClear }) => {
  const clearCart = async () => {
    try {
      const response = await fetch(`https://rose-candle-co.onrender.com/api/cart/empty/${cartId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      onClear();
      alert("Carrito vaciado correctamente");
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      alert("No se pudo vaciar el carrito");
    }
  };

  return (
    <button
      onClick={onClear}
      className="bg-red-200 text-red-800 border border-red-400 px-4 py-2 rounded hover:bg-red-300 transition"
    >
      Vaciar carrito
    </button>
  );
};

export default ClearButton;
