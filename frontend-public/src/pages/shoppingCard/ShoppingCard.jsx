import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ClearButton from "./components/CleanCart.jsx";
import CheckoutFlow from "./components/CheckoutFlow.jsx";

const Cart = () => {
  const cartId = "68588b74f122918fbd7edda5";

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  const [userId, setUserId] = useState("");
  const [creationDate, setCreationDate] = useState("");

  // ──────────────────────────── Obtener carrito desde el backend
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/cart/${cartId}`);
        const data = await res.json();

        if (Array.isArray(data.products)) {
          setCartItems(data.products);
          setUserId(data.idUser?._id || data.idUser); // Soporta Object o string
          setCreationDate(data.creationDate || "");
        }
      } catch (err) {
        console.error("Error al cargar el carrito:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ──────────────────────────── Agrupar productos repetidos
  const groupItems = (items) => {
    const grouped = {};
    items.forEach((it) => {
      const key = it._id || it.id || it.name;
      grouped[key] = grouped[key]
        ? { product: it, quantity: grouped[key].quantity + 1 }
        : { product: it, quantity: 1 };
    });
    return Object.values(grouped);
  };

  const getTotal = () =>
    groupItems(cartItems)
      .reduce(
        (acc, { product, quantity }) =>
          acc + quantity * Number(product.currentPrice || 0),
        0
      )
      .toFixed(2);

  const handleQuantityChange = (key, qty) => {
    qty = Number(qty);
    const others = cartItems.filter(
      (it) => (it._id || it.id || it.name) !== key
    );
    const sample = cartItems.find((it) => (it._id || it.id || it.name) === key);
    if (!sample) return;
    setCartItems([...others, ...Array(qty).fill(sample)]);
  };

  const handleClear = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUser: "665d3836f3c56f70bdc308c5", // reemplaza con tu valor real
        creationDate: new Date().toISOString(),
        products: [],
        total: 0,
      }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    setCartItems([]); // Vacía el estado local
    console.log("✅ Carrito vaciado correctamente");
  } catch (error) {
    console.error("❌ Error al vaciar el carrito:", error);
  }
};


  const handleRemoveItem = async (key) => {
    try {
      const updatedItems = cartItems.filter(
        (it) => (it._id || it.id || it.name) !== key
      );

      const updatedTotal = updatedItems.reduce(
        (acc, item) => acc + Number(item.currentPrice || 0),
        0
      );

      const productIds = updatedItems.map((item) => item._id || item.id);

      const response = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUser: userId,
          creationDate,
          products: productIds,
          total: updatedTotal,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setCartItems(updatedItems);
    } catch (e) {
      console.error("Error al eliminar el producto:", e.message);
      alert("No se pudo eliminar el producto del carrito.");
    }
  };

  if (isLoading) return <p className="p-4">Cargando carrito…</p>;

  if (showCheckout)
    return (
      <CheckoutFlow
        cartItems={cartItems}
        total={getTotal()}
        onBack={() => setShowCheckout(false)}
        onClearCart={handleClear}
      />
    );

  const groupedItems = groupItems(cartItems);

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-8">
      <div className="w-full lg:w-2/3 space-y-6">
        <motion.h2
          className="text-3xl font-semibold text-[#333]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Carrito de compras
        </motion.h2>

        {groupedItems.length ? (
          groupedItems.map(({ product, quantity }) => {
            const key = product._id || product.id || product.name;
            return (
              <motion.div
                key={key}
                className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform duration-300 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-[#444]">
                    {product.name}
                  </h3>
                  <p className="text-[#666] mt-2 text-sm">
                    Precio unitario: $
                    {parseFloat(product.currentPrice || 0).toFixed(2)}
                  </p>
                  <p className="font-semibold mt-1 text-gray-800">
                    Total: ${(quantity * product.currentPrice).toFixed(2)}
                  </p>
                  <div className="text-xs text-gray-500 mt-1">
                    <p>* Caja de regalo</p>
                    <p>* Tarjeta personalizada</p>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-[#e6e6e6] text-xs px-2 py-1 rounded">
                      8oz
                    </span>
                    <span className="bg-[#e6e6e6] text-xs px-2 py-1 rounded">
                      Vaso
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  onClick={() => handleRemoveItem(key)}
                  className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 text-xs px-2 py-1 rounded transition-all"
                >
                  Eliminar
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute right-2 bottom-[110px] bg-white border border-gray-300 rounded shadow-md px-1 py-0.5 flex items-center justify-center"
                >
                  <select
                    value={quantity}
                    onChange={(e) => handleQuantityChange(key, e.target.value)}
                    className="w-14 h-6 text-xs font-medium text-gray-700 outline-none cursor-pointer rounded"
                  >
                    {[...Array(15).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-gray-600">El carrito está vacío.</p>
        )}
      </div>

      <motion.div
        className="w-full lg:w-1/3 bg-[#f8f8f4] p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-[#333]">Resumen</h3>

        <div className="space-y-3">
          {groupedItems.map(({ product, quantity }) => {
            const key = product._id || product.id || product.name;
            return (
              <motion.div
                key={key}
                className="bg-white px-4 py-3 rounded-lg shadow-sm flex justify-between items-center text-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-gray-700 truncate">
                  {product.name} {quantity > 1 && `(x${quantity})`}
                </span>
                <span className="font-medium text-gray-800">
                  ${(quantity * product.currentPrice).toFixed(2)}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-[#eaeae3] mt-5 p-4 rounded-lg flex justify-between items-center font-bold text-lg text-[#444] shadow-inner">
          <span>Total</span>
          <span>${getTotal()}</span>
        </div>

        <div className="mt-6 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowCheckout(true)}
            className="w-full relative px-4 py-2 rounded-md text-white font-medium overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #A3A380 0%, #D2CFCB 100%)",
              boxShadow: "0 0 15px rgba(163, 163, 128, 0.5)",
            }}
          >
            <span className="relative z-10">CONTINUAR</span>
            <motion.div
              className="absolute inset-0 bg-black opacity-10 rounded-md pointer-events-none"
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} className="w-full">
            <ClearButton
              cartId={cartId}
              idUser={userId}
              creationDate={creationDate}
              onClear={handleClear}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
