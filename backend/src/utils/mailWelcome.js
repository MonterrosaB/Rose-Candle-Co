import fetch from "node-fetch";
import { config } from "../config.js"; // opcional si guardas la API key aquí

// Función para enviar correo de bienvenida
const sendWelcomeEmail = async (to, name = "Usuario") => {
  try {
    console.log("API Key:", `"${config.brevo.brevoapi}"`);
    console.log("Sender:", config.brevo.brevoSender);
    // Contenido HTML
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #F9F7F3; padding: 0; max-width: 600px; margin: 0 auto; border-radius: 20px; overflow: hidden; border: 1px solid #DFCCAC; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);">
        <div style="background: linear-gradient(135deg, #EADBC3, #DFCCAC); padding: 40px 20px; text-align: center;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity: 0.8; margin-bottom: 15px; color: #A78A5E;">
            <path fill="#A78A5E" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4 7.74 4 8.94 4.81 9.5 6.09 10.06 4.81 11.26 4 12.5 4 15.01 4 17 6 17 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <h2 style="color: #7D674A; font-size: 24px; font-weight: 650; margin-bottom: 10px;">Rosé Candle Co.</h2>
          <p style="color: #8C7B63; font-size: 14px; line-height: 1.5; margin: 0;">
            Bienvenido a una experiencia sensorial única y artesanal.
          </p>
        </div>
        <div style="background-color: #FFFFFF; padding: 40px 30px; position: relative; text-align: center;">
          <h1 style="color: #A78A5E; font-size: 22px; font-weight: 650; margin-bottom: 8px;">
            Código de verificación
          </h1>
          <p style="color: #6F6A50; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            ¡Gracias por unirte, <strong>${name}</strong>!<br>
            Estamos muy felices de que formes parte de nuestra comunidad. Desde ahora recibirás descuentos exclusivos, recomendaciones
            y novedades sobre nuestras velas artesanales.
          </p>
          <div style="background-color: #F2E7D5; padding: 16px 32px; font-size: 26px; font-weight: bold; color: #A77A44; border-radius: 12px; display: inline-block;">
            ¡Disfruta el aroma de lo auténtico!
          </div>
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
        "api-key": config.brevo.brevoapi,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Rosé Candle Co.", email: config.brevo.brevoSender },
        to: [{ email: to, name }],
        subject: "Bienvenido a Rosé Candle Co.",
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

export default sendWelcomeEmail;
