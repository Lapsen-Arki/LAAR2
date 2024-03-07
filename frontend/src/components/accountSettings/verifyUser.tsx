import { AuthenticationError } from "./errors";
import {
  Auth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

export default async function verifyCredentials(auth: Auth, password: string) {
  try {
    if (!auth.currentUser)
      throw new AuthenticationError("Käyttäjä ei ole kirjautunut sisään");
    if (!password || typeof password !== "string") {
      throw new AuthenticationError("Salasanaa ei annettu.");
    }
    const user = auth.currentUser;
    if (!user.email) throw new AuthenticationError("Tapahtui virhe.");
    const credential = await EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    return { status: true, msg: "Käyttäjä varmennettu" };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { status: false, msg: error.message };
    } else {
      return { status: false, msg: "Tapahtui virhe" };
    }
  }
}
