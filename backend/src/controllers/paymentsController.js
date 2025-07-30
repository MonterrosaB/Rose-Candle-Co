import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// 🔹 Obtener token
export const getToken = async (req, res) => {
  try {
    const response = await fetch("https://id.wompi.sv/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: process.env.GRANT_TYPE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        audience: process.env.AUDIENCE,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener token" });
  }
};

// 🔹 Pago de prueba
export const testPayment = async (req, res) => {
  try {
    const { token, formData } = req.body;

    if (!token) return res.status(400).json({ error: "Token requerido" });
    if (!formData) return res.status(400).json({ error: "Datos de pago requeridos" });

    // ✅ Toma el correo del usuario logueado desde el token decodificado
    const emailCliente = req.user?.email; // esto viene del payload que agregaste en login

    // Sobrescribe o agrega el email al formData
    const finalFormData = {
  ...formData,
  emailCliente: req.user?.email || formData.emailCliente,
};


    const paymentResponse = await fetch(
      "https://api.wompi.sv/TransaccionCompra/TokenizadaSin3Ds",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalFormData),
      }
    );

    if (!paymentResponse.ok) {
      const error = await paymentResponse.text();
      return res.status(paymentResponse.status).json({ error });
    }

    const paymentData = await paymentResponse.json();
    res.json(paymentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al procesar el pago" });
  }
};

// 🔹 Pago real con 3Ds
export const payment3ds = async (req, res) => {
  try {
    const { token, formData } = req.body;

    if (!token) return res.status(400).json({ error: "Token requerido" });
    if (!formData) return res.status(400).json({ error: "Datos de pago requeridos" });

    const response = await fetch("https://api.wompi.sv/TransaccionCompra/3Ds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al procesar el pago" });
  }
};
