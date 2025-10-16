import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // suponiendo que usas SweetAlert para alertas
import { useAuth } from "../../../global/hooks/useAuth.js";


import { useNavigate } from "react-router";
import toast from "react-hot-toast";


const useCart = () => {

    const { API, user } = useAuth();

    const [idCart, setIdCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const res = await fetch(API + "/cart", {
                credentials: "include" // esto permite enviar cookies httpOnly
            });
            const data = await res.json();


            if (data._id) {
                setIdCart(data._id);
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


    const createSalesOrder = async (orderData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(API + "/salesOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
                credentials: "include", // si usas cookies httpOnly para auth
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Error creating sales order");
            }

            const data = await res.json(); //  Aquí sí obtenemos la respuesta JSON
            setSuccess(true);
            return data; // devuelve { message, order, cart }
        } catch (err) {
            setError(err.message || "Error creating sales order");
            return null; // para que el frontend sepa que falló
        } finally {
            setLoading(false);
        }
    };

    const handleClear = async () => {
        if (!idCart) return;

        try {
            const res = await fetch(API + `/cart/empty/${idCart}`, {
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

    const increaseProduct = async (idProductToIncrease, quantityRecived, indexRecived) => {
        if (!idProductToIncrease) return;

        if (!user) {
            Swal.fire({
                title: 'No Has Iniciado Sesión',
                text: 'Necesitas una cuenta para realizar una compra. ¿Deseas iniciar sesión o crear una nueva?',
                icon: 'warning',
                showCancelButton: true,
                showDenyButton: true, // Agregamos un tercer botón
                confirmButtonText: 'Iniciar Sesión', // Botón principal (verde/azul)
                denyButtonText: 'Crear Cuenta', // Botón secundario (rojo/gris)
                cancelButtonText: 'Cancelar Compra', // Botón de cancelación
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario hace clic en 'Iniciar Sesión'
                    console.log('Redirigiendo a /login...');
                    // Redirigir a la página de inicio de sesión
                    navigate('/login');
                } else if (result.isDenied) {
                    // Si el usuario hace clic en 'Crear Cuenta'
                    console.log('Redirigiendo a /register...');
                    // Redirigir a la página de registro
                    navigate('/register');
                }
            });
            return;
        }

        try {
            let variantIndexToUse = indexRecived;
            let quantityToUse = quantityRecived || 1;

            // Si no se proporcionó indexRecived, buscar en el carrito
            if (variantIndexToUse === undefined || variantIndexToUse === null) {
                const existingItem = cartItems.find(
                    (item) => item.idProduct._id === idProductToIncrease
                );

                if (existingItem) {
                    // Usar la variante que ya está en el carrito
                    variantIndexToUse = existingItem.selectedVariantIndex;
                    // Si no se pasó quantity, tomar la del carrito como incremento
                    if (!quantityRecived) quantityToUse = 1;
                } else {
                    // Si no existe en el carrito, usar la primera variante del producto
                    const productData = await fetch(API + `/api/products/${idProductToIncrease}`)
                        .then((res) => res.json());

                    const product = productData.variant ? productData : productData.product;

                    if (!product.variant || product.variant.length === 0) {
                        console.warn("El producto no tiene variantes disponibles");
                        return;
                    }

                    variantIndexToUse = 0;
                }
            }

            const res = await fetch(API + "/cart/increase", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    productId: idProductToIncrease,
                    cartId: idCart,
                    indexVariant: variantIndexToUse,
                    quantityVariant: quantityToUse,
                }),
            }); 8


            if (!res.ok) throw new Error("Error al incrementar el producto");

            toast.success("Producto Agregado Correctamente");

            await res.json();
            fetchCart();
        } catch (error) {
            console.error("Error al incrementar producto del carrito:", error);
            alert("No se pudo incrementar el producto");
        }
    };

    const decreaseProduct = async (cartIndex) => {
        try {
            const res = await fetch(API + "/cart/decrease", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    cartId: idCart,
                    index: cartIndex // 👈 ahora mandamos el índice en el carrito
                }),
            });

            if (!res.ok) throw new Error("Error al disminuir el producto");

            await res.json();
            fetchCart();
        } catch (error) {
            console.error("Error al disminuir producto del carrito:", error);
            alert("No se pudo disminuir el producto");
        }
    };

    const moreInfo = (product) => {
        navigate(`/product/${product}`, { state: { product } });
    };

    const getTotal = () => {
        setTotal(
            cartItems
                .reduce((acc, item) => acc + Number(item.subtotal || 0), 0)
                .toFixed(2)
        );
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        getTotal();
    }, [cartItems]);

    return {
        idCart,
        cartItems,
        isLoading,
        showCheckout,
        setShowCheckout,
        fetchCart,
        handleClear,
        decreaseProduct,
        increaseProduct,
        createSalesOrder,
        total,
        moreInfo
    };
};

export default useCart;
