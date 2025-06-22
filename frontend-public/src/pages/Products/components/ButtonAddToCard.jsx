import React from "react";

const AddToCartButton = ({ product }) => {
  const cartId = "68588b74f122918fbd7edda5"; // Reemplazar con un ID real o dinámico
  const userId = "665d3836f3c56f70bdc308c5"; // ID de usuario válido (debe existir en tu BD)

  const handleAddToCart = async () => {
    if (
      !product ||
      !product._id ||
      !product.name ||
      !product.images?.[0] ||
      !product.currentPrice
    ) {
      console.error("Producto incompleto:", product);
      alert("El producto no tiene todos los datos necesarios.");
      return;
    }

    const productId = product._id;
    const productPrice = Number(product.currentPrice);

    try {
      // Intentar obtener el carrito
      let cart;
      const res = await fetch(`http://localhost:4000/api/cart/${cartId}`);

      if (res.status === 404) {
        // Carrito no existe, lo creamos
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

        if (!createRes.ok) {
          const text = await createRes.text();
          throw new Error(`Error al crear carrito: ${text}`);
        }

        cart = await createRes.json();
      } else if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      } else {
        cart = await res.json();
      }

      // Actualizar carrito con nuevo producto
      const updatedProducts = [...cart.products, productId];
      const updatedTotal = Number(cart.total || 0) + productPrice;

      const updateResponse = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUser: userId,
          creationDate: cart.creationDate || new Date(),
          products: updatedProducts,
          total: updatedTotal,
        }),
      });

      if (!updateResponse.ok) {
        const text = await updateResponse.text();
        throw new Error(`Error ${updateResponse.status}: ${text}`);
      }

      alert("Producto agregado al carrito correctamente");
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      alert("No se pudo agregar el producto al carrito");
    }
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCartButton;
