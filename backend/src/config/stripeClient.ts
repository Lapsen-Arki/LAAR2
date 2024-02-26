import Stripe from "stripe";
require("dotenv").config();

function stripeConf() {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecret) {
    console.error("Stripe secret key is not set");
    throw new Error("Stripe secret key is not set");
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: "2023-10-16", // Specify the API version
  });

  return stripe;
}

export default stripeConf;
