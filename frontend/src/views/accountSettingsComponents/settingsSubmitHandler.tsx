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
/* import postSettings from "../../api/postSettings";*/
import { AccountSettingsFormData, UpdateStatusDataType } from "./types";

const updateStatus: UpdateStatusDataType = {
  password: { updated: false, status: "waiting", msg: "" },
  displayName: { updated: false, status: "waiting", msg: "" },
  email: { updated: false, status: "waiting", msg: "" },
};

export default async function SubmitHandler(
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
      const result = await updateSettings(password, data, auth);
      console.log(result);
      if (result === undefined) throw new Error("Tapahtui virhe");
      if (result.status === false) {
        throw new PasswordError("hello");
      } else {
        return {
          status: true,
          msg: "Asetukset päivitetty.",
          debug: updateStatus,
        };
      }
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { status: false, msg: error.message };
    } else if (error instanceof PasswordError) {
      return { status: false, msg: error.message };
    } else {
      return {
        status: false,
        msg: "Asetuksia ei voitu päivittää.",
        debug: updateStatus,
      };
    }
  }
}
async function updateSettings(
  password: string,
  data: AccountSettingsFormData,
  auth: Auth
) {
  try {
    if (auth === null || auth.currentUser === null)
      throw new AuthenticationError("Käyttäjä ei ole kirjautunut sisään");
    const user = auth.currentUser;
    const email = user.email;
    if (email === null) throw new AuthenticationError("Tapahtui virhe.");

    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);

    if (data.newPassword && data.confirmPassword) {
      setUpdatedValues("password", { status: "pending" });
      const validate = await validatePassword(
        data.newPassword,
        data.confirmPassword
      );
      console.log(validate);
      if (validate.status) {
        const result = await updatePassword(user, data.newPassword)
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
        if (result)
          setUpdatedValues("password", {
            updated: true,
            status: "success",
            msg: "Salasana vaihdettu.",
          });
        else {
          setUpdatedValues("password", {
            status: "error",
            msg: "Salasanaa ei voitu vaihtaa.",
          });
        }
      } else {
        throw new PasswordError(validate.msg);
      }
    } else {
      setUpdatedValues("password", {
        status: "ready",
        msg: "Salasanaa ei muutettu.",
      });
    }
    if (data.email) {
      setUpdatedValues("email", {
        status: "fail",
        msg: "Sähköpostia ei voi vielä vaihtaa.",
      });
      /* setUpdatedValues("email", { status: "pending" });
      const result = await updateEmail(user, data.email)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
      if (result) {
        setUpdatedValues("email", {
          updated: true,
          status: "success",
          msg: "Sähköposti vaihdettu.",
        });
      } else
        setUpdatedValues("email", {
          status: "error",
          msg: "Sähköpostia ei voitu vaihtaa.",
        }); */
    }
    if (data.displayName) {
      setUpdatedValues("displayName", { status: "pending" });
      const result = await updateProfile(user, {
        displayName: data.displayName,
      })
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
      if (result)
        setUpdatedValues("displayName", {
          updated: true,
          status: "success",
          msg: "Nimi vaihdettu.",
        });
      else
        setUpdatedValues("displayName", {
          status: "error",
          msg: "Nimeä ei voitu vaihtaa.",
        });
    }

    return { status: true, msg: "Asetukset päivitetty onnistuneesti." };
  } catch (error) {
    if (error instanceof PasswordError) {
      throw new PasswordError(error.message);
    } else if (error instanceof FirebaseError) {
      if (error.code === "auth/invalid-credential") {
        throw new PasswordError("Väärä salasana.");
      } else if (error.code === "auth/operation-not-allowed") {
        throw new AuthenticationError("Varmista sähköposti ennen muuttamista.");
      } else {
        throw new AuthenticationError("Tapahtui virhe.");
      }
    } else if (error instanceof AuthenticationError) {
      throw new AuthenticationError(error.message);
    } else {
      throw new AuthenticationError("Asetuksia ei voitu päivittää.");
    }
  }
}

function setUpdatedValues(
  key: string,
  inputValues: {
    updated?: boolean;
    status?: string;
    msg?: string;
  }
) {
  const values = {
    updated: inputValues.updated ?? updateStatus[key].updated,
    status: inputValues.status ?? updateStatus[key].status,
    msg: inputValues.msg ?? updateStatus[key].msg,
  };
  if (updateStatus[key]) {
    console.log(values);
    updateStatus[key] = values;
    console.log(updateStatus[key]);
    return updateStatus[key]; // Return the updated object for convenience
  } else {
    console.error(`Invalid key: ${key}`);
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
