var admin = require("firebase-admin");
var serviceAccount;
if (process.env.FIREBASE_KEY_JSON) {
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY_JSON);
} else {
  serviceAccount = require("./fireBasePrivateKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
