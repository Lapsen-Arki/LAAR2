import * as adminInstance from "firebase-admin";
let admin = getAdminInstance();

function getAdminInstance() {
  if (process.env.NODE_ENV === "test") {
    // If we are in test mode, use the mock firebase
    // Import the mock library
    const firebaseMock = require("firebase-mock");
    const mockAuth = new firebaseMock.MockAuthentication();
    const mockDatabase = new firebaseMock.MockFirebase();
    const mockFirestore = new firebaseMock.MockFirestore();
    const mockStorage = new firebaseMock.MockStorage();
    const mockMessaging = new firebaseMock.MockMessaging();
    // Create a mock admin SDK instance
    return new firebaseMock.MockFirebaseSdk(
      (path: any) => {
        return path ? mockDatabase.child(path) : mockDatabase;
      },
      () => {
        return mockAuth;
      },
      () => {
        return mockFirestore;
      },
      () => {
        return mockStorage;
      },
      () => {
        return mockMessaging;
      }
    );
  } else {
    // If we are in production mode, use the real firebase
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
    return adminInstance.initializeApp({
      credential: adminInstance.credential.cert(serviceAccount),
    });
  }
}

export default admin;
