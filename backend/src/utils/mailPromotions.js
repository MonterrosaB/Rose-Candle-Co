import nodemailer from "nodemailer";
import { config } from "../config.js"; // Credenciales desde el config

// Configuración del transportador SMTP usando Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Función para enviar correo
 * @param {string} to - destinatario
 * @param {string} subject - asunto
 * @param {string} html - contenido HTML
 */
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: config.email.user,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.log("Error sending email:", error); // error
  }
};

/**
 * Genera el HTML usando los valores actualizados del Settings
 * @param {string} body - cuerpo del correo (texto desde Settings)
 * @param {string} subject - asunto del correo (desde Settings)
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
