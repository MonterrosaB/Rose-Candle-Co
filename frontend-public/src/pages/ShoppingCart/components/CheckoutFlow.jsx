import { useEffect, useState, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../global/context/AuthContext.jsx"
import useCart from "../hooks/useShoppingCart.jsx";
import toast from "react-hot-toast";


import {
  ArrowLeft,
  ArrowRight,
  Truck,
  CreditCard,
  CheckCircle,
  Star,
} from "lucide-react";

import ShippingStep from "./ShippingStep";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";
import ConfirmationStep from "./ConfirmationStep";


const CheckoutFlow = ({
  cartItems = [],
  total = "0.00",
  onBack,
  onClearCart,
}) => {
  const { user } = useContext(AuthContext);
  const { idCart, createSalesOrder } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("new"); // 👈 Mover aquí
  const [formData, setFormData] = useState({
    shipping: {
      firstName: "",
      lastName: "",
      email: user.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "El Salvador" || "",
    },
    payment: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      paymentMethod: "card",
    },
  });

  const steps = [
    { id: 0, title: "Información de Envío", icon: Truck },
    { id: 1, title: "Método de Pago", icon: CreditCard },
    { id: 2, title: "Revisión", icon: CheckCircle },
    { id: 3, title: "Confirmación", icon: Star },
  ];

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      // Validar shipping
      const s = formData.shipping;
      return (
        s.firstName?.trim() &&
        s.lastName?.trim() &&
        s.email?.trim() &&
        s.phone?.trim() &&
        s.address?.trim() &&
        s.city?.trim() &&
        s.state?.trim() &&
        s.zipCode?.trim() &&
        s.country?.trim()
      );
    } else if (currentStep === 1) {
      // Validar payment
      const p = formData.payment;
      if (p.paymentMethod === "card") {
        return (
          p.cardNumber?.trim() &&
          p.cardName?.trim() &&
          p.expiryDate?.trim() &&
          p.cvv?.trim()
        );
      }
      return true; // otros métodos de pago
    }
    return true; // pasos 2 y 3 no requieren validación
  };

  const nextStep = () => {
    if (!isStepValid()) {
      toast.error("Por favor, llena todos los campos");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };


  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };



  // Función para procesar el pedido (simulado)
  const processOrder = async () => {
    try {
      setIsProcessing(true);

      // Validar que haya datos de envío
      if (!formData?.shipping) {
        throw new Error("Faltan los datos de envío");
      }

      const { shipping, payment } = formData;

      // 1️⃣ Obtener token de pago
      const tokenResponse = await fetch(
        "https://rose-candle-co.onrender.com/api/payments/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!tokenResponse.ok) throw new Error("Error al obtener token");

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // 2️⃣ Preparar datos de pago
      const paymentData = {
        monto: total,
        emailCliente: shipping.email,
        nombreCliente: payment.cardName,
        tokenTarjeta: "null", // simulado
      };

      console.log("Email cliente (desde frontend):", shipping.email);

      // 3️⃣ Enviar pago simulado
      const paymentResponse = await fetch(
        "https://rose-candle-co.onrender.com/api/payments/testPayment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: accessToken, formData: paymentData }),
        }
      );

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        throw new Error(`Error al procesar pago: ${errorText}`);
      }

      const paymentResult = await paymentResponse.json();
      console.log("Respuesta del pago simulado:", paymentResult);

      // 4️⃣ Crear la orden solo si el pago se completó
      const orderData = {
        idShoppingCart: idCart,
        paymentMethod: "credit card",
        address: shipping,
        saleDate: new Date(),
        total: total,
        shippingState: [{ state: "Pendiente" }],
      };

      const orderResult = await createSalesOrder(orderData);
      if (!orderResult) throw new Error("Error al crear la orden");

      console.log("Orden creada correctamente:", orderResult);
      setOrderComplete(true);

    } catch (err) {
      console.error("Error en el proceso de pago/orden:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false); // Siempre desactiva el loading
    }
  };






  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-45">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
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

          {/* Pasos */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor:
                      currentStep >= index ? "#A3A380" : "#e5e7eb",
                    scale: currentStep === index ? 1.1 : 1,
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold"
                >
                  {currentStep > index ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </motion.div>
                <div className="ml-3 hidden md:block">
                  <p
                    className={`text-sm font-medium ${currentStep >= index ? "text-[#A3A380]" : "text-gray-500"
                      }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{
                      backgroundColor:
                        currentStep > index ? "#A3A380" : "#e5e7eb",
                    }}
                    className="w-16 h-1 mx-4"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contenido dinámico */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <ShippingStep
                  formData={formData.shipping}
                  handleInputChange={handleInputChange}
                  selectedAddress={selectedAddress} // le paso
                  setSelectedAddress={setSelectedAddress} // 👈 le paso
                />
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <PaymentStep
                  formData={formData.payment}
                  handleInputChange={handleInputChange}
                />
              </motion.div>
            )}
            {currentStep === 2 && (
              <ReviewStep
                key="review"
                formData={formData}
                cartItems={cartItems}
                total={total}
              />
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

          {/* Botones de navegación */}
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
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 0
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
  );
};

export default CheckoutFlow;
