// Correo electrónico que se envía con el código de verificación de la cuenta
import nodemailer from "nodemailer";
import { config } from "../config.js";

// Configuración del transportador SMTP usando Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Servidor SMTP de Gmail
  port: 465, // Puerto seguro SSL
  secure: true, // Usar conexión segura
  auth: {
    user: config.email.user, // Usuario (email) desde config
    pass: config.email.pass, // Contraseña o token de app desde config
  },
});

// Función asíncrona para enviar un correo
const sendEmail = async (to, subject, body, html) => {
  try {
    // Envía el correo con los parámetros indicados
    const info = await transporter.sendMail({
      from: config.email.user, // correo remitente
      to, // destinatario
      subject, // asunto del correo
      body, // texto plano
      html, // contenido en HTML
    });

    // Retorna la información del envío para uso o log
    return info;
  } catch (error) {
    // Captura y muestra error en consola
    console.log("error" + error);
  }
};

// Función que genera el contenido HTML personalizado para el correo de confirmación de cuenta
const HTMLOrderConfirmationEmail = (code, name = "Usuario") => {
  return `
  <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #F9F7F3; padding: 0; max-width: 600px; margin: 0 auto; border-radius: 20px; overflow: hidden; border: 1px solid #DFCCAC; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);">
    <div style="background: linear-gradient(135deg, #EADBC3, #DFCCAC); padding: 40px 20px; text-align: center;">
      <img src="https://img.icons8.com/ios-filled/100/a78a5e/lock--v1.png" width="70" height="70" alt="Lock Icon" style="margin-bottom: 20px; opacity: 0.8;">
      <h2 style="color: #7D674A; font-size: 24px; font-weight: 650; margin-bottom: 10px;">
        Rosé Candle Co.
      </h2>
      <p style="color: #8C7B63; font-size: 14px; line-height: 1.5; margin: 0;">
        Inspiramos confianza con cada detalle.
      </p>
    </div>

    <div style="background-color: #FFFFFF; padding: 40px 30px; position: relative; text-align: center;">
      <h1 style="color: #A78A5E; font-size: 22px; font-weight: 650; margin-bottom: 12px; position: relative; z-index: 2;">
        Confirma tu compra
      </h1>

      <p style="color: #6F6A50; font-size: 15px; line-height: 1.6; margin-bottom: 20px; position: relative; z-index: 2;">
        ¡Hola, <strong>${name}</strong>!<br>
        Gracias por elegir Rosé Candle Co. Para completar y confirmar tu compra, por favor utiliza el siguiente código:
      </p>

      <div style="background-color: #F2E7D5; padding: 16px 32px; font-size: 26px; font-weight: bold; color: #A77A44; border-radius: 12px; display: inline-block; letter-spacing: 4px; position: relative; z-index: 2;">
        ${code}
      </div>

      <p style="color: #8E8A76; font-size: 13.5px; line-height: 1.5; margin-top: 30px; position: relative; z-index: 2;">
        Este código es válido por <strong>20 minutos</strong>. Si no realizaste esta compra, por favor ignora este correo y contáctanos.
      </p>

      <div style="margin-top: 35px; border-top: 1px solid #E6DACA; padding-top: 15px; font-size: 13px; color: #A3A093; position: relative; z-index: 2;">
        ¿Necesitas ayuda? Contáctanos en
        <a href="mailto:rosecandleco@gmail.com" style="color: #A78A5E; text-decoration: none; font-weight: 500;">
          rosecandleco@gmail.com
        </a>
      </div>
    </div>
  </div>
  `;
};

// Exportación de funciones para ser usadas en otras partes del proyecto
export { sendEmail, HTMLOrderConfirmationEmail };
