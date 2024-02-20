import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import {
  AuthenticationError,
  PasswordError,
  UserNotFoundError,
  APIError,
} from "./errors";
import postSettings from "../../api/postSettings";

interface FormDataProps {
  get: (name: string) => string | null;
  entries: () => [string, string][];
}

export default function SubmitHandler(
  data: FormDataProps,
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
        updateSettings(password, data, idToken, resolve, reject);
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
function updateSettings(
  password: string,
  data: FormData,
  idToken: string,
  resolve: (
    value:
      | { status: true; msg: string }
      | PromiseLike<{ status: true; msg: string }>
  ) => void,
  reject: (reason?: Error) => void
) {
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
      const new_displayName = data.get("displayName") ?? user.displayName;
      const new_email = data.get("email") ?? user.email;
      const new_password = data.get("newPassword") ?? undefined;
      const new_confirmPassword = data.get("confirmPassword") ?? undefined;
      if (new_password !== undefined && new_confirmPassword !== undefined) {
        validatePassword(new_password, new_confirmPassword);
      }
      const response = await postSettings(data, idToken);
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
            reject(new AuthenticationError("Virhe tietojen päivittämisessä."));
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
}

function validatePassword(pass: string, cpass: string) {
  if (pass !== cpass) {
    throw new PasswordError("Salasanat eivät täsmää.");
  }
  if (pass.length < 6) {
    throw new PasswordError("Salasanan tulee olla vähintään 6 merkkiä pitkä.");
  }
  return true;
}
