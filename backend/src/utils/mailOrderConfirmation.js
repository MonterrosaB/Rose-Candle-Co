import fetch from "node-fetch";
import { config } from "../config.js"; // opcional si guardas la API key aquí

// API key de Brevo
const apiKey = config.brevo.brevoapi;

// Función para enviar correo de confirmación de compra
const sendOrderConfirmationEmail = async (to, code, name = "Usuario") => {
  try {
    // Contenido HTML
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #F9F7F3; padding: 0; max-width: 600px; margin: 0 auto; border-radius: 20px; overflow: hidden; border: 1px solid #DFCCAC; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);">
        <div style="background: linear-gradient(135deg, #EADBC3, #DFCCAC); padding: 40px 20px; text-align: center;">
          <img src="https://img.icons8.com/ios-filled/100/a78a5e/lock--v1.png" width="70" height="70" alt="Lock Icon" style="margin-bottom: 20px; opacity: 0.8;">
          <h2 style="color: #7D674A; font-size: 24px; font-weight: 650; margin-bottom: 10px;">Rosé Candle Co.</h2>
          <p style="color: #8C7B63; font-size: 14px; line-height: 1.5; margin: 0;">Inspiramos confianza con cada detalle.</p>
        </div>
        <div style="background-color: #FFFFFF; padding: 40px 30px; position: relative; text-align: center;">
          <h1 style="color: #A78A5E; font-size: 22px; font-weight: 650; margin-bottom: 12px;">Confirma tu compra</h1>
          <p style="color: #6F6A50; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            ¡Hola, <strong>${name}</strong>!<br>
            Gracias por elegir Rosé Candle Co. Para completar y confirmar tu compra, por favor utiliza el siguiente código:
          </p>
          <div style="background-color: #F2E7D5; padding: 16px 32px; font-size: 26px; font-weight: bold; color: #A77A44; border-radius: 12px; display: inline-block; letter-spacing: 4px;">
            ${code}
          </div>
          <p style="color: #8E8A76; font-size: 13.5px; line-height: 1.5; margin-top: 30px;">
            Este código es válido por <strong>20 minutos</strong>. Si no realizaste esta compra, por favor ignora este correo y contáctanos.
          </p>
          <div style="margin-top: 35px; border-top: 1px solid #E6DACA; padding-top: 15px; font-size: 13px; color: #A3A093;">
            ¿Necesitas ayuda? Contáctanos en
            <a href="mailto:rosecandleco@gmail.com" style="color: #A78A5E; text-decoration: none; font-weight: 500;">
              rosecandleco@gmail.com
            </a>
          </div>
        </div>
      </div>
    `;

    // Llamada a la API de Brevo
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Rosé Candle Co.", email: config.brevo.brevoSender },
        to: [{ email: to, name }],
        subject: "Confirma tu compra - Rosé Candle Co.",
        htmlContent,
      }),
    });

    const data = await response.json();
    console.log("Correo enviado:", data);
    return data;
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};

export default sendOrderConfirmationEmail;
