import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  updatePassword,
  Auth,
  updateEmail,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { AuthenticationError, PasswordError } from "./errors";
import postSettings from "../../api/postSettings";

interface AccountSettingsFormData {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  newPassword?: string;
  confirmPassword?: string;
  oldPassword?: string;
}

export default function SubmitHandler(
  data: AccountSettingsFormData,
  auth: Auth
) {
  try {
    const password = data.oldPassword;
    if (!password || typeof password !== "string") {
      throw new AuthenticationError("Salasanaa ei annettu.");
    }

    if (Object.keys(data).length <= 1) {
      return { status: true, msg: "Ei muutettuja asetuksia." };
    } else {
      updateSettings(password, data, auth);
      return { status: true, msg: "Asetukset päivitetty." };
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { status: false, msg: "Salasanaa ei annettu." };
    } else if (error instanceof PasswordError) {
      return { status: false, msg: error.message };
    } else {
      return { status: false, msg: "Asetuksia ei voitu päivittää." };
    }
  }
}
async function updateSettings(
  password: string,
  data: AccountSettingsFormData,
  auth: Auth
) {
  console.log(auth);
  const updatedValues = {
    password: false,
    displayName: false,
    email: false,
  };
  try {
    if (auth === null || auth.currentUser === null)
      throw new AuthenticationError("Käyttäjä ei ole kirjautunut sisään");
    const user = auth.currentUser;
    const email = user.email;
    if (email === null) throw new AuthenticationError("Tapahtui virhe.");

    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);

    if (data.newPassword && data.confirmPassword) {
      const validate = validatePassword(data.newPassword, data.confirmPassword);
      if (validate.status) {
        updatePassword(user, data.newPassword)
          .then(() => {
            updatedValues.password = true;
          })
          .catch((error) => {
            throw new Error(error);
          });
      } else {
        throw new PasswordError(validate.msg);
      }
    }
    if (data.email) {
      updateEmail(user, data.email)
        .then(() => {
          updatedValues.email = true;
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
    if (data.displayName) {
      updateProfile(user, {
        displayName: data.displayName,
      })
        .then(() => {
          updatedValues.displayName = true;
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  } catch (error) {
    if (error instanceof PasswordError) {
      throw new PasswordError(error.message);
    }
    return { status: false, msg: "Asetuksia ei voitu päivittää." };
  }
}

function validatePassword(pass: string, cpass: string) {
  if (pass !== cpass) {
    return { status: false, msg: "Salasanat eivät täsmää" };
  }
  // Check lowercase letter
  if (!/[a-z]/.test(pass)) {
    return {
      status: false,
      msg: "Salasanan tulee sisältää vähintään yksi pieni kirjain | Password must include at least one lowercase letter",
    };
  }

  // Check uppercase letter
  if (!/[A-Z]/.test(pass)) {
    return {
      status: false,
      msg: "Salasanan tulee sisältää vähintään yksi iso kirjain | Password must include at least one uppercase letter",
    };
  }

  // Check digit
  if (!/\d/.test(pass)) {
    return {
      status: false,
      msg: "Salasanan tulee sisältää vähintään yksi numero | Password must include at least one digit",
    };
  }

  // Check special character
  if (!/[@$!%*?&]/.test(pass)) {
    return {
      status: false,
      msg: "Salasanan tulee sisältää vähintään yksi erikoismerkki (@$!%*?&) | Password must include at least one special character (@$!%*?&)",
    };
  }

  // Check password length
  if (pass.length < 8) {
    return {
      status: false,
      msg: "Salasanan tulee olla vähintään 8 merkkiä pitkä | Password must be at least 8 characters long",
    };
  }

  return { status: true, msg: "Salasana kelpaa" };
}
