var admin = require("firebase-admin");
var serviceAccount;
if (process.env.FIREBASE_KEY_JSON) {
  console.log("Secret provided");
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY_JSON);
} else {
  console.log("Secret not provided, reading from key file");
  serviceAccount = require("./fireBasePrivateKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
