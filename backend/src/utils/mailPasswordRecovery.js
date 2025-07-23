// Correo electrónico que se envía con el código de verificación
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
      from: "danielgranados008@gmail.com", // correo remitente provisional
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

// Función que genera el contenido HTML personalizado para el correo de recuperación
const HTMLRecoveryEmail = (code) => {
  return `
  <div style="font-family: 'Poppins', sans-serif; background-color: #F9F7F3; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 15px; border: 1px solid #DFCCAC; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
    <div style="background-color: #FFFFFF; border-radius: 15px; padding: 30px; text-align: center; border: 1px solid #EDE8DE;">
      <h1 style="color: #A78A5E; font-size: 26px; font-weight: 600; margin-bottom: 10px;">Recuperación de contraseña</h1>
      <p style="color: #7D7954; font-size: 16px; margin-bottom: 20px;">
        ¡Hola! Hemos recibido una solicitud para restablecer tu contraseña. Usa el siguiente código de verificación:
      </p>
      <div style="display: inline-block; padding: 15px 30px; margin: 20px 0; font-size: 22px; font-weight: bold; color: #FFFFFF; background-color: #A78A5E; border-radius: 10px; letter-spacing: 3px;">
        ${code}  <!-- Código de verificación dinámico -->
      </div>
      <p style="color: #86918C; font-size: 14px; margin-top: 20px;">
        Este código es válido por <strong>20 minutos</strong>. Si no solicitaste este correo, puedes ignorarlo de forma segura.
      </p>
      <hr style="border: none; border-top: 1px solid #D3CCBE; margin: 30px 0;">
      <footer style="font-size: 13px; color: #AAB9B2;">
        Si necesitas ayuda adicional, por favor contacta a nuestro equipo de soporte en
        <a href="mailto:soporte@rosecandleco.com" style="color: #A78A5E; text-decoration: none;">soporte@rosecandleco.com</a>.
      </footer>
    </div>
  </div>
  `;
};

// Exportación de las funciones para ser usadas en otras partes del proyecto
export { sendEmail, HTMLRecoveryEmail };
