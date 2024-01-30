import admin from "../config/firebseConfig";
import stripeConf from "../config/stripeClient";

export default async function checkAllUsers() {
  // Get all users who don't have email verified
  const emailNotVerified = await admin
    .firestore()
    .collection("users")
    .where("emailVerified", "==", false)
    .get();

  const unverifiedEmails = emailNotVerified.docs.map(
    (doc: any) => doc.data().email
  );
  console.log(unverifiedEmails);

  // 1. saa näiden käyttäjien emailit
  // 2. Hae näiden emailien avulla stripe käyttäjät (tai skippaa tämä)
  // 3. Peruuta näiden käyttäjien stripe tilaukset

  // const stripe = stripeConf();

  // const notVerifiedSubs = await stripe.subscriptions.list();
}
