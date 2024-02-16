import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import {
  AuthenticationError,
  PasswordError,
  UserNotFoundError,
  APIError,
} from "./errors";
import postSettings from "../../api/postSettings";

export default function SubmitHandler(
  data: FormData,
  idToken: string
): Promise<{ status: true; msg: string }> {
  return new Promise((resolve, reject) => {
    try {
      const password = data.get("oldPassword");
      if (!password || typeof password !== "string") {
        throw new PasswordError("Salasanaa ei annettu.");
      }
      const entries = [...data.entries()].length;
      if (entries === 1) {
        resolve({ status: true, msg: "Ei muutettuja asetuksia." });
      } else {
        const auth = getAuth();

        auth.onAuthStateChanged(async (user) => {
          try {
            if (!user) {
              throw new UserNotFoundError("Ei kirjautunutta käyttäjää.");
            }
            const email = user.email;
            if (!email)
              throw new AuthenticationError("Käyttäjällä ei ole sähköpostia.");

            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(user, credential);
            const response = await postSettings(data, idToken);
            console.log(response);
            if (response.code) {
              throw new APIError(response.message, response.code);
            }

            resolve({
              status: true,
              msg: "Käyttäjä asetukset päivitetty onnistuneesti. Kirjaudu sisään uudelleen nähdäksesi muutokset.",
            });
          } catch (error) {
            if (error instanceof FirebaseError) {
              switch (error.code) {
                case "auth/invalid-credential":
                  reject(new AuthenticationError("Väärä salasana"));
                  break;
                case "auth/too-many-requests":
                  reject(
                    new AuthenticationError(
                      "Liian monta yritystä. Yritä myöhemmin uudelleen."
                    )
                  );
                  break;
                default:
                  reject(new AuthenticationError(error.message));
                  break;
              }
            } else if (error instanceof APIError) {
              reject(new AuthenticationError(error.message));
            } else if (
              error instanceof AuthenticationError ||
              error instanceof UserNotFoundError
            ) {
              reject(new AuthenticationError(error.message));
            }
          }
        });
        return;
      }
    } catch (error) {
      if (error instanceof PasswordError) {
        reject(error);
      } else if (error instanceof AuthenticationError) {
        reject(new AuthenticationError(error.message));
      } else if (error instanceof UserNotFoundError) {
        reject(new UserNotFoundError(error.message));
      }
    }
  });
}
