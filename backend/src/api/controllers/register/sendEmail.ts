import { transporter } from "../../../config/nodeMailer";
import { Request, Response } from "express";

export const emailTest = (req: Request, res: Response) => {
  try {
    let mailOptions = {
      from: '"Testing" <testing@lapsen-arki.fi>', // Sender address
      to: "imberg.hasse@pm.me", // List of recipients
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // Plain text body
      html: "<b>Hello world?</b>", // HTML body
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
