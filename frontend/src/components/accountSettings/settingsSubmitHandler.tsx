import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  updatePassword,
  Auth,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { AuthenticationError, PasswordError } from "./errors";
import { AccountSettingsFormData, UpdateStatusDataType } from "./types";
import postSettings from "../../api/accountManagement/postSettings";
const updateStatus: UpdateStatusDataType = {
  password: { updated: false, status: "waiting", msg: "" },
  displayName: { updated: false, status: "waiting", msg: "" },
  email: { updated: false, status: "waiting", msg: "" },
};

const postData = {
  email: { set: false, value: "" },
  displayName: { set: false, value: "" },
  paymentMethod: { set: false, value: "", default: false },
  phoneNumber: { set: false, value: "" },
};

export default async function SubmitHandler(
  data: AccountSettingsFormData,
  auth: Auth,
  idToken: string | null,
  token: string,
  cardAsDefault: boolean
) {
  try {
    if (idToken === null)
      throw new AuthenticationError("Käyttäjä ei ole kirjautunut sisään");
    const password = data.oldPassword;
    if (!password || typeof password !== "string") {
      throw new AuthenticationError("Salasanaa ei annettu.");
    }
    if (token !== "unchanged") {
      postData.paymentMethod.set = true;
      postData.paymentMethod.value = token;
    }
    if (Object.keys(data).length <= 1 && token === "unchanged") {
      return { status: true, msg: "Ei muutettuja asetuksia." };
    } else {
      postData.paymentMethod.default = cardAsDefault;
      const result = await updateSettings(password, data, auth, idToken);
      if (result === undefined) throw new Error("Tapahtui virhe");
      if (result.status === false) {
        throw new AuthenticationError(result.msg);
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
  auth: Auth,
  idToken: string
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
      const result = await verifyBeforeUpdateEmail(user, data.email)
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
        postData.email.set = true;
        postData.email.value = data.email;
      } else {
        setUpdatedValues("email", {
          status: "error",
          msg: "Sähköpostia ei voitu vaihtaa.",
        });
      }
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
      if (result) {
        setUpdatedValues("displayName", {
          updated: true,
          status: "success",
          msg: "Nimi vaihdettu.",
        });
        postData.displayName.set = true;
        postData.displayName.value = data.displayName;
      } else
        setUpdatedValues("displayName", {
          status: "error",
          msg: "Nimeä ei voitu vaihtaa.",
        });
    }
    if (data.phoneNumber) {
      (postData.phoneNumber.value = data.phoneNumber),
        (postData.phoneNumber.set = true);
    }
    const result = await postSettings(postData, idToken);
    if (!result.status) return { status: false, msg: result.message };
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
    updateStatus[key] = values;
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
