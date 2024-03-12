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
import { updateCancelAtPeriodEnd } from "../api/stripeSubscriptions";

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
      localStorage.removeItem("notFirstLogin");
      await signOut(auth);
      return "emailNotVerified";
    }

    const newIdToken = await userCredential.user.getIdToken();

    // Check if first login attempt or not:
    const notFirstLogin = localStorage.getItem("notFirstLogin");
    if (!notFirstLogin || notFirstLogin === "firstAttempt") {
      // If it's the first login -> then Change user's cancel_at_period_end -> true
      updateCancelAtPeriodEnd(newIdToken, email);
      localStorage.setItem("notFirstLogin", "firstAttempt"); // Updating firstAttempt to "true" in home page
    }

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
