var admin = require("firebase-admin");
var serviceAccount;
if (process.env.FIREBASE_KEY_JSON) {
  console.log("Secret provided");
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY_JSON);
  // for testing purposes, remove later
  process.env.SECRET_IS_SET = "true";
} else {
  console.log("Secret not provided, reading from key file");
  serviceAccount = require("./fireBasePrivateKey.json");
  // for testing purposes, remove later
  process.env.SECRET_IS_SET = "false";
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
