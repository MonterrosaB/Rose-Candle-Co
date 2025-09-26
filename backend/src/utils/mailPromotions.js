import fetch from "node-fetch";
import { config } from "../config.js"; // API key opcional desde config

// API key de Brevo
const apiKey = config.brevo.brevoapi;

/**
 * Función para enviar correo usando Brevo
 * @param {string} to - destinatario
 * @param {string} subject - asunto
 * @param {string} html - contenido HTML
 */
const sendEmail = async (to, subject, html) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Rosé Candle Co.", email: config.brevo.brevoSender },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();
    console.log("Correo enviado:", data);
    return data;
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};

/**
 * Genera el HTML usando los valores dinámicos
 * @param {string} body - cuerpo del correo (texto)
 * @param {string} subject - asunto del correo
 * @param {string} name - nombre del usuario (opcional)
 */
const HTMLMail = (body, subject, name = "Usuario") => {
  return `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #F9F7F3; padding: 0; max-width: 600px; margin: 0 auto; border-radius: 20px; overflow: hidden; border: 1px solid #DFCCAC; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);">
      <div style="background: linear-gradient(135deg, #EADBC3, #DFCCAC); padding: 40px 20px; text-align: center;">
        <h2 style="color: #7D674A; font-size: 24px; font-weight: 650; margin-bottom: 10px;">
          Rosé Candle Co.
        </h2>
        <p style="color: #8C7B63; font-size: 14px; line-height: 1.5; margin: 0;">
          Bienvenido a una experiencia sensorial única y artesanal.
        </p>
      </div>

      <div style="background-color: #FFFFFF; padding: 40px 30px; text-align: center;">
        <h1 style="color: #A78A5E; font-size: 22px; font-weight: 650; margin-bottom: 8px;">
          ${subject}
        </h1>
        <p style="color: #6F6A50; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
          ${body.replace("${name}", name)}
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
};

export { sendEmail, HTMLMail };
