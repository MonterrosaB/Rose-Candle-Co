// Correo electrónico que se envía con el código de verificación
import nodemailer from "nodemailer";
import { config } from "../config.js";

// Configuración del transportador SMTP usando Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Servidor SMTP de Gmail
  port: 465, // Puerto SSL seguro
  secure: true, // Usar conexión segura SSL/TLS
  auth: {
    user: config.email.user, // Usuario (correo) desde configuración
    pass: config.email.pass, // Contraseña o token de aplicación
  },
  tls: {
    rejectUnauthorized: false, // Ignorar errores de certificado TLS (útil para desarrollo)
  },
});

// Función asíncrona para enviar un correo electrónico
const sendEmail = async (to, subject, body, html) => {
  try {
    // Envío del correo con los parámetros recibidos
    const info = await transporter.sendMail({
      from: config.email.user, // correo remitente
      to, // Destinatario (email)
      subject, // Asunto del correo
      body, // Texto plano del correo
      html, // Contenido HTML del correo
    });

    // Retorna información del envío para seguimiento o log
    return info;
  } catch (error) {
    // En caso de error, imprimir en consola para debug
    console.log("error" + error);
  }
};

// Función que genera el contenido HTML personalizado para el correo de bienvenida
// Recibe opcionalmente el nombre del usuario para personalizar el mensaje
const HTMLWelcomeMail = (name = "Usuario") => {
  return `
  <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #F9F7F3; padding: 0; max-width: 600px; margin: 0 auto; border-radius: 20px; overflow: hidden; border: 1px solid #DFCCAC; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);">
  <div style="background: linear-gradient(135deg, #EADBC3, #DFCCAC); padding: 40px 20px; text-align: center;">

    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity: 0.8; margin-bottom: 15px; color: #A78A5E;">
      <path fill="#A78A5E" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4 7.74 4 8.94 4.81 9.5 6.09 10.06 4.81 11.26 4 12.5 4 15.01 4 17 6 17 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>

    <h2 style="color: #7D674A; font-size: 24px; font-weight: 650; margin-bottom: 10px;">
      Rosé Candle Co.
    </h2>
    <p style="color: #8C7B63; font-size: 14px; line-height: 1.5; margin: 0;">
      Bienvenido a una experiencia sensorial única y artesanal.
    </p>
  </div>

  <div style="background-color: #FFFFFF; padding: 40px 30px; position: relative; text-align: center;">
    <h1 style="color: #A78A5E; font-size: 22px; font-weight: 650; margin-bottom: 8px; position: relative; z-index: 2;">
      Código de verificación
    </h1>

    <p style="color: #6F6A50; font-size: 15px; line-height: 1.6; margin-bottom: 20px; position: relative; z-index: 2;">
      ¡Gracias por unirte, <strong>${name}</strong>!<br>
      Estamos muy felices de que formes parte de nuestra comunidad. Desde ahora recibirás descuentos exclusivos, recomendaciones
      y novedades sobre nuestras velas artesanales.
    </p>

    <div style="background-color: #F2E7D5; padding: 16px 32px; font-size: 26px; font-weight: bold; color: #A77A44; border-radius: 12px; display: inline-block; position: relative; z-index: 2;">
      ¡Disfruta el aroma de lo auténtico!
    </div>

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
export { sendEmail, HTMLWelcomeMail };
