import { transporter } from "../config/nodeMailer";
import getVerificationMessage from "./verificationMessage";

export default function sendVerification(
  email: string,
  verificationCode: string,
  expirationDate: Date
) {
  try {
    const verificationMessge = getVerificationMessage(
      verificationCode,
      expirationDate
    );
    let mailOptions = {
      from: `Testing" <${process.env.MAIL_USER}>`, // Sender address
      to: email, // List of recipients
      subject: "Sähköpostin vahvistus", // Subject line
      text: "Vahvista sähköpostiosoitteesi", // Plain text body
      html: verificationMessge, // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent");
      }
    });
  } catch (error) {
    console.error(error);
  }
}
