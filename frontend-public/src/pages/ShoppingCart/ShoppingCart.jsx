import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ClearButton from "./components/CleanCart.jsx";
import CheckoutFlow from "./components/CheckoutFlow.jsx";

import useShoppingCart from "./hooks/useShoppingCart.jsx";

const Cart = () => {

  const {
    cartId,
    cartItems,
    handleClear,
    handleRemoveItem,
    getTotal,
  } = useShoppingCart();

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
              className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform duration-300 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-[#444]">
                  {item.name}
                </h3>
                <p className="text-[#666] mt-1 text-sm">
                  ${parseFloat(item.variant?.[0]?.variantPrice || 0).toFixed(2)}
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
                onClick={() => handleRemoveItem(idx)}
                className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 text-xs px-2 py-1 rounded transition-all"
              >
                Eliminar
              </motion.button>
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
              <span className="text-gray-700 truncate">{item.name}</span>
              <span className="font-medium text-gray-800">
                ${parseFloat(item.variant?.[0]?.variantPrice || 0).toFixed(2)}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#eaeae3] mt-5 p-4 rounded-lg flex justify-between items-center font-bold text-lg text-[#444] shadow-inner">
          <span>Total</span>
          <span>${getTotal()}</span>
        </div>

        <div className="mt-6 flex gap-3">
          {/* Botón continuar con animación glow y gradiente */}
          <motion.button
            whileHover={{ scale: 1.05 }}
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

          {/* Botón para limpiar carrito */}
          <motion.div whileHover={{ scale: 1.05 }} className="w-full">
            <ClearButton cartId={cartId} onClear={handleClear} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;

