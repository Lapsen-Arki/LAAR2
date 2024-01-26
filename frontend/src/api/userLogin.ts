import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { jwtAuth } from "./jwtAuth";

export const userLogin = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  try {
    const auth = getAuth();

    const presistenceType = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;

    await setPersistence(auth, presistenceType);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newIdToken = await userCredential.user.getIdToken();

    // Send token to backend authentication
    let authResponse;
    if (newIdToken) {
      authResponse = await jwtAuth(newIdToken);
      if (authResponse === "emailNotVerified") {
        return "emailNotVerified";
      }
      if (authResponse) {
        if (rememberMe) {
          localStorage.setItem("idToken", newIdToken);
          localStorage.setItem("storageType", "local");
        } else {
          sessionStorage.setItem("idToken", newIdToken);
          sessionStorage.setItem("storageType", "session");
        }
      }
    } else {
      console.error("newIdToken not defined");
    }

    return authResponse;
  } catch (error) {
    return false;
  }
};
