import React, { useEffect, useState } from "react";
import ClearButton from "./components/CleanCart.jsx";

const Cart = () => {
  const cartId = "68588b74f122918fbd7edda5"; // <-- ID de carrito válido en MongoDB
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar carrito
  const fetchCart = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/cart/${cartId}`);
      const data = await res.json();
      if (Array.isArray(data.products)) {
        setCartItems(data.products);
      }
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + Number(item.currentPrice || 0), 0).toFixed(2);

  // Callback para actualizar estado tras vaciar carrito
  const handleClear = () => {
    setCartItems([]);
  };

  if (isLoading) return <p className="p-4">Cargando carrito...</p>;

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-8">
      {/* Productos */}
      <div className="w-full lg:w-2/3 space-y-6">
        <h2 className="text-2xl font-bold text-blue-900">Carrito de compras</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => (
            <div key={idx} className="flex border-b pb-4">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-28 h-28 object-cover"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-bold">{item.name}</h3>
                <p>${parseFloat(item.currentPrice || 0).toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  *Caja de regalo<br />*Tarjeta personalizada
                </p>
                <div className="mt-2">
                  <span className="bg-gray-200 px-2 py-1 rounded text-sm">8oz</span>
                  <span className="bg-gray-200 px-2 py-1 rounded text-sm ml-2">Vaso</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">El carrito está vacío.</p>
        )}
      </div>

      {/* Resumen */}
      <div className="w-full lg:w-1/3 bg-beige-100 p-6 rounded shadow-md">
        <h3 className="font-bold text-lg mb-4">Resumen</h3>
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex justify-between border-b py-1">
            <span>{item.name}</span>
            <span>${parseFloat(item.currentPrice || 0).toFixed(2)}</span>
          </div>
        ))}

        <div className="border-t mt-4 pt-4 font-bold text-lg flex justify-between">
          <span>TOTAL</span>
          <span>${getTotal()}</span>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="bg-black text-white px-4 py-2 rounded">CONTINUAR</button>
          {/* Botón para vaciar carrito */}
          <ClearButton cartId={cartId} onClear={handleClear} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
