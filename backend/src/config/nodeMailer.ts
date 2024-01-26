import nodemailer from "nodemailer";
require("dotenv").config();

export let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT), // Commonly, 465 for SSL
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // Your email address
    pass: process.env.MAIL_PASS, // Your email account password
  },
});
