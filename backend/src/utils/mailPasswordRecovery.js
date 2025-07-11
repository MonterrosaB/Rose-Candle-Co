import nodemailer from "nodemailer"
import { config } from "../config.js"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: config.email.user,
        pass: config.email.pass
    }
});


const sendEmail = async (to, subject, body, html) => {
    try {
        const info = await transporter.sendMail({
            from: "danielgranados008@gmail.com",
            to, 
            subject,
            body,
            html,
        });

        return info;
    } catch (error) {
        console.log("error" + error);
    }
}

const HTMLRecoveryEmail = (code) => {
    return `<div style="font-family: Poppins, sans-serif; text-align: center; background-color: #f4f4f9; padding: 40px 20px; border: 1px solid #ddd; border-radius: 15px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="background-color: #fff; border-radius: 15px; padding: 30px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #2c3e50; font-size: 28px; margin-bottom: 20px; font-weight: 600;">Recuperación de Contraseña</h1>
    <p style="font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 20px;">
      Hello, we received a request to reset your password. Use the verification code below to proceed:
    </p>
    <div style="display: inline-block; padding: 12px 24px; margin: 20px 0; font-size: 20px; font-weight: bold; color: #fff; background-color: #ff7f50; border-radius: 8px; border: 1px solid #e67e22; letter-spacing: 2px;">
      ${code}
    </div>
    <p style="font-size: 14px; color: #777; line-height: 1.6; margin-bottom: 30px;">
      This code is valid for the next <strong>20 minutes</strong>. If you didn’t request this email, you can safely ignore it.
    </p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <footer style="font-size: 14px; color: #aaa;">
      If you need further assistance, please contact our support team at
      <a href="mailto:support@example.com" style="color: #3498db; text-decoration: none;">support@example.com</a>.
    </footer>
  </div>
</div>
`;
};

export { sendEmail, HTMLRecoveryEmail };