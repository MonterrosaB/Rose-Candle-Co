"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard,
  Truck,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Gift,
  Star,
} from "lucide-react"

// Componente de paso de envío
const ShippingStep = ({ formData, handleInputChange }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative">
        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={(e) => handleInputChange("shipping", "firstName", e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
        />
      </div>
      <div className="relative">
        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={(e) => handleInputChange("shipping", "lastName", e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
        />
      </div>
    </div>

    <div className="relative">
      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={(e) => handleInputChange("shipping", "email", e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
    </div>

    <div className="relative">
      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type="tel"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
    </div>

    <div className="relative">
      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Dirección completa"
        value={formData.address}
        onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Ciudad"
        value={formData.city}
        onChange={(e) => handleInputChange("shipping", "city", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
      <input
        type="text"
        placeholder="Código Postal"
        value={formData.zipCode}
        onChange={(e) => handleInputChange("shipping", "zipCode", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
      <select
        value={formData.country}
        onChange={(e) => handleInputChange("shipping", "country", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      >
        <option value="México">México</option>
        <option value="Estados Unidos">Estados Unidos</option>
        <option value="Canadá">Canadá</option>
      </select>
    </div>
  </div>
)

// Componente de paso de pago
const PaymentStep = ({ formData, handleInputChange }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {["card", "paypal", "transfer"].map((method) => (
        <motion.div
          key={method}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleInputChange("payment", "paymentMethod", method)}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            formData.paymentMethod === method
              ? "border-[#A3A380] bg-[#A3A380]/10"
              : "border-gray-300 hover:border-[#A3A380]/50"
          }`}
        >
          <div className="text-center">
            {method === "card" && <CreditCard className="h-8 w-8 mx-auto mb-2" />}
            {method === "paypal" && <div className="h-8 w-8 mx-auto mb-2 bg-blue-600 rounded" />}
            {method === "transfer" && <div className="h-8 w-8 mx-auto mb-2 bg-green-600 rounded" />}
            <p className="text-sm font-medium">
              {method === "card" && "Tarjeta"}
              {method === "paypal" && "PayPal"}
              {method === "transfer" && "Transferencia"}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    {formData.paymentMethod === "card" && (
      <div className="space-y-4">
        <div className="relative">
          <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Número de tarjeta"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("payment", "cardNumber", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Nombre en la tarjeta"
            value={formData.cardName}
            onChange={(e) => handleInputChange("payment", "cardName", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/AA"
            value={formData.expiryDate}
            onChange={(e) => handleInputChange("payment", "expiryDate", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
          />
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="CVV"
              value={formData.cvv}
              onChange={(e) => handleInputChange("payment", "cvv", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>
    )}
  </div>
)

// Componente de revisión
const ReviewStep = ({ formData, cartItems, total }) => {
  // Función para agrupar productos por id o nombre, sumando cantidades
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

  const groupedItems = groupItems(cartItems);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      {/* Información de envío */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Truck className="h-5 w-5 mr-2" />
          Información de Envío
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>{formData.shipping.firstName} {formData.shipping.lastName}</p>
          <p>{formData.shipping.email}</p>
          <p>{formData.shipping.phone}</p>
          <p>{formData.shipping.address}</p>
          <p>{formData.shipping.city}, {formData.shipping.zipCode}</p>
          <p>{formData.shipping.country}</p>
        </div>
      </div>

      {/* Método de pago */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Método de Pago
        </h3>
        <div className="text-sm text-gray-600">
          {formData.payment.paymentMethod === "card" && (
            <p>Tarjeta terminada en {formData.payment.cardNumber.slice(-4)}</p>
          )}
          {formData.payment.paymentMethod === "paypal" && <p>PayPal</p>}
          {formData.payment.paymentMethod === "transfer" && <p>Transferencia Bancaria</p>}
        </div>
      </div>

      {/* Resumen del pedido con diseño igual que el carrito */}
      <div className="bg-[#f8f8f4] p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Resumen del Pedido</h3>

        {groupedItems.length ? (
          groupedItems.map(({ product, quantity }) => {
            const key = product._id || product.id || product.name;
            return (
              <div
                key={key}
                className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col flex-grow">
                  <h4 className="text-md font-semibold text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Precio unitario: ${parseFloat(product.currentPrice || 0).toFixed(2)}
                  </p>
                  <p className="font-semibold text-gray-900 mt-1">
                    Total: ${(quantity * product.currentPrice).toFixed(2)}
                  </p>
                </div>
                <div className="font-semibold text-gray-700 text-sm">x{quantity}</div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">No hay productos en el carrito.</p>
        )}

        {/* Total general */}
        <div className="mt-6 flex justify-between font-bold text-lg border-t pt-4">
          <span>Total</span>
          <span>${parseFloat(total).toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};


// Componente de confirmación
const ConfirmationStep = ({ isProcessing, orderComplete, processOrder }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center space-y-6"
  >
    {isProcessing ? (
      <div className="space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 border-4 border-[#A3A380] border-t-transparent rounded-full mx-auto"
        />
        <p className="text-lg">Procesando tu pedido...</p>
      </div>
    ) : orderComplete ? (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="space-y-4"
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
        </motion.div>
        <h2 className="text-2xl font-bold text-green-600">¡Pedido Confirmado!</h2>
        <p className="text-gray-600">Tu pedido ha sido procesado exitosamente</p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-700">
            Número de pedido: <span className="font-mono">#ORD-{Date.now()}</span>
          </p>
        </div>
      </motion.div>
    ) : (
      <div className="space-y-4">
        <Gift className="h-16 w-16 text-[#A3A380] mx-auto" />
        <h2 className="text-xl font-semibold">¿Listo para finalizar?</h2>
        <p className="text-gray-600">Confirma tu pedido para proceder con el pago</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={processOrder}
          className="w-full py-4 bg-gradient-to-r from-[#A3A380] to-[#D2CFCB] text-white font-semibold rounded-lg shadow-lg"
        >
          Confirmar Pedido
        </motion.button>
      </div>
    )}
  </motion.div>
)

// Componente principal
const CheckoutFlow = ({ cartItems = [], total = "0.00", onBack, onClearCart }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    shipping: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      country: "México",
    },
    payment: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      paymentMethod: "card",
    },
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const steps = [
    { id: 0, title: "Información de Envío", icon: Truck },
    { id: 1, title: "Método de Pago", icon: CreditCard },
    { id: 2, title: "Revisión", icon: CheckCircle },
    { id: 3, title: "Confirmación", icon: Star },
  ]

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

const processOrder = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    if (onClearCart) {
      await onClearCart() // limpia carrito en el backend y estado padre
    }
    setIsProcessing(false)
    setOrderComplete(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-[#A3A380] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver al carrito
            </motion.button>
            <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
          </div>

          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: currentStep >= index ? "#A3A380" : "#e5e7eb",
                    scale: currentStep === index ? 1.1 : 1,
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold"
                >
                  {currentStep > index ? <CheckCircle className="h-6 w-6" /> : <step.icon className="h-5 w-5" />}
                </motion.div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${currentStep >= index ? "text-[#A3A380]" : "text-gray-500"}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{
                      backgroundColor: currentStep > index ? "#A3A380" : "#e5e7eb",
                    }}
                    className="w-16 h-1 mx-4"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="shipping-step-content"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <ShippingStep formData={formData.shipping} handleInputChange={handleInputChange} />
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                key="payment-step-content"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <PaymentStep formData={formData.payment} handleInputChange={handleInputChange} />
              </motion.div>
            )}
            {currentStep === 2 && (
              <ReviewStep key="review" formData={formData} cartItems={cartItems} total={total} />
            )}
            {currentStep === 3 && (
              <ConfirmationStep
                key="confirmation"
                isProcessing={isProcessing}
                orderComplete={orderComplete}
                processOrder={processOrder}
              />
            )}
          </AnimatePresence>

          {currentStep < 3 && !orderComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between mt-8 pt-6 border-t"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-[#A3A380] to-[#D2CFCB] text-white font-medium rounded-lg shadow-lg"
              >
                Siguiente
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutFlow
