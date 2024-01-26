export default function getVerificationMessage(
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
  return htmlMessage;
}
