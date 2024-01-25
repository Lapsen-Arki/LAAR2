import axios from "axios";
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
      if (authResponse.message && !authResponse.error) {
        if (rememberMe) {
          console.log("saving to localS");

          localStorage.setItem("idToken", newIdToken);
          localStorage.setItem("storageType", "local");
        } else {
          console.log("saving to sessionS");
          sessionStorage.setItem("idToken", newIdToken);
          sessionStorage.setItem("storageType", "session");
        }
      }
    }

    return authResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login error: ", error.response.data);
      return { error: error.response.data };
    }
    return { error: error };
  }
};
