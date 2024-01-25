import { transporter } from "../config/nodeMailer";

export default function sendVerification(
  email: string,
  verificationCode: string,
  expirationDate: Date
) {
  const htmlMessage = `
    <html>
      <body>
        <p>Hyvä käyttäjä,</p>
        <p>Kiitos rekisteröitymisestäsi. Saattaaksesi rekisteröitymisesi päätökseen, ole hyvä ja vahvista sähköpostiosoitteesi syöttämällä seuraava vahvistuskoodi:</p>
        <p><b>${verificationCode}</b></p>
        <p>Huomioithan, että tämä koodi vanhenee <b>${expirationDate.toDateString()}</b>.</p>
        <p>Jos et pyytänyt tätä vahvistusta, voit jättää tämän sähköpostin huomiotta.</p>
        <p>Parhain terveisin,<br>lapsen-arki.fi</p>
      </body>
    </html>
  `;

  let mailOptions = {
    from: `Testing" <${process.env.MAIL_USER}>`, // Sender address
    to: email, // List of recipients
    subject: "Sähköpostin vahvistus", // Subject line
    text: "Vahvista sähköpostiosoitteesi", // Plain text body
    html: htmlMessage, // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent");
    }
  });
}
