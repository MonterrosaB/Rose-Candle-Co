import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // suponiendo que usas SweetAlert para alertas

const useCart = () => {
    const [cartId, setCartId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);

    const fetchCart = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/cart`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await res.json();

            if (data._id) {
                setCartId(data._id);
            }

            if (Array.isArray(data.products)) {
                setCartItems(data.products);
            }
        } catch (error) {
            console.error("Error cargando carrito:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateCartBackend = async (newProducts) => {
        try {
            const res = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ products: newProducts }),
            });
            if (!res.ok) throw new Error("Error actualizando carrito");
        } catch (error) {
            console.error(error);
        }
    };

    const handleClear = async () => {
        if (!cartId) return;

        try {
            const res = await fetch(`http://localhost:4000/api/cart/empty/${cartId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) throw new Error("Error al vaciar el carrito");

            setCartItems([]);

            await Swal.fire({
                icon: "success",
                title: "Carrito vaciado",
                text: "El carrito se vació correctamente.",
            });
        } catch (error) {
            console.error("Error al vaciar carrito:", error);

            await Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo vaciar el carrito.",
            });
        }
    };

    const handleRemoveItem = async (indexToRemove) => {
        const productToRemove = cartItems[indexToRemove];
        if (!productToRemove || !productToRemove._id) return;

        try {
            const res = await fetch(
                `http://localhost:4000/api/cart/removeProduct/${productToRemove._id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!res.ok) throw new Error("Error al eliminar el producto");

            setCartItems((prevItems) =>
                prevItems.filter((_, idx) => idx !== indexToRemove)
            );
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            alert("No se pudo eliminar el producto");
        }
    };

    const getTotal = () =>
        cartItems
            .reduce((acc, item) => acc + Number(item.variant?.[0]?.variantPrice || 0), 0)
            .toFixed(2);

    return {
        cartId,
        cartItems,
        isLoading,
        showCheckout,
        setShowCheckout,
        fetchCart,
        updateCartBackend,
        handleClear,
        handleRemoveItem,
        getTotal,
    };
};

export default useCart;
