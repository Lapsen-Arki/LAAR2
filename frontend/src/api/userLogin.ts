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

    const idToken = await userCredential.user.getIdToken();

    // Send token to backend authentication
    let authResponse;
    if (idToken) {
      authResponse = await jwtAuth(idToken);
      // TEST THAT THIS WORKS CORRECTLY:
      if (authResponse.message && !authResponse.error) {
        localStorage.setItem("idToken", idToken);
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
