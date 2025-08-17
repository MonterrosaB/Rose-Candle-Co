import React, { useState } from "react";
import { motion } from "framer-motion";
import ClearButton from "./components/CleanCart.jsx";
import CheckoutFlow from "./components/CheckoutFlow.jsx";
import useShoppingCart from "./hooks/useShoppingCart.jsx";
import { Minus, Trash2, Plus } from "lucide-react";

const Cart = () => {
  const {
    cartId,
    cartItems,
    handleClear,
    decreaseProduct,
    increaseProduct,
    total,
    moreInfo
  } = useShoppingCart();

  // 👇 Estado para alternar entre carrito y checkout
  const [showCheckout, setShowCheckout] = useState(false);

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  const handleContinue = () => {
    setShowCheckout(true);
  };

  //  Si está en checkout, renderiza el componente
  if (showCheckout) {
    return (
      <CheckoutFlow
        cartItems={cartItems}
        total={total}
        onBack={handleBackToCart}
        onClearCart={handleClear}
      />
    );
  }

  //  Si no, muestra el carrito
  return (
    <div className="flex flex-col lg:flex-row p-6 gap-8 mt-40">
      {/* Sección de productos */}
      <div className="w-full lg:w-2/3 space-y-6">
        <motion.h2
          className="text-3xl font-semibold text-[#333]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Carrito de compras
        </motion.h2>

        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:scale-[1.01] transition-transform duration-300 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Imagen y datos */}
              <div className="flex gap-4 items-start">
                <img src={item.idProduct?.images?.[0]} alt={item.idProduct?.name} className="w-24 h-24 rounded-lg object-cover" />
                <div>
                  <h3 className="text-lg font-semibold text-[#444]">{item.idProduct?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.idProduct?.variant?.[item.selectedVariantIndex]?.variant}
                  </p>
                  <p className="text-sm text-black underline cursor-pointer"
                    onClick={() => moreInfo(item.idProduct?._id)}>
                    Más información
                  </p>
                </div>
              </div>

              {/* Cantidad + Precio + Eliminar */}
              <div className="flex justify-between sm:justify-end items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                  <button onClick={() => decreaseProduct(idx)} className="text-gray-600 hover:text-black">
                    {item.quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseProduct(item.idProduct?._id, 1, item.selectedVariantIndex)}
                    className="text-gray-600 hover:text-black"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="text-right font-semibold text-lg min-w-[80px]">
                  ${(item.idProduct?.variant?.[item.selectedVariantIndex]?.variantPrice).toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600">El carrito está vacío.</p>
        )}
      </div>

      {/* Sección de resumen */}
      <motion.div
        className="w-full lg:w-1/3 bg-[#f8f8f4] p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-[#333]">Resumen</h3>

        <div className="space-y-3">
          {cartItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white px-4 py-3 rounded-lg shadow-sm flex justify-between items-center text-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="text-gray-700 truncate">{item.idProduct?.name} - {item.idProduct?.variant?.[item.selectedVariantIndex]?.variant}</span>
              <span className="font-medium text-gray-800">
                ${parseFloat(item.subtotal).toFixed(2)}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#eaeae3] mt-5 p-4 rounded-lg flex justify-between items-center font-bold text-lg text-[#444] shadow-inner">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <div className="mt-6 flex gap-3">
          {/*  Botón CONTINUAR */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full relative px-4 py-2 rounded-md text-white font-medium overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #A3A380 0%, #D2CFCB 100%)",
              boxShadow: "0 0 15px rgba(163, 163, 128, 0.5)",
            }}
            onClick={handleContinue}
          >
            <span className="relative z-10">CONTINUAR</span>
            <motion.div
              className="absolute inset-0 bg-black opacity-10 rounded-md pointer-events-none"
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Botón limpiar carrito */}
          <motion.div whileHover={{ scale: 1.05 }} className="w-full">
            <ClearButton cartId={cartId} onClear={handleClear} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
