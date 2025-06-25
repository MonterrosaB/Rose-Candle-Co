import React from "react";

const ClearButton = ({ cartId, idUser, creationDate, onClear }) => {
  const clearCart = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUser,
          creationDate,
          products: [],
          total: 0,
        }),
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
      onClick={clearCart}
      className="bg-red-200 text-red-800 border border-red-400 px-4 py-2 rounded hover:bg-red-300 transition"
    >
      Vaciar carrito
    </button>
  );
};

export default ClearButton;
