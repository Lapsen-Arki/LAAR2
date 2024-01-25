import { transporter } from "../../config/nodeMailer";
import { Request, Response } from "express";

export const emailTest = (req: Request, res: Response) => {
  try {
    let mailOptions = {
      from: '"Testing" <example@example.fi>', // Sender address
      to: "example@example.fi", // List of recipients
      subject: "Sähköpostin vahvistus", // Subject line
      text: "Vahvista sähköpostiosoitteesi", // Plain text body
      html: "Hei! Tässä on vahvistuskoodisi: 1234556677", // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send(`Error: ${error}`);
      } else {
        res.status(201).send(`Success`);
        console.log("Message sent");
      }
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
