// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbdFwyD9_ExUzJg11bKL1DFPow60BHcBg",
  authDomain: "laar-48852.firebaseapp.com",
  projectId: "laar-48852",
  storageBucket: "laar-48852.appspot.com",
  messagingSenderId: "514142496335",
  appId: "1:514142496335:web:4a8d3c9c64053c37da2c3a",
  measurementId: "G-XQBBNVYZB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

export default app;
