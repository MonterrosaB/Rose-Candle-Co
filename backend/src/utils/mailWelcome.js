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
      from: "danielgranados008@gmail.com", // Correo remitente provisional
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
  <div style="font-family: 'Poppins', sans-serif; background-color: #F9F7F3; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 15px; border: 1px solid #DFCCAC; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
    <div style="background-color: #FFFFFF; border-radius: 15px; padding: 30px; text-align: center; border: 1px solid #EDE8DE;">
      <h1 style="color: #A78A5E; font-size: 26px; font-weight: 600; margin-bottom: 10px;">¡Bienvenido a Rose Candle Co.!</h1>
      <p style="color: #7D7954; font-size: 16px; margin-bottom: 20px;">
        Hola <strong>${name}</strong>, gracias por unirte a nuestra comunidad. Estamos encantados de tenerte con nosotros.
      </p>
      <p style="color: #7D7954; font-size: 16px; margin-bottom: 20px;">
        A partir de ahora recibirás las mejores recomendaciones, descuentos especiales y novedades exclusivas sobre nuestros productos artesanales.
      </p>
      <div style="display: inline-block; padding: 15px 30px; margin: 20px 0; font-size: 18px; font-weight: bold; color: #FFFFFF; background-color: #A78A5E; border-radius: 10px; letter-spacing: 1px;">
        ¡Gracias por confiar en nosotros!
      </div>
      <p style="color: #86918C; font-size: 14px; margin-top: 20px;">
        Si tienes alguna duda o necesitas ayuda, no dudes en escribirnos.
      </p>
      <hr style="border: none; border-top: 1px solid #D3CCBE; margin: 30px 0;">
      <footer style="font-size: 13px; color: #AAB9B2;">
        Puedes contactarnos en cualquier momento escribiendo a
        <a href="mailto:soporte@rosecandleco.com" style="color: #A78A5E; text-decoration: none;">soporte@rosecandleco.com</a>.
      </footer>
    </div>
  </div>
  `;
};

// Exportación de funciones para ser usadas en otras partes del proyecto
export { sendEmail, HTMLWelcomeMail };
