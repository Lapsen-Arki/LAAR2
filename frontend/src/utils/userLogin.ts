import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendEmailVerification,
} from "firebase/auth";
import { jwtAuth } from "../api/jwtAuth";

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
    const user = userCredential.user;
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      await signOut(auth);
      return "emailNotVerified";
    }

    // Check if first login attempt or not:
    const notFirstLogin = localStorage.getItem("notFirstLogin");
    if (!notFirstLogin || notFirstLogin === "firstAttempt") {
      // If it's the first login -> then Change user's cancel_at_period_end -> true
      localStorage.setItem("notFirstLogin", "firstAttempt");
    }

    const newIdToken = await userCredential.user.getIdToken();

    // Send token to backend authentication
    let authResponse;
    if (newIdToken) {
      authResponse = await jwtAuth(newIdToken);
      if (authResponse === "success") {
        if (rememberMe) {
          localStorage.setItem("idToken", newIdToken);
          localStorage.setItem("storageType", "local");
        } else {
          sessionStorage.setItem("idToken", newIdToken);
          sessionStorage.setItem("storageType", "session");
        }
      }
    } else {
      await signOut(auth);
      console.error("newIdToken not defined");
    }

    return authResponse;
  } catch (error) {
    return false;
  }
};
