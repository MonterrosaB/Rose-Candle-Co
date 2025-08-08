import { useState } from "react";

const usePaymentFakeForm = () => {
  const [formData, setFormData] = useState({
    monto: 0,
    emailCliente: "",
    nombreCliente: "",
    tokenTarjeta: "null", // en pruebas se usa "null"
  });

  const [datosEnviados, setDatosEnviados] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limpiarFormulario = () => {
    setFormData({
      nombreCliente: "",
      emailCliente: "",
      monto: "",
      tokenTarjeta: "null",
    });
    setDatosEnviados(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDatosEnviados(formData);
    console.log("Datos del formulario:", formData);
  };

  const handleFakePayment = async () => {
    try {
      alert("Generando token de acceso...");

      // 1. Obtener token desde el backend
      const tokenResponse = await fetch("https://rose-candle-co.onrender.com/api/payments/token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        throw new Error(`Error al obtener token: ${errorText}`);
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      alert("Token generado. Enviando pago...");

      const formDataPayment = {
        ...formData,
        tokenTarjeta: "null", // simulando que no se envía el token de tarjeta
      };

      // 2. Enviar datos de pago al backend
      const paymentResponse = await fetch("https://rose-candle-co.onrender.com/api/payments/testPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
          formData: formDataPayment,
        }),
      });

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        throw new Error(`Error al procesar pago: ${errorText}`);
      }

      const paymentData = await paymentResponse.json();
      alert("Pago simulado correctamente");
      console.log("Respuesta del pago:", paymentData);
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      alert(`Error: ${error.message}`);
    }

    limpiarFormulario();
  };

  return {
    formData,
    datosEnviados,
    handleChange,
    handleSubmit,
    limpiarFormulario,
    handleFakePayment,
  };
};

export default usePaymentFakeForm;
